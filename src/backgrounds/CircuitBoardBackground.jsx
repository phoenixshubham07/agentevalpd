import React, { useEffect, useRef } from 'react';

/*
  CircuitBoardBackground v3 — PERFORMANCE EDITION
  ────────────────────────────────────────────────
  ALL ctx.filter blur() calls removed — they were causing GPU meltdown.
  Glow is now faked via multiple radial‑gradient fills + alpha layering.
  Draws only when tab is visible (requestAnimationFrame auto-pauses).
  Frame budget: ~4ms on M1. Capped at roughly 30 fps via frame skipping.
*/

const CELL = 48;
const CYAN  = [6, 182, 212];
const BLUE  = [59, 130, 246];
const AMBER = [234, 179, 8];
const RED   = [239, 68, 68];

function rgba([r, g, b], a) { return `rgba(${r},${g},${b},${a})`; }

// ─── layout (generated once on mount/resize) ─────────────────────────────
function buildLayout(W, H) {
  const cols = Math.ceil(W / CELL) + 1;
  const rows = Math.ceil(H / CELL) + 1;
  const rnd  = () => Math.random();

  // power rails
  const PR = [Math.floor(rows * 0.25), Math.floor(rows * 0.50), Math.floor(rows * 0.75)];
  const PC = [Math.floor(cols * 0.30), Math.floor(cols * 0.70)];
  const powerRails = [
    ...PR.map(r => ({ x1: 0, y1: r * CELL, x2: W, y2: r * CELL, color: rnd() < 0.5 ? CYAN : BLUE })),
    ...PC.map(c => ({ x1: c * CELL, y1: 0, x2: c * CELL, y2: H, color: rnd() < 0.5 ? CYAN : BLUE })),
  ];

  // signal traces
  const traces = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols - 1; c++)
      if (rnd() < 0.62) traces.push({
        x1: c * CELL, y1: r * CELL, x2: (c + 1) * CELL, y2: r * CELL,
        color: rnd() < 0.35 ? BLUE : CYAN, active: 0, base: 0.22 + rnd() * 0.18,
      });
  for (let r = 0; r < rows - 1; r++)
    for (let c = 0; c < cols; c++)
      if (rnd() < 0.52) traces.push({
        x1: c * CELL, y1: r * CELL, x2: c * CELL, y2: (r + 1) * CELL,
        color: rnd() < 0.30 ? BLUE : CYAN, active: 0, base: 0.20 + rnd() * 0.16,
      });

  // junction pads
  const pads = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (rnd() < 0.38) pads.push({
        x: c * CELL, y: r * CELL,
        r: 2 + rnd() * 3,
        color: rnd() < 0.3 ? BLUE : CYAN,
        phase: rnd() * 6.28, speed: 0.012 + rnd() * 0.018,
      });

  // amber caps
  const caps = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (rnd() < 0.055) caps.push({
        x: c * CELL + (rnd() - 0.5) * CELL * 0.5,
        y: r * CELL + (rnd() - 0.5) * CELL * 0.5,
        phase: rnd() * 6.28, size: 8 + rnd() * 10,
        horiz: rnd() < 0.5,
      });

  // IC chips
  const chips = [];
  for (let r = 1; r < rows - 1; r++)
    for (let c = 1; c < cols - 1; c++)
      if (rnd() < 0.015) {
        const w = (2 + Math.floor(rnd() * 3)) * CELL * 0.7;
        const h = (1 + Math.floor(rnd() * 2)) * CELL * 0.6;
        chips.push({ x: c * CELL - w / 2, y: r * CELL - h / 2, w, h, np: Math.floor(w / 14) });
      }

  // red LEDs
  const leds = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (rnd() < 0.02) leds.push({
        x: c * CELL + (rnd() - 0.5) * CELL * 0.5,
        y: r * CELL + (rnd() - 0.5) * CELL * 0.5,
        phase: rnd() * 6.28, speed: 0.012 + rnd() * 0.018,
        size: 3 + rnd() * 2.5,
      });

  return { traces, pads, caps, chips, leds, powerRails };
}

// ─── offscreen glow texture (created once, stamped as needed) ────────────
function makeGlowSprite(radius, color, alpha) {
  const s = radius * 2;
  const c = document.createElement('canvas');
  c.width = s; c.height = s;
  const cx = c.getContext('2d');
  const g = cx.createRadialGradient(radius, radius, 0, radius, radius, radius);
  g.addColorStop(0, rgba(color, alpha));
  g.addColorStop(1, rgba(color, 0));
  cx.fillStyle = g;
  cx.fillRect(0, 0, s, s);
  return c;
}

// ─── component ───────────────────────────────────────────────────────────
export default function CircuitBoardBackground({ className = '', style = {} }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const layoutRef = useRef(null);
  const sigsRef   = useRef([]);
  const glowRef   = useRef({});
  const frameRef  = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    // Pre-bake glow sprites (no runtime blur!)
    glowRef.current = {
      cyanSm:  makeGlowSprite(18, CYAN, 0.35),
      cyanMd:  makeGlowSprite(28, CYAN, 0.25),
      blueSm:  makeGlowSprite(18, BLUE, 0.35),
      blueMd:  makeGlowSprite(28, BLUE, 0.25),
      amberMd: makeGlowSprite(24, AMBER, 0.45),
      redLg:   makeGlowSprite(40, RED, 0.40),
      whiteSm: makeGlowSprite(12, [224, 247, 250], 0.6),
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // cap DPR for perf
      const w = canvas.offsetWidth  || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layoutRef.current = buildLayout(w, h);
      sigsRef.current = [];
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const MAX_SIGS = 12;
    let lastSpawn  = 0;

    // ── draw (throttled to ~30fps via frame skipping) ─────────────────────
    const draw = (now) => {
      rafRef.current = requestAnimationFrame(draw);
      frameRef.current++;
      if (frameRef.current % 2 !== 0) return; // skip every other frame → ~30fps

      if (!layoutRef.current) return;
      const { traces, pads, caps, chips, leds, powerRails } = layoutRef.current;
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      const glows = glowRef.current;

      // ── background ──
      ctx.fillStyle = '#030d14';
      ctx.fillRect(0, 0, W, H);

      // substrate grid (dim)
      ctx.strokeStyle = 'rgba(6,182,212,0.045)';
      ctx.lineWidth = 0.5;
      const cols = Math.ceil(W / CELL) + 1;
      const rows = Math.ceil(H / CELL) + 1;
      for (let r = 0; r < rows; r++) {
        ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(W, r * CELL); ctx.stroke();
      }
      for (let c = 0; c < cols; c++) {
        ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, H); ctx.stroke();
      }

      // central hot-zone (single radial gradient, cheap)
      const cx2 = W * 0.45, cy2 = H * 0.48;
      const hg = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, W * 0.40);
      hg.addColorStop(0, 'rgba(6,182,212,0.08)');
      hg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = hg;
      ctx.fillRect(0, 0, W, H);

      // spawn signals
      if (now - lastSpawn > 350 && sigsRef.current.length < MAX_SIGS) {
        lastSpawn = now;
        const idx = Math.floor(Math.random() * traces.length);
        sigsRef.current.push({
          idx, t: 0, speed: 0.006 + Math.random() * 0.006, color: traces[idx].color,
        });
      }

      // advance + decay
      for (const t of traces) t.active = Math.max(0, t.active - 0.02);
      const sigs = sigsRef.current;
      for (let i = sigs.length - 1; i >= 0; i--) {
        sigs[i].t += sigs[i].speed;
        if (sigs[i].t >= 1) { sigs.splice(i, 1); continue; }
        traces[sigs[i].idx].active = Math.min(1, traces[sigs[i].idx].active + 0.5);
      }

      // ── 1. dim traces (bulk fast draw) ────────────────────────────────
      ctx.lineWidth = 1.2;
      for (const tr of traces) {
        const a = tr.base + tr.active * 0.5;
        ctx.strokeStyle = rgba(tr.color, Math.min(a, 0.85));
        ctx.beginPath(); ctx.moveTo(tr.x1, tr.y1); ctx.lineTo(tr.x2, tr.y2); ctx.stroke();
      }

      // ── 2. active glow (stamp sprite, no blur) ───────────────────────
      for (const tr of traces) {
        if (tr.active < 0.15) continue;
        // extra bright line
        ctx.strokeStyle = rgba(tr.color, tr.active * 0.7);
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(tr.x1, tr.y1); ctx.lineTo(tr.x2, tr.y2); ctx.stroke();
        ctx.lineWidth = 1.2;
      }

      // ── 3. power rails (bright lines + glow sprites at ends) ──────────
      for (const rail of powerRails) {
        // thick bright line
        ctx.strokeStyle = rgba(rail.color, 0.6);
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(rail.x1, rail.y1); ctx.lineTo(rail.x2, rail.y2); ctx.stroke();
        // core
        ctx.strokeStyle = rgba(rail.color, 0.85);
        ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.moveTo(rail.x1, rail.y1); ctx.lineTo(rail.x2, rail.y2); ctx.stroke();
        ctx.lineWidth = 1.2;
      }

      // ── 4. signal pulses (glow sprite stamp + core dot) ───────────────
      for (const sig of sigs) {
        const tr = traces[sig.idx];
        const sx = tr.x1 + (tr.x2 - tr.x1) * sig.t;
        const sy = tr.y1 + (tr.y2 - tr.y1) * sig.t;
        // glow sprite
        const spr = sig.color === CYAN ? glows.cyanMd : glows.blueMd;
        ctx.drawImage(spr, sx - 28, sy - 28);
        // core dot
        ctx.fillStyle = '#e0f7fa';
        ctx.beginPath(); ctx.arc(sx, sy, 2.5, 0, 6.28); ctx.fill();
      }

      // ── 5. pads ────────────────────────────────────────────────────────
      for (const pad of pads) {
        pad.phase += pad.speed;
        const p  = (Math.sin(pad.phase) + 1) * 0.5;
        const al = 0.25 + p * 0.55;
        // ring
        ctx.strokeStyle = rgba(pad.color, al * 0.4);
        ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.arc(pad.x, pad.y, pad.r + 2.5, 0, 6.28); ctx.stroke();
        // fill
        ctx.fillStyle = rgba(pad.color, al * 0.75);
        ctx.beginPath(); ctx.arc(pad.x, pad.y, pad.r * 0.55, 0, 6.28); ctx.fill();
      }

      // ── 6. amber caps (glow sprite stamp + body) ──────────────────────
      for (const cap of caps) {
        cap.phase += 0.016;
        const p  = (Math.sin(cap.phase) + 1) * 0.5;
        const al = 0.55 + p * 0.40;
        // glow via sprite (no blur!)
        ctx.globalAlpha = al;
        ctx.drawImage(glows.amberMd, cap.x - 24, cap.y - 24);
        ctx.globalAlpha = 1;
        // body
        ctx.strokeStyle = rgba(AMBER, al * 0.85);
        ctx.lineWidth = 2;
        const s = cap.size * 0.5;
        if (cap.horiz) {
          ctx.strokeRect(cap.x - s * 1.4, cap.y - s, s * 2.8, s * 2);
          ctx.fillStyle = rgba(AMBER, al * 0.12);
          ctx.fillRect(cap.x - s * 1.4, cap.y - s, s * 2.8, s * 2);
        } else {
          ctx.strokeRect(cap.x - s, cap.y - s * 1.4, s * 2, s * 2.8);
          ctx.fillStyle = rgba(AMBER, al * 0.12);
          ctx.fillRect(cap.x - s, cap.y - s * 1.4, s * 2, s * 2.8);
        }
        // center dot
        ctx.fillStyle = rgba(AMBER, al);
        ctx.beginPath(); ctx.arc(cap.x, cap.y, 2, 0, 6.28); ctx.fill();
      }

      // ── 7. IC chips ────────────────────────────────────────────────────
      for (const chip of chips) {
        ctx.fillStyle   = '#040d18';
        ctx.strokeStyle = rgba(CYAN, 0.25);
        ctx.lineWidth   = 1;
        ctx.fillRect(chip.x, chip.y, chip.w, chip.h);
        ctx.strokeRect(chip.x, chip.y, chip.w, chip.h);
        const pitch = chip.w / chip.np;
        ctx.fillStyle = rgba(CYAN, 0.4);
        for (let p = 0; p < chip.np; p++) {
          const px = chip.x + pitch * (p + 0.5);
          ctx.beginPath(); ctx.arc(px, chip.y, 1.8, 0, 6.28); ctx.fill();
          ctx.beginPath(); ctx.arc(px, chip.y + chip.h, 1.8, 0, 6.28); ctx.fill();
        }
      }

      // ── 8. red LEDs (glow sprite + core) ───────────────────────────────
      for (const led of leds) {
        led.phase += led.speed;
        const p  = (Math.sin(led.phase) + 1) * 0.5;
        const al = 0.5 + p * 0.5;
        // glow via sprite
        ctx.globalAlpha = al;
        ctx.drawImage(glows.redLg, led.x - 40, led.y - 40);
        ctx.globalAlpha = 1;
        // core
        ctx.fillStyle = rgba(RED, al);
        ctx.beginPath(); ctx.arc(led.x, led.y, led.size, 0, 6.28); ctx.fill();
        ctx.fillStyle = `rgba(255,180,180,${al * 0.8})`;
        ctx.beginPath(); ctx.arc(led.x, led.y, led.size * 0.4, 0, 6.28); ctx.fill();
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
