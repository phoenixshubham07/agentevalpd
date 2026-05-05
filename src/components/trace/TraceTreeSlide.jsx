import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldAlert, Workflow, Cpu, Activity } from 'lucide-react';

/* ─── Trace Data (from demo_trace_01 / sample_traces.jsonl) ── */
const TRACE = {
  id: 'manager-001', name: 'Manager', latency: 1200, type: 'manager',
  memory: '142 MB', thread: '0x1A4F',
  children: [
    {
      id: 'planner-001', name: 'Planner', latency: 420, type: 'task',
      memory: '38 MB', thread: '0x2B1A',
      children: [
        {
          id: 'websearch-001', name: 'WebSearch', latency: 180, type: 'secure',
          secured: true, memory: '84 MB', thread: '0x4C9D', children: []
        }
      ]
    },
    {
      id: 'worker-a-001', name: 'Worker-A', latency: 260, type: 'worker',
      memory: '22 MB', thread: '0x3D8F', children: []
    },
    {
      id: 'compliance-001', name: 'Compliance', latency: 320, type: 'secure',
      secured: true, memory: '112 MB', thread: '0x5E2A', children: []
    }
  ]
};

/* ─── Style tokens — same as TraceTree.jsx ── */
const NODE_STYLES = {
  manager: { border: '#d946ef', bg: 'rgba(217,70,239,0.08)', glow: 'rgba(217,70,239,0.25)' },
  task:    { border: '#38bdf8', bg: 'rgba(56,189,248,0.08)',  glow: 'rgba(56,189,248,0.2)'  },
  worker:  { border: '#38bdf8', bg: 'rgba(56,189,248,0.08)',  glow: 'rgba(56,189,248,0.2)'  },
  secure:  { border: 'transparent', bg: 'rgba(239,68,68,0.15)', glow: 'rgba(239,68,68,0.45)', text: '#ffffff' },
};

const latencyColor = (ms, secure) => {
  if (secure)  return { bg: 'rgba(239,68,68,0.4)',    text: '#fecaca' };
  if (ms > 800) return { bg: 'rgba(217,70,239,0.18)', text: '#f0abfc' };
  if (ms > 300) return { bg: 'rgba(217,119,6,0.18)',  text: '#fbbf24' };
  return               { bg: 'rgba(16,185,129,0.15)', text: '#34d399' };
};

/* ─── Animated connector line — exact same as TraceTree.jsx ── */
function Line({ x, y, width, height, isH, isSecure, delay, dir = 'forward' }) {
  const x2 = isH ? width : 0;
  const y2 = isH ? 0 : height;
  const id = `gl-${isSecure ? 'r' : 'b'}-${delay}`;
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ left: x, top: y, width: isH ? width : 4, height: isH ? 4 : height, overflow: 'visible' }}
    >
      <defs>
        <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="cb" />
          <feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Base dark line */}
      <motion.line x1={0} y1={0} x2={x2} y2={y2}
        stroke="rgba(79,70,229,0.4)" strokeWidth={2}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      />
      {/* Animated dashed flow line */}
      <motion.line x1={0} y1={0} x2={x2} y2={y2}
        stroke={isSecure ? '#f43f5e' : '#0ea5e9'} strokeWidth={2.5}
        strokeDasharray="6 10" strokeLinecap="round"
        filter={`url(#${id})`}
        initial={{ strokeDashoffset: 0, opacity: 0 }}
        animate={{ strokeDashoffset: dir === 'reverse' ? 64 : -64, opacity: 1 }}
        transition={{
          opacity: { delay: delay + 0.1, duration: 0.35 },
          strokeDashoffset: { repeat: Infinity, duration: 1.4, ease: 'linear' }
        }}
      />
    </svg>
  );
}

/* ─── Node Card — exact same design as TraceTree.jsx, scaled up ── */
function NodeCard({ node, style: pos, delay }) {
  const s  = NODE_STYLES[node.type] || NODE_STYLES.task;
  const lc = latencyColor(node.latency, node.secured);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      style={{ position: 'absolute', width: 175, ...pos }}
    >
      {/* PII dashed border animation */}
      {node.secured && (
        <svg style={{ position: 'absolute', inset: 0, width: 175, height: 76, pointerEvents: 'none', zIndex: 0 }}>
          <motion.rect x="1" y="1" width="173" height="74" rx="11"
            fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="8 8"
            animate={{ strokeDashoffset: [0, -32] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
            style={{ filter: 'drop-shadow(0 0 5px rgba(239,68,68,0.7))' }}
          />
        </svg>
      )}

      <div
        style={{
          position: 'relative', zIndex: 1,
          borderRadius: 11, height: 76,
          border: `1px solid ${s.border}`,
          background: s.bg,
          boxShadow: `0 6px 24px ${s.glow}`,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', paddingLeft: 16,
        }}
      >
        {/* PII lock badge */}
        {node.secured && (
          <div style={{
            position: 'absolute', top: -10, right: -10,
            width: 22, height: 22, borderRadius: '50%',
            border: '1px solid #ef4444', background: '#7f1d1d',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Lock size={10} color="#fca5a5" />
          </div>
        )}

        {/* Icon + name row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
          {node.secured
            ? <ShieldAlert size={15} color="#ef4444" />
            : node.type === 'manager'
              ? <Workflow size={15} color="#d946ef" />
              : <Cpu size={15} color="#38bdf8" />}
          <span style={{
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
            fontSize: 14, color: node.secured ? '#fecaca' : '#f8fafc', letterSpacing: '-0.01em'
          }}>
            {node.name}
          </span>
        </div>

        {/* Latency badge */}
        <div>
          <span style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '2px 8px', borderRadius: 4,
            fontSize: 11, fontFamily: '"JetBrains Mono", monospace', fontWeight: 700,
            letterSpacing: '0.04em',
            background: lc.bg, color: lc.text,
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            {node.latency} ms
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Stats strip ── */
const STATS = [
  { label: 'TOTAL LATENCY', value: '1200 ms', color: '#d946ef' },
  { label: 'STATUS',        value: 'COMPLETE', color: '#34d399' },
  { label: 'NODES',         value: '5',        color: '#38bdf8' },
  { label: 'PII AGENTS',    value: '2',        color: '#ef4444' },
  { label: 'PII LEAKED',    value: '0',        color: '#34d399' },
  { label: 'COST',          value: '$0.0042',  color: '#fbbf24' },
];

/* ─── Main export ── */
export default function TraceTreeSlide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#030612', overflow: 'hidden' }}>

      {/* ── Stats strip ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(${STATS.length}, 1fr)`,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: '#0a0f1c', flexShrink: 0
      }}>
        {STATS.map((s, i) => (
        <div key={s.label} style={{
          padding: '14px 16px', textAlign: 'center',
          borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
        }}>
          <div style={{ fontSize: 10, fontFamily: '"JetBrains Mono", monospace', color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 5 }}>
            {s.label}
          </div>
          <div style={{ fontSize: 17, fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: s.color }}>
            {s.value}
          </div>
        </div>
      ))}
      </div>

      {/* ── Trace header pill ── */}
      <div style={{ padding: '10px 18px', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: 20,
          border: '1px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.06)',
          fontSize: 9, fontFamily: '"JetBrains Mono", monospace', color: '#818cf8',
          letterSpacing: '0.15em', textTransform: 'uppercase'
        }}>
          <Activity size={9} />
          Trace ID: pii-trace-001
        </div>
      </div>

      {/* ── Tree canvas ── */}
      <div style={{
        flex: 1, overflowX: 'auto', overflowY: 'hidden',
        position: 'relative', padding: '20px 24px',
        /* Faint grid background */
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }}>
        {/* Canvas sized to fit all nodes */}
        <div style={{ position: 'relative', width: 660, height: 288, minWidth: 660 }}>

          {/* ── Nodes ─────────────────────────────────────── */}
          {/* Manager (root) — middle row */}
          <NodeCard node={TRACE} delay={0.1} style={{ left: 0, top: 106 }} />

          {/* Planner — top row */}
          <NodeCard node={TRACE.children[0]} delay={0.3} style={{ left: 230, top: 12 }} />

          {/* WebSearch (PII) — top row */}
          <NodeCard node={TRACE.children[0].children[0]} delay={0.5} style={{ left: 460, top: 12 }} />

          {/* Worker-A — middle row */}
          <NodeCard node={TRACE.children[1]} delay={0.3} style={{ left: 230, top: 106 }} />

          {/* Compliance (PII) — bottom row */}
          <NodeCard node={TRACE.children[2]} delay={0.3} style={{ left: 230, top: 200 }} />

          {/* ── Connecting Lines ───────────────────────────── */}
          {/* row centres: top=50  mid=144  bot=238 */}

          {/* Manager right edge → trunk (horizontal) */}
          <Line x={175} y={144} width={28} isH={true} delay={0.2} />

          {/* Vertical trunk spanning top→bot centre */}
          <Line x={203} y={50} height={188} isH={false} delay={0.22} />

          {/* Trunk → Planner (horizontal) */}
          <Line x={203} y={50} width={27} isH={true} delay={0.28} />

          {/* Trunk → Worker-A (horizontal) */}
          <Line x={203} y={144} width={27} isH={true} delay={0.28} />

          {/* Trunk → Compliance (horizontal, PII) */}
          <Line x={203} y={238} width={27} isH={true} isSecure={true} delay={0.28} dir="forward" />

          {/* Planner → WebSearch (horizontal, PII) */}
          <Line x={405} y={50} width={55} isH={true} isSecure={true} delay={0.45} dir="forward" />
        </div>
      </div>

      {/* ── Legend ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20,
        padding: '8px 18px', flexShrink: 0,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: '#0a0f1c'
      }}>
        {[
          { color: '#d946ef', label: 'Manager' },
          { color: '#38bdf8', label: 'Trace Execution' },
          { color: '#ef4444', label: 'PII Secured', icon: true },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {l.icon
              ? <Lock size={9} color={l.color} />
              : <span style={{ width: 7, height: 7, borderRadius: '50%', background: l.color, display: 'block', boxShadow: `0 0 6px ${l.color}` }} />}
            <span style={{ fontSize: 9, fontFamily: '"JetBrains Mono", monospace', color: '#64748b' }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
