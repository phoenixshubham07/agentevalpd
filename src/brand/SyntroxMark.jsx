import React, { useState, useEffect, useId, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HEX_CENTER, HEX_VIEWBOX, HEX_RADIUS, BRAND_COLORS, CHAOS_POSITIONS } from './constants';

const CX = 50, CY = 50;

// ─── Shape helpers ────────────────────────────────────────────────────────────

function genVerts(rEven, rOdd, scaleY = 1) {
  return Array.from({ length: 6 }, (_, i) => {
    const r   = i % 2 === 0 ? rEven : rOdd;
    const rad = ((30 + 60 * i) * Math.PI) / 180;
    return { x: +(CX + r * Math.cos(rad)).toFixed(3), y: +(CY + r * scaleY * Math.sin(rad)).toFixed(3) };
  });
}

function vertsToPath(verts) {
  return verts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${v.x},${v.y}`).join(' ') + ' Z';
}

function genPath(rEven, rOdd, scaleY = 1) {
  return vertsToPath(genVerts(rEven, rOdd, scaleY));
}

// 4 living shapes
const SHAPES = [
  { path: genPath(35, 35),       verts: genVerts(35, 35),       inner: genPath(17, 17)       },
  { path: genPath(46, 19),       verts: genVerts(46, 19),       inner: genPath(22, 10)       },
  { path: genPath(22, 44),       verts: genVerts(22, 44),       inner: genPath(11, 22)       },
  { path: genPath(38, 28, 0.78), verts: genVerts(38, 28, 0.78), inner: genPath(19, 14, 0.78) },
];

// ─── Neuron generation ────────────────────────────────────────────────────────

function buildNeurons(verts) {
  const neurons = [];
  verts.forEach((v, vi) => {
    const dx  = v.x - CX;
    const dy  = v.y - CY;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx  = dx / len;  // outward unit vector
    const ny  = dy / len;

    // 3 branches per vertex: centre, slight left, slight right
    [0, -22, 22].forEach((deg, bi) => {
      const rad   = (deg * Math.PI) / 180;
      const cos   = Math.cos(rad);
      const sin   = Math.sin(rad);
      const rnx   = nx * cos - ny * sin;
      const rny   = nx * sin + ny * cos;
      const L     = 13 + bi * 4;            // lengths: 13, 17, 17
      const tipX  = +(v.x + rnx * L).toFixed(2);
      const tipY  = +(v.y + rny * L).toFixed(2);

      // Curved control point (perpendicular nudge)
      const perp  = bi === 1 ? 5 : bi === 2 ? -5 : 0;
      const ctrlX = +(v.x + rnx * L * 0.5 - rny * perp).toFixed(2);
      const ctrlY = +(v.y + rny * L * 0.5 + rnx * perp).toFixed(2);

      neurons.push({
        id:          `${vi}-${bi}`,
        path:        `M ${v.x},${v.y} Q ${ctrlX},${ctrlY} ${tipX},${tipY}`,
        tip:         { x: tipX, y: tipY },
        baseOpacity: bi === 0 ? 0.28 : 0.16,
        pulseDelay:  (vi * 0.45 + bi * 0.2) % 4,   // stagger across neurons
        drawDelay:   vi * 0.08 + bi * 0.05,
      });
    });
  });
  return neurons;
}

// ─── Intro timing ─────────────────────────────────────────────────────────────

const T = { appear: 200, converge: 1100, drawOn: 1900, center: 2600, idle: 3100, morphCycle: 4500 };

// ─── Component ────────────────────────────────────────────────────────────────

export default function SyntroxMark({ size = 48, color = BRAND_COLORS.white, animate = true, onReady }) {
  const uid = useId().replace(/:/g, '');

  const [phase,      setPhase]      = useState(animate ? 0 : 5);
  const [shapeIdx,   setShapeIdx]   = useState(0);
  const [transitioning, setTrans]   = useState(false);

  // Intro sequence
  useEffect(() => {
    if (!animate) return;
    const ts = [
      setTimeout(() => setPhase(1), T.appear),
      setTimeout(() => setPhase(2), T.converge),
      setTimeout(() => setPhase(3), T.drawOn),
      setTimeout(() => setPhase(4), T.center),
      setTimeout(() => { setPhase(5); onReady?.(); }, T.idle),
    ];
    return () => ts.forEach(clearTimeout);
  }, [animate]);

  // Shape morphing cycle
  useEffect(() => {
    if (phase < 5) return;
    const iv = setInterval(() => {
      setTrans(true);
      setTimeout(() => setTrans(false), 2500);
      setShapeIdx(p => (p + 1) % SHAPES.length);
    }, T.morphCycle);
    return () => clearInterval(iv);
  }, [phase]);

  const isIdle    = phase >= 5;
  const shape     = SHAPES[shapeIdx];
  const neurons   = useMemo(() => buildNeurons(shape.verts), [shapeIdx]);
  const showVerts = animate && phase >= 1 && phase < 5;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <style>{`
        @keyframes ${uid}-scan {
          from { transform: rotate(0deg); } to { transform: rotate(360deg); }
        }
        @keyframes ${uid}-heartbeat {
          0%,100% { r: 3.5; opacity: 0.65; }
          10%     { r: 5.5; opacity: 1;    }
          20%     { r: 3.5; opacity: 0.65; }
          30%     { r: 4.8; opacity: 0.9;  }
          44%     { r: 3.5; opacity: 0.65; }
        }
        @keyframes ${uid}-flow {
          from { stroke-dashoffset: 0; } to { stroke-dashoffset: -24; }
        }
        @keyframes ${uid}-breathe {
          0%,100% { transform: scale(1);     }
          45%     { transform: scale(1.018); }
          80%     { transform: scale(0.984); }
        }
        @keyframes ${uid}-innerSpin {
          from { transform: rotate(0deg); } to { transform: rotate(-360deg); }
        }
        @keyframes ${uid}-neuronPulse {
          0%,100% { opacity: var(--n-lo); }
          50%     { opacity: var(--n-hi); }
        }
        @keyframes ${uid}-synapsePulse {
          0%,100% { r: 1;   opacity: 0.25; }
          50%     { r: 1.6; opacity: 0.7;  }
        }
        @keyframes ${uid}-signal {
          0%   { stroke-dashoffset: 100%; opacity: 0;   }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.8; }
          100% { stroke-dashoffset: 0%;   opacity: 0;   }
        }
      `}</style>

      {/* Breathing wrapper */}
      <div style={{
        width: '100%', height: '100%', transformOrigin: 'center',
        animation: isIdle ? `${uid}-breathe 7s ease-in-out infinite` : undefined,
      }}>
        <svg width={size} height={size} viewBox={HEX_VIEWBOX} fill="none" style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            {/* Bright scanner sweep gradient */}
            <linearGradient id={`${uid}-sg`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor={color} stopOpacity="0.0" />
              <stop offset="18%"  stopColor={color} stopOpacity="0.9" />
              <stop offset="55%"  stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
            <filter id={`${uid}-glow`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
          </defs>

          {/* ── Intro chaos → converge vertex dots ─────────────────── */}
          {showVerts && CHAOS_POSITIONS.map((chaos, i) => {
            const target = SHAPES[0].verts[i];
            const conv   = phase >= 2;
            return (
              <motion.circle key={`c-${i}`} r={2} fill={color}
                initial={{ cx: chaos.x, cy: chaos.y, opacity: 0 }}
                animate={{ cx: conv ? target.x : chaos.x, cy: conv ? target.y : chaos.y, opacity: conv ? 0.85 : 0.25 }}
                transition={conv
                  ? { type: 'spring', stiffness: 90, damping: 11, delay: i * 0.07 }
                  : { duration: 0.5 }}
              />
            );
          })}

          {/* ── Main morphing hex path ──────────────────────────────── */}
          {(phase >= 3 || !animate) && (
            <>
              <motion.path
                stroke={color} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={animate ? { d: SHAPES[0].path, pathLength: 0, opacity: 0 }
                                 : { d: SHAPES[0].path, pathLength: 1, opacity: 1 }}
                animate={{ d: isIdle ? shape.path : SHAPES[0].path, pathLength: 1, opacity: 1 }}
                transition={{
                  d:          { duration: 2.0, ease: [0.43, 0, 0.57, 1] },
                  pathLength: { duration: 0.85, ease: 'easeInOut' },
                  opacity:    { duration: 0.1 },
                }}
                style={isIdle ? { strokeDasharray: '6 3', animation: `${uid}-flow 3.5s linear infinite` } : undefined}
              />

              {/* Inner echo — morphs at offset phase */}
              <motion.path
                stroke={color} strokeWidth="0.5"
                strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={animate ? { d: SHAPES[0].inner, opacity: 0 } : { d: SHAPES[0].inner, opacity: 0.12 }}
                animate={{ d: isIdle ? shape.inner : SHAPES[0].inner, opacity: 0.12 }}
                transition={{ d: { duration: 2.5, ease: [0.43, 0, 0.57, 1] }, opacity: { duration: 0.6 } }}
                style={isIdle ? { transformOrigin: `${CX}px ${CY}px`, animation: `${uid}-innerSpin 55s linear infinite` } : undefined}
              />
            </>
          )}

          {/* ── NEURONS — axons from each vertex ───────────────────── */}
          {isIdle && neurons.map(n => (
            <g key={`n-${shapeIdx}-${n.id}`}>
              {/* Axon path */}
              <motion.path
                d={n.path}
                stroke={color} strokeWidth="0.6" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: n.baseOpacity }}
                transition={{ pathLength: { duration: 0.9, ease: 'easeOut', delay: n.drawDelay }, opacity: { duration: 0.5, delay: n.drawDelay } }}
                style={{
                  '--n-lo': n.baseOpacity * 0.35,
                  '--n-hi': n.baseOpacity,
                  animation: `${uid}-neuronPulse 3.5s ease-in-out infinite ${n.pulseDelay}s`,
                }}
              />
              {/* Synapse dot at tip */}
              <motion.circle
                cx={n.tip.x} cy={n.tip.y}
                fill={color}
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: 1, opacity: n.baseOpacity * 0.8 }}
                transition={{ delay: n.drawDelay + 0.7, duration: 0.4 }}
                style={{
                  '--n-lo': 0.15,
                  '--n-hi': 0.7,
                  animation: `${uid}-synapsePulse 3.5s ease-in-out infinite ${n.pulseDelay}s`,
                }}
              />
            </g>
          ))}

          {/* ── Scanner sweep ───────────────────────────────────────── */}
          {(phase >= 4 || !animate) && (
            <g style={{ transformOrigin: `${CX}px ${CY}px`, animation: `${uid}-scan 9s linear infinite` }}>
              <line
                x1={CX} y1={CY}
                x2={CX + HEX_RADIUS + 3} y2={CY}
                stroke={`url(#${uid}-sg)`} strokeWidth="2" strokeLinecap="round"
                filter={`url(#${uid}-glow)`}
              />
            </g>
          )}

          {/* ── Center heartbeat ────────────────────────────────────── */}
          {(phase >= 4 || !animate) && (
            <motion.circle cx={CX} cy={CY} fill={color}
              filter={`url(#${uid}-glow)`}
              initial={animate ? { r: 0, opacity: 0 } : { r: 3.5, opacity: 0.8 }}
              animate={{ r: 3.5, opacity: 0.8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              style={isIdle ? { animation: `${uid}-heartbeat 3.8s ease-in-out infinite` } : undefined}
            />
          )}

          {/* ── Idle vertex dots ─────────────────────────────────────── */}
          {isIdle && shape.verts.map((v, i) => (
            <motion.circle key={`mv-${shapeIdx}-${i}`}
              cx={v.x} cy={v.y} r={1.4} fill={color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 10, delay: i * 0.05 }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
