import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/*
  AgentTraceBackground
  ─────────────────────
  Inspired by AnimatedTracesBackground but built for the full Syntrox
  governance pipeline with much richer visuals:

  Original DNA preserved:
  • Named agent nodes tied to real Syntrox roles
  • Hierarchical topology (4 layers: Proxy → Governance → AI Models → Eval)
  • Signal pulses that illuminate destination nodes on arrival
  • Red / blue / amber color system

  Upgrades:
  • Canvas renders edges + signals (no framer-motion overhead)
  • Animated flowing dash offset on every edge — like electricity in a wire
  • Gradient signal trails (30% look-behind per pulse)
  • Pre-baked glow sprites — zero ctx.filter blur
  • 6 concurrent signals (was 3)
  • Periodic KILL-SWITCH event: all edges flash red, all nodes flare
  • Node cards: glassy dark rectangles with role label + pulsing dot
  • Scroll-based opacity via IntersectionObserver (no framer-motion scroll)
  Performance: ~30fps cap, pre-baked sprites, no ctx.filter
*/

// ─── Graph definition — Syntrox governance pipeline ───────────────────────
const NODES = [
  // Layer 0 — proxy
  { id: 'proxy',   x: 50, y: 10, label: 'Syntrox Proxy',  role: 'proxy', color: '#ef4444' },
  // Layer 1 — governance
  { id: 'pii',    x: 28, y: 36, label: 'PII Detector',   role: 'gov',   color: '#eab308' },
  { id: 'auth',   x: 72, y: 36, label: 'Auth Guard',     role: 'gov',   color: '#f97316' },
  // Layer 2 — AI models
  { id: 'modelA', x: 15, y: 62, label: 'LLM Agent α',    role: 'model', color: '#3b82f6' },
  { id: 'modelB', x: 50, y: 62, label: 'LLM Agent β',    role: 'model', color: '#06b6d4' },
  { id: 'codeAgt',x: 85, y: 62, label: 'Code Agent',     role: 'model', color: '#3b82f6' },
  // Layer 3 — verdict
  { id: 'safety', x: 35, y: 85, label: 'Safety Eval',   role: 'eval',  color: '#ef4444' },
  { id: 'output', x: 65, y: 85, label: 'Output Guard',  role: 'eval',  color: '#f97316' },
];

const EDGES = [
  // proxy → governance
  { s: 'proxy',  t: 'pii',    color: '#eab308' },
  { s: 'proxy',  t: 'auth',   color: '#f97316' },
  // governance → models
  { s: 'pii',    t: 'modelA', color: '#06b6d4' },
  { s: 'pii',    t: 'modelB', color: '#3b82f6' },
  { s: 'auth',   t: 'modelB', color: '#06b6d4' },
  { s: 'auth',   t: 'codeAgt',color: '#3b82f6' },
  // models → eval
  { s: 'modelA', t: 'safety', color: '#ef4444' },
  { s: 'modelB', t: 'safety', color: '#ef4444' },
  { s: 'modelB', t: 'output', color: '#f97316' },
  { s: 'codeAgt',t: 'output', color: '#ef4444' },
];

// ─── role styles (static, used by both render + canvas draw loop) ─────────
const ROLE_STYLES = {
  proxy: { border: '1.5px solid rgba(239,68,68,0.7)',  bg: 'rgba(40,5,5,0.88)',    dot: '#ef4444', labelW: 130 },
  gov:   { border: '1px solid rgba(234,179,8,0.55)',   bg: 'rgba(25,18,3,0.85)',   dot: '#eab308', labelW: 108 },
  model: { border: '1px solid rgba(59,130,246,0.50)',  bg: 'rgba(5,12,30,0.85)',   dot: '#3b82f6', labelW: 100 },
  eval:  { border: '1px solid rgba(239,68,68,0.50)',   bg: 'rgba(25,5,5,0.85)',    dot: '#ef4444', labelW: 112 },
  pass:  { border: '1px solid rgba(34,197,94,0.60)',   bg: 'rgba(3,20,8,0.88)',    dot: '#22c55e', labelW: 100 },
  block: { border: '1.5px solid rgba(239,68,68,0.70)', bg: 'rgba(40,5,5,0.88)',    dot: '#ef4444', labelW: 100 },
};

// ─── helpers ──────────────────────────────────────────────────────────────
function hex2rgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return [r,g,b];
}
function rgba([r,g,b], a) { return `rgba(${r},${g},${b},${a})`; }

function makeSprite(radius, rgb, peakAlpha) {
  const d = radius * 2;
  const c = document.createElement('canvas');
  c.width = d; c.height = d;
  const cx = c.getContext('2d');
  const g = cx.createRadialGradient(radius,radius,0, radius,radius,radius);
  g.addColorStop(0,   rgba(rgb, peakAlpha));
  g.addColorStop(0.4, rgba(rgb, peakAlpha * 0.5));
  g.addColorStop(1,   rgba(rgb, 0));
  cx.fillStyle = g; cx.fillRect(0,0,d,d);
  return c;
}

// ─── node card dimensions ─────────────────────────────────────────────────
const CARD = { w: 112, h: 36, rx: 6 };
function cardCorners(x, y, W, H) {
  return { cx: x/100*W, cy: y/100*H };
}

// ─── component ────────────────────────────────────────────────────────────
export default function AgentTraceBackground({ className = '', style = {} }) {
  const canvasRef    = useRef(null);
  const rafRef       = useRef(null);
  const frameRef     = useRef(0);
  const sigsRef      = useRef([]);
  const spritesRef   = useRef(null);
  const killRef      = useRef(0);
  const nodeStateRef = useRef({});
  const nodeCardsRef = useRef({});

  // Scroll-based blur + opacity — same logic as original AnimatedTracesBackground
  const { scrollY } = useScroll();
  const wrapperOpacity = useTransform(scrollY, [0, 400, 1200], [1, 0.3, 0.15]);
  const wrapperFilter  = useTransform(scrollY, [0, 400, 1200], ['blur(0px)', 'blur(3px)', 'blur(5px)']);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    // Pre-bake glow sprites per color
    const sprCache = {};
    const getSprite = (hexColor, radius, alpha) => {
      const key = `${hexColor}-${radius}`;
      if (!sprCache[key]) sprCache[key] = makeSprite(radius, hex2rgb(hexColor), alpha);
      return sprCache[key];
    };
    // Pre-bake common ones
    spritesRef.current = {
      redLg:    makeSprite(50,  [239,68,68],   0.45),
      amberMd:  makeSprite(30,  [234,179,8],   0.50),
      cyanSm:   makeSprite(16,  [6,182,212],   0.60),
      blueSm:   makeSprite(16,  [59,130,246],  0.60),
      greenSm:  makeSprite(20,  [34,197,94],   0.55),
      whiteSm:  makeSprite(10,  [224,247,250], 0.80),
      getSprite,
    };

    // Init node active states
    NODES.forEach(n => { nodeStateRef.current[n.id] = { active: 0 }; });

    const MAX_SIGS   = 6;
    const KILL_EVERY = 12000; // ms between kill-switch events
    let lastSpawn    = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.offsetWidth  || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Resolve pixel coords for a node
    const px = (node) => ({
      x: node.x / 100 * canvas.offsetWidth,
      y: node.y / 100 * canvas.offsetHeight,
    });

    const draw = (now) => {
      rafRef.current = requestAnimationFrame(draw);
      frameRef.current++;
      if (frameRef.current % 2 !== 0) return; // ~30fps

      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      const spr = spritesRef.current;
      const nodeState = nodeStateRef.current;

      // ── clear ──
      ctx.clearRect(0, 0, W, H);

      // ── big background radial (proxy = top centre glow) ──
      const proxyPx = px(NODES[0]);
      const bg = ctx.createRadialGradient(proxyPx.x, proxyPx.y, 0, proxyPx.x, proxyPx.y, H * 0.75);
      bg.addColorStop(0,   'rgba(40,5,5,0.65)');
      bg.addColorStop(0.25,'rgba(10,4,30,0.55)');
      bg.addColorStop(0.6, 'rgba(2,8,20,0.45)');
      bg.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── kill-switch event ──
      const isKillSwitch = (now - killRef.current) < 800;
      if (now - killRef.current > KILL_EVERY) {
        killRef.current = now;
        // Flash all nodes
        NODES.forEach(n => { nodeState[n.id].active = 1.0; });
      }
      const killAlpha = isKillSwitch ? Math.max(0, 1 - (now - killRef.current) / 800) : 0;

      // ── spawn signals ──
      if (now - lastSpawn > 500 && sigsRef.current.length < MAX_SIGS) {
        lastSpawn = now;
        const edge = EDGES[Math.floor(Math.random() * EDGES.length)];
        const srcN = NODES.find(n => n.id === edge.s);
        const tgtN = NODES.find(n => n.id === edge.t);
        sigsRef.current.push({ edge, srcN, tgtN, t: 0, speed: 0.007 + Math.random() * 0.006 });
      }

      // Decay node states
      for (const id in nodeState) nodeState[id].active = Math.max(0, nodeState[id].active - 0.015);

      // Advance signals
      const sigs = sigsRef.current;
      for (let i = sigs.length - 1; i >= 0; i--) {
        sigs[i].t += sigs[i].speed;
        if (sigs[i].t >= 1) {
          // Illuminate target — canvas glow + direct DOM update (no React re-render)
          nodeState[sigs[i].tgtN.id].active = 1.0;
          const tgtId = sigs[i].tgtN.id;
          const tgtColor = sigs[i].tgtN.color;
          const cardEl = nodeCardsRef.current[tgtId];
          if (cardEl) {
            cardEl.style.background = `${tgtColor}22`;
            cardEl.style.borderColor = tgtColor;
            cardEl.style.boxShadow = `0 0 20px ${tgtColor}60, 0 0 40px ${tgtColor}25`;
            const dotEl = cardEl.querySelector('.node-dot');
            if (dotEl) dotEl.style.boxShadow = `0 0 10px ${tgtColor}`;
            const labelEl = cardEl.querySelector('.node-label');
            if (labelEl) labelEl.style.color = '#fff';
            setTimeout(() => {
              if (!cardEl) return;
              const rs = ROLE_STYLES[NODES.find(n => n.id === tgtId)?.role];
              if (rs) {
                cardEl.style.background = rs.bg;
                cardEl.style.borderColor = '';
                cardEl.style.boxShadow = 'none';
              }
              if (dotEl) dotEl.style.boxShadow = `0 0 4px ${tgtColor}80`;
              if (labelEl) labelEl.style.color = `${tgtColor}cc`;
            }, 600);
          }
          sigsRef.current.splice(i, 1);
          continue;
        }
      }

      // ── draw edges ────────────────────────────────────────────────────
      const dashSpeed = now * 0.04;

      for (const edge of EDGES) {
        const srcN = NODES.find(n => n.id === edge.s);
        const tgtN = NODES.find(n => n.id === edge.t);
        const { x: x1, y: y1 } = px(srcN);
        const { x: x2, y: y2 } = px(tgtN);

        const edgeColor = isKillSwitch ? '#ef4444' : edge.color;
        const alpha     = isKillSwitch ? 0.35 + killAlpha * 0.45 : 0.22;

        // Flowing dash background — wide, dim
        ctx.save();
        ctx.strokeStyle = edgeColor + '28';
        ctx.lineWidth   = 4;
        ctx.setLineDash([10, 8]);
        ctx.lineDashOffset = -(dashSpeed % 18);
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        ctx.restore();

        // Core flowing dash — fine bright line
        ctx.save();
        ctx.strokeStyle = edgeColor + Math.round(alpha * 255).toString(16).padStart(2,'0');
        ctx.lineWidth   = 1.2;
        ctx.setLineDash([6, 8]);
        ctx.lineDashOffset = -(dashSpeed % 14);
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        ctx.restore();

        // Kill-switch: solid red flash
        if (isKillSwitch && killAlpha > 0.3) {
          ctx.strokeStyle = `rgba(239,68,68,${killAlpha * 0.5})`;
          ctx.lineWidth   = 3;
          ctx.setLineDash([]);
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        }
      }

      // ── draw signal pulses with gradient trails ────────────────────────
      for (const sig of sigs) {
        const { x: x1, y: y1 } = px(sig.srcN);
        const { x: x2, y: y2 } = px(sig.tgtN);
        const t  = sig.t;
        const hx = x1 + (x2 - x1) * t;
        const hy = y1 + (y2 - y1) * t;

        // Trail
        const TRAIL = 0.25;
        const t0  = Math.max(0, t - TRAIL);
        const tx0 = x1 + (x2 - x1) * t0;
        const ty0 = y1 + (y2 - y1) * t0;
        const tg  = ctx.createLinearGradient(tx0, ty0, hx, hy);
        const rgb = hex2rgb(sig.edge.color);
        tg.addColorStop(0, rgba(rgb, 0));
        tg.addColorStop(1, rgba(rgb, 0.80));
        ctx.strokeStyle = tg;
        ctx.lineWidth   = 3.5;
        ctx.setLineDash([]);
        ctx.beginPath(); ctx.moveTo(tx0, ty0); ctx.lineTo(hx, hy); ctx.stroke();

        // Glow sprite at head
        const sprKey = sig.edge.color === '#06b6d4' ? 'cyanSm' : sig.edge.color === '#3b82f6' ? 'blueSm' : sig.edge.color === '#22c55e' ? 'greenSm' : 'amberMd';
        const gSpr   = spr[sprKey];
        const gR     = gSpr.width / 2;
        ctx.drawImage(gSpr, hx - gR, hy - gR);

        // Bright core dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(hx, hy, 2.5, 0, 6.28); ctx.fill();
      }

      // ── draw node glow (under the HTML cards) ─────────────────────────
      for (const node of NODES) {
        const { x, y } = px(node);
        const state = nodeState[node.id];
        if (state.active < 0.05 && !isKillSwitch) continue;

        const intensity = isKillSwitch ? Math.max(state.active, killAlpha * 0.8) : state.active;
        const rgb = hex2rgb(isKillSwitch && node.role !== 'pass' ? '#ef4444' : node.color);
        const sprR = node.role === 'proxy' ? 50 : 30;
        const g = spr.getSprite(isKillSwitch && node.role !== 'pass' ? '#ef4444' : node.color, sprR, 0.55);
        ctx.globalAlpha = Math.min(intensity, 1);
        ctx.drawImage(g, x - sprR, y - sprR);
        ctx.globalAlpha = 1;
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  const roleStyles = ROLE_STYLES;

  return (
    <motion.div
      className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      style={{ opacity: wrapperOpacity, filter: wrapperFilter, ...style }}
    >
      {/* Canvas layer — background + edges + signals + glows */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* HTML node card layer */}
      {NODES.map(node => {
        const rs = roleStyles[node.role];
        return (
          <div
            key={node.id}
            ref={el => { if (el) nodeCardsRef.current[node.id] = el; }}
            className="absolute flex items-center gap-2 rounded-md px-3 py-1.5"
            style={{
              left: `${node.x}%`,
              top:  `${node.y}%`,
              transform: 'translate(-50%, -50%)',
              background: rs.bg,
              border: rs.border,
              boxShadow: 'none',
              minWidth: rs.labelW,
              backdropFilter: 'blur(4px)',
              transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
            }}
          >
            {/* Pulsing dot */}
            <div
              className="flex-none rounded-full node-dot"
              style={{
                width:      node.role === 'proxy' ? 8 : 6,
                height:     node.role === 'proxy' ? 8 : 6,
                background: node.color,
                boxShadow:  `0 0 4px ${node.color}80`,
                animation:  'nodePulse 2s ease-in-out infinite',
                animationDelay: `${NODES.indexOf(node) * 0.15}s`,
                transition: 'box-shadow 0.2s',
              }}
            />
            {/* Label */}
            <span
              className="font-mono uppercase tracking-widest leading-none node-label"
              style={{
                fontSize:   node.role === 'proxy' ? '10px' : '8.5px',
                color:      `${node.color}cc`,
                fontWeight: node.role === 'proxy' || node.role === 'pass' || node.role === 'block' ? 700 : 500,
                whiteSpace: 'nowrap',
                transition: 'color 0.2s',
              }}
            >
              {node.label}
            </span>
          </div>
        );
      })}

      {/* CSS for node dot pulse */}
      <style>{`
        @keyframes nodePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }
      `}</style>
    </motion.div>
  );
}
