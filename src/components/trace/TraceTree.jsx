import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Lock, Activity, ShieldAlert, Workflow, Cpu, Info, Terminal, Database, Clock } from 'lucide-react';

/* ─── Sample Trace Data ─────────────────────────────── */
const sampleTrace = {
  id: 'manager-001',
  name: 'Manager',
  latency: 1200,
  type: 'manager',
  memory: '142 MB',
  thread: '0x1A4F',
  children: [
    {
      id: 'planner-001',
      name: 'Planner',
      latency: 420,
      type: 'task',
      memory: '38 MB',
      thread: '0x2B1A',
      children: [
        {
          id: 'websearch-001',
          name: 'WebSearch',
          latency: 180,
          type: 'secure',
          secured: true, // Has PII
          memory: '84 MB',
          thread: '0x4C9D',
          children: []
        }
      ]
    },
    {
      id: 'worker-a-001',
      name: 'Worker-A',
      latency: 260,
      type: 'worker',
      memory: '22 MB',
      thread: '0x3D8F',
      children: []
    },
    {
      id: 'compliance-001',
      name: 'Compliance',
      latency: 320,
      type: 'secure',
      secured: true, // Has PII
      memory: '112 MB',
      thread: '0x5E2A',
      children: []
    }
  ]
};

/* ─── Node Style Tokens ────────────────────────────── */
const NODE_STYLES = {
  manager: { border: '#d946ef', bg: 'rgba(217,70,239,0.08)', glow: 'rgba(217,70,239,0.2)' },
  task: { border: '#38bdf8', bg: 'rgba(56,189,248,0.08)', glow: 'rgba(56,189,248,0.2)' },
  worker: { border: '#38bdf8', bg: 'rgba(56,189,248,0.08)', glow: 'rgba(56,189,248,0.2)' },
  secure: { border: 'transparent', bg: 'rgba(239,68,68,0.15)', glow: 'rgba(239,68,68,0.4)', text: '#ffffff' }
};

/* ─── Latency Badge Color ──────────────────────────── */
const getLatencyColor = (ms, isSecure) => {
  if (isSecure) return { bg: 'rgba(239,68,68,0.4)', text: '#ffffff' };
  if (ms > 800) return { bg: 'rgba(217,70,239,0.15)', text: '#f0abfc' }; 
  if (ms > 300) return { bg: 'rgba(217,119,6,0.15)', text: '#fbbf24' };
  return { bg: 'rgba(16,185,129,0.15)', text: '#34d399' };
};

/* ─── Node Icon Helper ────────────────────────────── */
const getNodeIcon = (node) => {
  if (node.secured) return <ShieldAlert className="w-5 h-5 text-red-400" />;
  if (node.type === 'manager') return <Workflow className="w-5 h-5 text-fuchsia-400" />;
  return <Cpu className="w-5 h-5 text-sky-400" />;
};

/* ─── Node Details Helper ──────────────────────────── */
const getNodeDetails = (node) => {
  if (node.secured) return "Warning: Critical PII or highly sensitive contextual data payload detected traversing this execution segment.";
  if (node.type === 'manager') return "Main root orchestrator node. Manages overall thread life-cycle, context provisioning, and handles terminal routing.";
  if (node.type === 'task') return "Execution planner mapping out sub-routines and orchestrating parallel Worker delegation strategies in sub-threads.";
  return "Standard detached worker execution thread. Currently evaluating isolated, stateless logic functions.";
};

/* ─── Animated SVG Line ────────────────────────────── */
const AnimatedLine = ({ width, height, isHorizontal, isSecure, delay, className, style, flowDirection = "forward" }) => {
  return (
    <svg 
      className={`absolute pointer-events-none ${className}`} 
      style={{ width: width || 4, height: height || 4, ...style }} 
      overflow="visible"
    >
      <defs>
        <filter id={`glow-${isSecure ? 'danger' : 'safe'}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <motion.line
        x1={0} y1={0}
        x2={isHorizontal ? width : 0} 
        y2={isHorizontal ? 0 : height}
        stroke="rgba(79,70,229,0.5)" 
        strokeWidth={3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
      />
      <motion.line
        x1={0} y1={0}
        x2={isHorizontal ? width : 0} 
        y2={isHorizontal ? 0 : height}
        stroke={isSecure ? "#f43f5e" : "#0ea5e9"}
        strokeWidth={3.5}
        strokeDasharray="8 12"
        strokeLinecap="round"
        filter={`url(#glow-${isSecure ? 'danger' : 'safe'})`}
        initial={{ strokeDashoffset: 0, opacity: 0 }}
        animate={{ 
          strokeDashoffset: flowDirection === "reverse" ? 80 : -80, 
          opacity: 1 
        }}
        transition={{
          opacity: { delay: delay + 0.1, duration: 0.4 },
          strokeDashoffset: { repeat: Infinity, duration: 1.5, ease: "linear" }
        }}
      />
    </svg>
  );
};

/* ─── Individual Node Card ────────────────────────── */
const NodeCard = ({ node, delay, onHover, isHovered }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const style = NODE_STYLES[node.type] || NODE_STYLES.task;
  const latency = getLatencyColor(node.latency, node.secured);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => onHover(node)}
      initial={{ opacity: 0, x: -30 }} 
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`relative z-10 w-[220px] transition-transform duration-300 cursor-crosshair ${isHovered ? 'scale-105 z-50' : 'scale-100 hover:scale-105'}`}
    >
      {node.secured && (
        <svg className="absolute inset-0 w-[220px] h-[84px] pointer-events-none z-0">
          <motion.rect 
            x="1" y="1" 
            width="218" height="82" 
            rx="14" 
            fill="none" 
            stroke="#ef4444" 
            strokeWidth="2"
            strokeDasharray="10 10"
            animate={{ strokeDashoffset: [0, -40] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.8))' }}
          />
        </svg>
      )}

      <div
        className="relative rounded-[14px] border flex flex-col justify-center items-start pl-6 h-[84px] transition-all duration-300 backdrop-blur-[20px] z-10"
        style={{
          borderColor: isHovered ? '#ffffff' : style.border,
          backgroundColor: style.bg,
          boxShadow: isHovered ? `0 0 40px ${style.glow}` : `0 8px 30px ${style.glow}`
        }}
      >
        {node.secured && (
          <div 
            className={`absolute -top-3 -right-3 w-7 h-7 rounded-full border flex items-center justify-center shadow-lg transition-transform ${isHovered ? 'rotate-12 scale-110' : ''}`}
            style={{ borderColor: '#ef4444', backgroundColor: '#7f1d1d' }}
          >
            <Lock className="w-3.5 h-3.5 text-red-300" />
          </div>
        )}

        <div 
          className="font-heading font-bold text-[17px] tracking-wide leading-tight mb-1"
          style={{ color: node.secured ? style.text : '#f8fafc' }}
        >
          {node.name}
        </div>

        <div>
           <span 
            className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-tech font-bold tracking-widest border border-white/5"
            style={{ backgroundColor: latency.bg, color: latency.text }}
          >
            {node.latency} ms
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Stats Card ────────────────────────────── */
const StatCard = ({ title, value, valueColor, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-[14px] border border-white/5 bg-[#0a0f1c]/80 p-5 min-w-[150px] shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl"
    >
      <div className="text-[10px] font-tech tracking-widest text-slate-500 font-medium uppercase mb-1">{title}</div>
      <div className="text-2xl font-heading font-bold flex gap-2 items-baseline" style={{ color: valueColor }}>
        {value}
      </div>
    </motion.div>
  );
};


/* ─── Main Trace Tree Component ────────────────────── */
export default function TraceTree({ traceData = sampleTrace }) {
  const containerRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030612] relative overflow-hidden font-body text-slate-300">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Pill */}
      <div className="absolute top-8 left-8 z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-xs font-tech tracking-widest uppercase text-indigo-400 backdrop-blur-sm">
          <Activity className="w-3.5 h-3.5" />
          Trace Visualization
        </div>
      </div>

      <div className="pt-32 px-10 max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-heading font-bold text-white mb-4 tracking-tight">Trace Tree MRI</h1>
          <p className="text-lg text-slate-400">Hierarchical view of Manager → Workers with latency and PII indicators.</p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-tech text-slate-300">
            Trace ID: <span className="text-cyan-400 font-semibold">pii-trace-001</span>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="flex flex-wrap gap-5 mb-16">
          <StatCard title="Total Latency" value={`${traceData.latency} ms`} valueColor="#d946ef" delay={0.1} />
          <StatCard title="Nodes" value="5" valueColor="#38bdf8" delay={0.15} />
          <StatCard title="PII Secured" value="2" valueColor="#ef4444" delay={0.2} />
          <StatCard title="Status" value="COMPLETE" valueColor="#34d399" delay={0.25} />
        </div>

        {/* --- DOCKED SPLIT VIEW ARCHITECTURE --- */}
        <div 
          className="flex flex-col lg:flex-row bg-slate-900/40 rounded-3xl border border-white/5 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl min-h-[580px]"
          onMouseLeave={() => setHoveredNode(null)} // Reset when mouse leaves the entire widget wrapper
        >
          {/* LEFT: Trace Grid (Interactive Canvas) */}
          <div className="flex-[2] relative p-12 lg:border-r border-white/5 overflow-x-auto overflow-y-hidden">
            
            {/* Faint Graph Grid */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            />

            <div className="relative z-10 flex mt-8 ml-8">
              <div className="relative h-[360px] w-full min-w-[860px]">
                
                {/* Row 2: Manager (Root) */}
                <div className="absolute left-[0px] top-[138px]">
                  <NodeCard node={traceData} delay={0.2} onHover={setHoveredNode} isHovered={hoveredNode?.id === traceData.id} />
                </div>

                {/* Row 1: Planner */}
                <div className="absolute left-[300px] top-[14px]">
                  <NodeCard node={traceData.children[0]} delay={0.4} onHover={setHoveredNode} isHovered={hoveredNode?.id === traceData.children[0].id} />
                </div>

                {/* Row 1: WebSearch (Has PII) */}
                <div className="absolute left-[600px] top-[14px]">
                  <NodeCard node={traceData.children[0].children[0]} delay={0.6} onHover={setHoveredNode} isHovered={hoveredNode?.id === traceData.children[0].children[0].id} />
                </div>

                {/* Row 2: Worker-A */}
                <div className="absolute left-[300px] top-[138px]">
                  <NodeCard node={traceData.children[1]} delay={0.4} onHover={setHoveredNode} isHovered={hoveredNode?.id === traceData.children[1].id} />
                </div>

                {/* Row 3: Compliance (Has PII) */}
                <div className="absolute left-[300px] top-[262px]">
                  <NodeCard node={traceData.children[2]} delay={0.4} onHover={setHoveredNode} isHovered={hoveredNode?.id === traceData.children[2].id} />
                </div>

                {/* ------ CONNECTING LINES ------ */}
                <AnimatedLine className="left-[220px] top-[180px]" width={40} isHorizontal={true} delay={0.3} />
                <AnimatedLine className="left-[260px] top-[56px]" height={248} isHorizontal={false} delay={0.35} flowDirection="forward" />
                <AnimatedLine className="left-[260px] top-[56px]" width={40} isHorizontal={true} delay={0.4} />
                <AnimatedLine className="left-[260px] top-[180px]" width={40} isHorizontal={true} delay={0.4} />
                <AnimatedLine className="left-[260px] top-[304px]" width={40} isHorizontal={true} delay={0.4} isSecure={true} flowDirection="forward" />
                <AnimatedLine className="left-[520px] top-[56px]" width={80} isHorizontal={true} delay={0.5} isSecure={true} flowDirection="forward" />

              </div>
            </div>

            {/* Legend */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-16 border-t border-white/5 pt-8 flex flex-wrap gap-8 items-center text-[11px] font-tech text-slate-400 relative z-10"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.6)]"></span> Manager
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.6)]"></span> Trace Execution
              </div>
              <div className="flex items-center gap-2 text-red-400">
                <Lock className="w-4 h-4 text-red-500" /> PII Secured (Red Alert)
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="opacity-60 hidden xl:inline">Animating Stream:</span>
                <svg width="32" height="8" style={{ overflow: "visible" }} className="ml-2">
                  <line x1="0" y1="4" x2="32" y2="4" stroke="#ef4444" strokeWidth="3" strokeDasharray="8 8" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 4px #ef4444)" }} />
                </svg> Active Danger
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Dedicated Inspector Terminal Side-Panel */}
          <div className="flex-1 min-w-[360px] bg-gradient-to-b from-[#030712] to-[#0a0f1c] relative flex flex-col items-center">
             
             {/* Tech Matrix Background Overlay */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}/>

             <div className="w-full border-b border-white/5 p-6 flex items-center justify-between z-10 relative bg-white/[0.01]">
               <div className="text-[10px] font-tech text-indigo-400/80 uppercase tracking-[0.2em] flex items-center gap-2">
                 <Terminal className="w-3.5 h-3.5" />
                 Active Node Inspector
               </div>
               {hoveredNode && <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" />}
             </div>

             <div className="p-8 w-full flex-1 relative z-10 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {hoveredNode ? (
                    <motion.div 
                      key={hoveredNode.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10, transition: { duration: 0.1 } }}
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                           {getNodeIcon(hoveredNode)}
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-white text-2xl leading-tight">{hoveredNode.name}</h3>
                          <p className="text-[11px] font-tech tracking-widest text-slate-500 uppercase mt-1">{hoveredNode.id}</p>
                        </div>
                      </div>
                      
                      {/* Technical High-Density Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-900/50 border border-white/5 rounded-lg p-3">
                           <div className="flex items-center gap-1.5 text-[10px] font-tech text-slate-500 uppercase tracking-widest mb-1"><Clock className="w-3 h-3"/ > Latency</div>
                           <div className="font-tech text-white text-lg">{hoveredNode.latency} <span className="text-slate-500 text-sm">ms</span></div>
                        </div>
                        <div className="bg-slate-900/50 border border-white/5 rounded-lg p-3">
                           <div className="flex items-center gap-1.5 text-[10px] font-tech text-slate-500 uppercase tracking-widest mb-1"><Database className="w-3 h-3"/ > Memory Alloc</div>
                           <div className="font-tech text-white text-lg">{hoveredNode.memory}</div>
                        </div>
                        <div className="bg-slate-900/50 border border-white/5 rounded-lg p-3 col-span-2">
                           <div className="flex items-center gap-1.5 text-[10px] font-tech text-slate-500 uppercase tracking-widest mb-1"><Cpu className="w-3 h-3"/ > Thread Origin</div>
                           <div className="font-tech text-sky-400 text-sm tracking-wider">{hoveredNode.thread}</div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                           <div className="text-[10px] text-slate-500 font-tech uppercase tracking-[0.15em] mb-2">Execution Context</div>
                           <div className="text-[14px] text-slate-300 font-body leading-relaxed border-l-2 border-indigo-500/30 pl-4">{getNodeDetails(hoveredNode)}</div>
                        </div>

                        {hoveredNode.secured && (
                           <motion.div 
                             initial={{ opacity: 0, scale: 0.95 }}
                             animate={{ opacity: 1, scale: 1 }}
                             className="rounded-xl overflow-hidden relative"
                           >
                             {/* Red alert gradient bg */}
                             <div className="absolute inset-0 bg-red-500/10" />
                             <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                             
                             <div className="relative p-5 border border-red-500/20 shadow-[inset_0_0_20px_rgba(239,68,68,0.15)] flex gap-4">
                               <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                               <div>
                                  <span className="font-bold text-[13px] text-red-400 block mb-1 uppercase tracking-widest font-tech">Security Protocol Triggered</span>
                                  <span className="text-sm text-red-200/80 leading-relaxed block font-body">An automated kill-switch intercepted and sanitized a PII payload on the boundary of this node. No data leakage occurred.</span>
                               </div>
                             </div>
                           </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-30 p-10"
                    >
                       <Activity className="w-12 h-12 text-slate-500 mb-6" />
                       <h4 className="text-lg font-heading font-medium text-white mb-2">Awaiting Telemetry</h4>
                       <p className="text-[13px] font-body text-slate-400 leading-relaxed">
                          Hover your cursor over any active trace node in the diagram to stream deep execution logistics into this terminal.
                       </p>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
