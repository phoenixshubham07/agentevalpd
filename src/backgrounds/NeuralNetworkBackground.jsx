import React, { useEffect, useRef } from 'react';

/*
  NeuralNetworkBackground v2 — ENHANCED
  ───────────────────────────────────────
  Key upgrades over v1:
  • Hub nodes — size + glow scale with edge count (degree)
  • Signal TRAILS — gradient line behind the travelling dot, not just a dot
  • Radial pulse WAVES emanating from sentinel periodically
  • Fiber-optic edge alpha — edges fade toward endpoints
  • Depth gradient background — blue-purple nebula behind the graph
  • More concurrent signals (20), larger pool, shorter spawn interval
  • Secondary "sub-sentinel" nodes with extra connections
  • Nodes breathe at different rates with stronger amplitude
  Performance: pre-baked sprites, ~30fps, no ctx.filter
*/

const CYAN  = [6,  182, 212];
const BLUE  = [59, 130, 246];
const AMBER = [234, 179, 8];
const RED   = [239, 68,  68];
const WHITE = [224, 247, 250];
const VIOLET= [139, 92,  246];

function rgba([r, g, b], a) { return `rgba(${r},${g},${b},${a})`; }

// ─── offscreen sprite ──────────────────────────────────────────────────────
function makeSprite(radius, color, peakAlpha) {
  const d = radius * 2;
  const c = document.createElement('canvas');
  c.width = d; c.height = d;
  const cx = c.getContext('2d');
  const g = cx.createRadialGradient(radius, radius, 0, radius, radius, radius);
  g.addColorStop(0,   rgba(color, peakAlpha));
  g.addColorStop(0.35,rgba(color, peakAlpha * 0.55));
  g.addColorStop(0.7, rgba(color, peakAlpha * 0.20));
  g.addColorStop(1,   rgba(color, 0));
  cx.fillStyle = g;
  cx.fillRect(0, 0, d, d);
  return c;
}

// ─── graph builder ────────────────────────────────────────────────────────
function buildGraph(W, H) {
  const rnd = () => Math.random();
  const N = Math.min(Math.max(Math.floor((W * H) / 11000), 60), 140);
  const MAX_DIST = Math.min(W, H) * 0.25;

  const nodes = [];

  // ── Sentinel (always index 0) ──
  nodes.push({
    x: W * (0.35 + rnd() * 0.30),
    y: H * (0.35 + rnd() * 0.30),
    baseR: 8,
    color: CYAN,
    kind: 'sentinel',
    degree: 0,
    phase: 0, speed: 0.020, active: 0,
  });

  // ── 3 sub-sentinels ──
  for (let i = 0; i < 3; i++) {
    const angle = (Math.PI * 2 / 3) * i + rnd() * 0.5;
    const dist  = MAX_DIST * (0.4 + rnd() * 0.35);
    nodes.push({
      x: nodes[0].x + Math.cos(angle) * dist,
      y: nodes[0].y + Math.sin(angle) * dist,
      baseR: 5, color: BLUE, kind: 'sub', degree: 0,
      phase: rnd() * 6.28, speed: 0.014 + rnd() * 0.012, active: 0,
    });
  }

  // ── Regular nodes ──
  for (let i = nodes.length; i < N; i++) {
    const isAmber  = rnd() < 0.055;
    const isRed    = !isAmber && rnd() < 0.035;
    const isViolet = !isAmber && !isRed && rnd() < 0.04;
    const color    = isRed ? RED : isAmber ? AMBER : isViolet ? VIOLET : rnd() < 0.42 ? BLUE : CYAN;
    nodes.push({
      x: W * (0.03 + rnd() * 0.94),
      y: H * (0.03 + rnd() * 0.94),
      baseR: 2 + rnd() * 2.5,
      color, kind: 'normal',
      isAmber, isRed, isViolet,
      degree: 0,
      phase: rnd() * 6.28, speed: 0.009 + rnd() * 0.018, active: 0,
    });
  }

  // ── Edges ──
  const edges    = [];
  const edgeSet  = new Set();
  const degreeMap = new Array(N).fill(0);
  const maxDeg   = (i) => nodes[i].kind === 'sentinel' ? 14 : nodes[i].kind === 'sub' ? 8 : 5;

  for (let i = 0; i < N; i++) {
    const others = [];
    for (let j = 0; j < N; j++) {
      if (i === j) continue;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d <= MAX_DIST) others.push({ j, d });
    }
    others.sort((a, b) => a.d - b.d);

    for (const { j, d } of others) {
      if (degreeMap[i] >= maxDeg(i)) break;
      if (degreeMap[j] >= maxDeg(j) + 2) continue;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);
      degreeMap[i]++;
      degreeMap[j]++;
      const isSentinelEdge = i === 0 || j === 0;
      const isSubEdge      = nodes[i].kind === 'sub' || nodes[j].kind === 'sub';
      edges.push({
        i, j,
        len: d,
        color: nodes[i].color === BLUE || nodes[j].color === BLUE ? BLUE : CYAN,
        active: 0,
        baseAlpha: isSentinelEdge ? 0.25 : isSubEdge ? 0.18 : 0.09 + Math.random() * 0.10,
        isSentinelEdge, isSubEdge,
      });
    }
  }

  // Write back degrees for node sizing
  for (let i = 0; i < N; i++) nodes[i].degree = degreeMap[i];

  // Clamp sub-sentinel positions to canvas bounds
  for (const n of nodes) {
    n.x = Math.max(20, Math.min(W - 20, n.x));
    n.y = Math.max(20, Math.min(H - 20, n.y));
  }

  return { nodes, edges };
}

// ─── component ───────────────────────────────────────────────────────────
export default function NeuralNetworkBackground({ className = '', style = {} }) {
  const canvasRef  = useRef(null);
  const rafRef     = useRef(null);
  const layoutRef  = useRef(null);
  const sigsRef    = useRef([]);
  const wavesRef   = useRef([]);   // radial pulse waves from sentinel
  const spritesRef = useRef(null);
  const frameRef   = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    // Pre-bake sprites
    spritesRef.current = {
      cyanSm:     makeSprite(22, CYAN,   0.55),
      cyanMd:     makeSprite(40, CYAN,   0.38),
      cyanLg:     makeSprite(70, CYAN,   0.28),
      cyanXl:     makeSprite(110,CYAN,   0.22),
      blueSm:     makeSprite(20, BLUE,   0.55),
      blueMd:     makeSprite(36, BLUE,   0.35),
      amberMd:    makeSprite(30, AMBER,  0.60),
      redMd:      makeSprite(30, RED,    0.60),
      violetMd:   makeSprite(28, VIOLET, 0.50),
      sentGlow:   makeSprite(130,CYAN,   0.28),
      hubGlow:    makeSprite(55, BLUE,   0.35),
      sigTrail:   makeSprite(14, WHITE,  0.70),
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.offsetWidth  || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layoutRef.current = buildGraph(w, h);
      sigsRef.current   = [];
      wavesRef.current  = [];
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const MAX_SIGS  = 20;
    let lastSpawn   = 0;
    let lastWave    = 0;

    const draw = (now) => {
      rafRef.current = requestAnimationFrame(draw);
      frameRef.current++;
      if (frameRef.current % 2 !== 0) return; // ~30fps

      if (!layoutRef.current) return;
      const { nodes, edges } = layoutRef.current;
      const spr = spritesRef.current;
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      const sentinel = nodes[0];

      // ── clear ──
      ctx.fillStyle = '#010c18';
      ctx.fillRect(0, 0, W, H);

      // ── depth nebula background ──────────────────────────────────────────
      // Deep radial glow centred on sentinel
      const nbg = ctx.createRadialGradient(sentinel.x, sentinel.y, 0, sentinel.x, sentinel.y, Math.max(W, H) * 0.7);
      nbg.addColorStop(0,    'rgba(6,30,70,0.85)');
      nbg.addColorStop(0.30, 'rgba(5,15,40,0.60)');
      nbg.addColorStop(0.65, 'rgba(15,5,35,0.40)');
      nbg.addColorStop(1,    'rgba(1,12,24,0)');
      ctx.fillStyle = nbg;
      ctx.fillRect(0, 0, W, H);

      // Secondary violet accent nebula (off-centre)
      const vnb = ctx.createRadialGradient(W * 0.75, H * 0.25, 0, W * 0.75, H * 0.25, W * 0.45);
      vnb.addColorStop(0,   'rgba(60,20,100,0.12)');
      vnb.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = vnb;
      ctx.fillRect(0, 0, W, H);

      // ── static star field ─────────────────────────────────────────────
      ctx.fillStyle = 'rgba(255,255,255,0.022)';
      const sr = (s) => { let x = Math.sin(s) * 43758.5453; return x - Math.floor(x); };
      for (let i = 0; i < 120; i++) {
        const sx = sr(i * 1.13) * W;
        const sy = sr(i * 2.31) * H;
        const ss = sr(i * 3.77) * 1.4;
        ctx.beginPath(); ctx.arc(sx, sy, ss, 0, 6.28); ctx.fill();
      }

      // Faint distant cluster
      ctx.fillStyle = 'rgba(200,210,255,0.015)';
      for (let i = 0; i < 40; i++) {
        const sx = sr(i * 5.11 + 7) * W;
        const sy = sr(i * 6.23 + 3) * H;
        ctx.beginPath(); ctx.arc(sx, sy, 1.5, 0, 6.28); ctx.fill();
      }

      // ── spawn signals ─────────────────────────────────────────────────
      if (now - lastSpawn > 240 && sigsRef.current.length < MAX_SIGS) {
        lastSpawn = now;
        const sentEdges = edges.filter(e => e.i === 0 || e.j === 0);
        const subEdges  = edges.filter(e => nodes[e.i].kind === 'sub' || nodes[e.j].kind === 'sub');
        const r = Math.random();
        const pool = r < 0.45 ? sentEdges
                   : r < 0.70 ? subEdges
                   : edges;
        if (pool.length) {
          const edge = pool[Math.floor(Math.random() * pool.length)];
          sigsRef.current.push({
            edge,
            t: 0,
            speed: 0.005 + Math.random() * 0.008,
            reversed: Math.random() < 0.5,
            color: edge.color,
          });
        }
      }

      // ── spawn pulse waves ─────────────────────────────────────────────
      if (now - lastWave > 2800) {
        lastWave = now;
        wavesRef.current.push({ r: 0, maxR: Math.min(W, H) * 0.55, alpha: 0.55, color: CYAN });
      }

      // ── advance ───────────────────────────────────────────────────────
      for (const e of edges) e.active = Math.max(0, e.active - 0.014);
      for (const n of nodes) n.active = Math.max(0, n.active - 0.010);
      const sigs = sigsRef.current;
      for (let i = sigs.length - 1; i >= 0; i--) {
        sigs[i].t += sigs[i].speed;
        if (sigs[i].t >= 1) {
          const dIdx = sigs[i].reversed ? sigs[i].edge.i : sigs[i].edge.j;
          nodes[dIdx].active = Math.min(1, nodes[dIdx].active + 0.9);
          sigsRef.current.splice(i, 1);
          continue;
        }
        sigs[i].edge.active = Math.min(1, sigs[i].edge.active + 0.5);
      }
      // Advance waves
      const waves = wavesRef.current;
      for (let i = waves.length - 1; i >= 0; i--) {
        waves[i].r     += 4.5;
        waves[i].alpha  = 0.55 * (1 - waves[i].r / waves[i].maxR);
        if (waves[i].r >= waves[i].maxR) { waves.splice(i, 1); }
      }

      // ── pulse waves (draw before edges so they sit behind) ────────────
      for (const wave of waves) {
        ctx.strokeStyle = rgba(wave.color, wave.alpha * 0.7);
        ctx.lineWidth   = 2;
        ctx.beginPath(); ctx.arc(sentinel.x, sentinel.y, wave.r, 0, 6.28); ctx.stroke();
        ctx.strokeStyle = rgba(wave.color, wave.alpha * 0.3);
        ctx.lineWidth   = 6;
        ctx.beginPath(); ctx.arc(sentinel.x, sentinel.y, wave.r, 0, 6.28); ctx.stroke();
      }

      // ── edges (fiber-optic: fade toward endpoints) ────────────────────
      for (const e of edges) {
        const ni = nodes[e.i], nj = nodes[e.j];
        const a  = Math.min(e.baseAlpha + e.active * 0.55, 0.9);

        // Gradient along edge: bright at node ends, dim in middle - fiber optic look
        const edgeGrd = ctx.createLinearGradient(ni.x, ni.y, nj.x, nj.y);
        edgeGrd.addColorStop(0,   rgba(e.color, a * 0.85));
        edgeGrd.addColorStop(0.25,rgba(e.color, a * 0.50));
        edgeGrd.addColorStop(0.5, rgba(e.color, a * 0.35));
        edgeGrd.addColorStop(0.75,rgba(e.color, a * 0.50));
        edgeGrd.addColorStop(1,   rgba(e.color, a * 0.85));

        // Wide glow on active edges
        if (e.active > 0.2) {
          ctx.strokeStyle = rgba(e.color, e.active * 0.15);
          ctx.lineWidth = 8;
          ctx.beginPath(); ctx.moveTo(ni.x, ni.y); ctx.lineTo(nj.x, nj.y); ctx.stroke();
        }

        // Core edge with gradient
        ctx.strokeStyle = edgeGrd;
        ctx.lineWidth = e.isSentinelEdge ? 1.4 : e.isSubEdge ? 1.1 : 0.85;
        ctx.beginPath(); ctx.moveTo(ni.x, ni.y); ctx.lineTo(nj.x, nj.y); ctx.stroke();
      }

      // ── signal pulses with gradient trails ────────────────────────────
      for (const sig of sigs) {
        const { i: si, j: sj } = sig.edge;
        const na = nodes[si], nb = nodes[sj];
        const t  = sig.reversed ? (1 - sig.t) : sig.t;
        const px = na.x + (nb.x - na.x) * t;
        const py = na.y + (nb.y - na.y) * t;

        // TRAIL: gradient from 30% behind the dot to the dot
        const TRAIL = 0.22;
        const t0    = Math.max(0, t - TRAIL);
        const tx0   = na.x + (nb.x - na.x) * t0;
        const ty0   = na.y + (nb.y - na.y) * t0;
        const trailGrd = ctx.createLinearGradient(tx0, ty0, px, py);
        trailGrd.addColorStop(0, rgba(sig.color, 0));
        trailGrd.addColorStop(1, rgba(sig.color, 0.7));
        ctx.strokeStyle = trailGrd;
        ctx.lineWidth   = 3;
        ctx.beginPath(); ctx.moveTo(tx0, ty0); ctx.lineTo(px, py); ctx.stroke();

        // Glow halo at head
        ctx.drawImage(spr.sigTrail, px - 14, py - 14);
        ctx.drawImage(sig.color === CYAN ? spr.cyanSm : spr.blueSm, px - 22, py - 22);

        // Bright white core
        ctx.fillStyle = 'rgba(240,252,255,0.95)';
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, 6.28); ctx.fill();
      }

      // ── nodes ─────────────────────────────────────────────────────────
      for (const node of nodes) {
        node.phase += node.speed;
        const p    = (Math.sin(node.phase) + 1) * 0.5;
        const al   = 0.40 + p * 0.55 + node.active * 0.35;

        // Hub size: scales with degree
        const degScale = 1 + Math.min(node.degree, 8) * 0.12;
        const r        = node.baseR * degScale;

        if (node.kind === 'sentinel') {
          // ─ Sentinel: XL glow + pulsing rings ─
          ctx.drawImage(spr.sentGlow, sentinel.x - 130, sentinel.y - 130);
          ctx.drawImage(spr.cyanXl,  sentinel.x - 110, sentinel.y - 110);
          ctx.drawImage(spr.cyanLg,  sentinel.x - 70,  sentinel.y - 70);

          // Outer breathing ring
          ctx.strokeStyle = rgba(CYAN, 0.18 + p * 0.20);
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(sentinel.x, sentinel.y, r + 22 + p * 8, 0, 6.28); ctx.stroke();
          // Mid ring
          ctx.strokeStyle = rgba(CYAN, 0.35 + p * 0.30);
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.arc(sentinel.x, sentinel.y, r + 9, 0, 6.28); ctx.stroke();
          // Spinning dashes
          const dashCount = 8;
          for (let d = 0; d < dashCount; d++) {
            const ang = (now * 0.0003) + (Math.PI * 2 / dashCount) * d;
            const dr  = r + 14;
            const x1  = sentinel.x + Math.cos(ang) * dr;
            const y1  = sentinel.y + Math.sin(ang) * dr;
            const x2  = sentinel.x + Math.cos(ang) * (dr + 5);
            const y2  = sentinel.y + Math.sin(ang) * (dr + 5);
            ctx.strokeStyle = rgba(CYAN, 0.5);
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
          }
          // Core fill
          ctx.fillStyle = rgba(CYAN, 0.85);
          ctx.beginPath(); ctx.arc(sentinel.x, sentinel.y, r, 0, 6.28); ctx.fill();
          // Hot center
          ctx.fillStyle = 'rgba(220,250,255,0.95)';
          ctx.beginPath(); ctx.arc(sentinel.x, sentinel.y, r * 0.45, 0, 6.28); ctx.fill();

        } else if (node.kind === 'sub') {
          // ─ Sub-sentinel ─
          ctx.drawImage(spr.blueMd, node.x - 36, node.y - 36);
          ctx.strokeStyle = rgba(BLUE, 0.3 + p * 0.35);
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(node.x, node.y, r + 5 + p * 3, 0, 6.28); ctx.stroke();
          ctx.fillStyle = rgba(BLUE, al * 0.85);
          ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, 6.28); ctx.fill();
          ctx.fillStyle = 'rgba(180,210,255,0.8)';
          ctx.beginPath(); ctx.arc(node.x, node.y, r * 0.4, 0, 6.28); ctx.fill();

        } else if (node.isAmber) {
          ctx.drawImage(spr.amberMd, node.x - 30, node.y - 30);
          ctx.fillStyle = rgba(AMBER, al);
          ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, 6.28); ctx.fill();
          ctx.strokeStyle = rgba(AMBER, al * 0.5);
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.arc(node.x, node.y, r + 3 + p * 2, 0, 6.28); ctx.stroke();

        } else if (node.isRed) {
          ctx.drawImage(spr.redMd, node.x - 30, node.y - 30);
          ctx.fillStyle = rgba(RED, al);
          ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, 6.28); ctx.fill();
          ctx.fillStyle = `rgba(255,150,150,${al * 0.8})`;
          ctx.beginPath(); ctx.arc(node.x, node.y, r * 0.4, 0, 6.28); ctx.fill();

        } else if (node.isViolet) {
          ctx.drawImage(spr.violetMd, node.x - 28, node.y - 28);
          ctx.fillStyle = rgba(VIOLET, al * 0.9);
          ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, 6.28); ctx.fill();

        } else {
          // ─ Regular node: size and glow scale with degree ─
          if (node.degree >= 3) {
            const gSpr = node.color === BLUE ? spr.blueSm : spr.cyanSm;
            ctx.drawImage(gSpr, node.x - 22, node.y - 22);
          }
          // Outer ring
          ctx.strokeStyle = rgba(node.color, al * 0.45);
          ctx.lineWidth = 0.7;
          ctx.beginPath(); ctx.arc(node.x, node.y, r + 2 + p * 1.5, 0, 6.28); ctx.stroke();
          // Fill
          ctx.fillStyle = rgba(node.color, al * 0.80);
          ctx.beginPath(); ctx.arc(node.x, node.y, r * 0.65, 0, 6.28); ctx.fill();
        }
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={style}
    />
  );
}
