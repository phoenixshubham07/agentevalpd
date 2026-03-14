import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Pre-defined nodes simulating an abstract multi-agent network (router, planner, tools, evaluators)
const NODES = [
  { id: 'master', x: 50, y: 15, label: 'Master Router', color: '#ef4444' },
  
  { id: 'plan1', x: 25, y: 40, label: 'Task Planner A', color: '#8b5cf6' },
  { id: 'plan2', x: 75, y: 40, label: 'Task Planner B', color: '#ec4899' },
  
  { id: 'exec1', x: 15, y: 65, label: 'Code Dev Agent', color: '#3b82f6' },
  { id: 'exec2', x: 35, y: 65, label: 'DB Query Agent', color: '#10b981' },
  { id: 'exec3', x: 65, y: 65, label: 'Search Tool', color: '#f59e0b' },
  { id: 'exec4', x: 85, y: 65, label: 'API Tool', color: '#06b6d4' },

  { id: 'eval1', x: 50, y: 82, label: 'Truth-Grounding Eval', color: '#f43f5e' }
];

// Edges connecting the agents with colors
const EDGES = [
  { source: 'master', target: 'plan1', color: '#8b5cf6' }, // purple
  { source: 'master', target: 'plan2', color: '#ec4899' }, // pink
  
  { source: 'plan1', target: 'exec1', color: '#3b82f6' },  // blue
  { source: 'plan1', target: 'exec2', color: '#10b981' },  // green
  { source: 'plan1', target: 'exec3', color: '#f59e0b' },  // amber
  
  { source: 'plan2', target: 'exec3', color: '#f59e0b' },  // amber
  { source: 'plan2', target: 'exec4', color: '#06b6d4' },  // cyan
  
  { source: 'exec1', target: 'eval1', color: '#f43f5e' },  // rose
  { source: 'exec2', target: 'eval1', color: '#f43f5e' },
  { source: 'exec3', target: 'eval1', color: '#f43f5e' },
  { source: 'exec4', target: 'eval1', color: '#f43f5e' }
];

// Mock F500 Trace payloads that run across the edges
const TRACE_PAYLOADS = [
  "f500-onboarding-001 (1250t)",
  "pii-trace-001 (450t)",
  "f500-fraud-004 (950t)",
  "f500-supply-003 (3400t)"
];

export default function AnimatedTracesBackground() {
  const [activeTraces, setActiveTraces] = useState([]);
  const [illuminatedNodes, setIlluminatedNodes] = useState({});
  const { scrollY } = useScroll();
  
  // U-shaped visibility: visible at top, fades/blurs in middle, visible again at bottom
  const opacity = useTransform(scrollY, [0, 600, 2000, 4000, 5500], [1, 0.25, 0.2, 0.25, 0.7]);
  const filter = useTransform(scrollY, [0, 600, 2000, 4000, 5500], ["blur(0px)", "blur(3px)", "blur(4px)", "blur(3px)", "blur(0px)"]);

  useEffect(() => {
    // Generate streaming activity pulses along random edges
    const interval = setInterval(() => {
      const activeEdge = EDGES[Math.floor(Math.random() * EDGES.length)];
      const sourceNode = NODES.find(n => n.id === activeEdge.source);
      const targetNode = NODES.find(n => n.id === activeEdge.target);
      const payloadLabel = TRACE_PAYLOADS[Math.floor(Math.random() * TRACE_PAYLOADS.length)];
      
      const newTrace = {
        id: Math.random().toString(36).substr(2, 9),
        source: sourceNode,
        target: targetNode,
        label: payloadLabel,
        color: Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6' // blue or purple
      };
      
      setActiveTraces(prev => [...prev, newTrace]);
      
      
      // Cleanup trace after animation
      setTimeout(() => {
        setActiveTraces(prev => prev.filter(t => t.id !== newTrace.id));
      }, 3000);

      // Trigger node illumination exactly when the trace arrives (2.5s trace animation duration)
      setTimeout(() => {
        setIlluminatedNodes(prev => ({
          ...prev,
          [targetNode.id]: true
        }));

        // Turn off illumination after a short pulse (0.5s)
        setTimeout(() => {
          setIlluminatedNodes(prev => ({
            ...prev,
            [targetNode.id]: false
          }));
        }, 500);

      }, 2500);
      
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#020617]"
      style={{ opacity, filter }}
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen opacity-30 z-[-1]"></div>
      <div className="absolute top-3/4 right-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen opacity-20 z-[-1]"></div>
      
      {/* Scaled Container for Edges and Nodes to preserve relative positioning */}
      <div className="absolute inset-0 w-full h-full scale-[1.15] origin-center">
        {/* SVG Network Canvas */}
        <svg className="absolute inset-0 w-full h-full opacity-60">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Static Lines (Edges) */}
        {EDGES.map((edge, i) => {
          const source = NODES.find(n => n.id === edge.source);
          const target = NODES.find(n => n.id === edge.target);
          return (
            <line 
              key={i}
              x1={`${source.x}%`} 
              y1={`${source.y}%`} 
              x2={`${target.x}%`} 
              y2={`${target.y}%`} 
              stroke={edge.color} 
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="opacity-60"
            />
          );
        })}

        {/* Dynamic Trace Pulses */}
        {activeTraces.map(trace => (
          <g key={trace.id}>
            {/* The glowing dot tracing the line */}
            <motion.circle
              r="4"
              fill={trace.color}
              filter="url(#glow)"
              initial={{ cx: `${trace.source.x}%`, cy: `${trace.source.y}%`, opacity: 0 }}
              animate={{ 
                cx: `${trace.target.x}%`, 
                cy: `${trace.target.y}%`, 
                opacity: [0, 1, 1, 0] 
              }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
            {/* Trace payload box */}
            <motion.foreignObject 
              width="200" height="40" 
              style={{ overflow: 'visible' }}
              initial={{ x: `${trace.source.x}%`, y: `${trace.source.y}%`, opacity: 0 }}
              animate={{ 
                x: `${trace.target.x}%`, 
                y: `${trace.target.y}%`, 
                opacity: [0, 1, 1, 0] 
              }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            >
              <div className="flex items-center h-full -translate-y-1/2">
                <div 
                  className="px-2 py-1 text-[9px] font-mono tracking-wider rounded border bg-slate-900/80 backdrop-blur-sm whitespace-nowrap shadow-lg ml-3"
                  style={{ 
                    color: trace.color,
                    borderColor: `${trace.color}50`,
                    boxShadow: `0 0 10px ${trace.color}20`
                  }}
                >
                  {trace.label}
                </div>
              </div>
            </motion.foreignObject>
          </g>
        ))}
      </svg>

      {/* Nodes (Agents) */}
      {NODES.map((node) => {
        const isIlluminated = illuminatedNodes[node.id];
        
        return (
          <div 
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center w-32"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <motion.div 
              className="flex flex-col items-center"
              animate={{
                scale: isIlluminated ? 1.3 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
            >
              {/* Glowing node center */}
              <motion.div 
                className="w-6 h-6 rounded-full bg-slate-900 border flex items-center justify-center transition-colors duration-200" 
                style={{ 
                  borderColor: isIlluminated ? node.color : `${node.color}50`, 
                }}
                animate={{
                  boxShadow: isIlluminated ? `0 0 40px 10px ${node.color}` : `0 0 15px ${node.color}50`,
                  backgroundColor: isIlluminated ? `${node.color}30` : '#0f172a'
                }}
              >
                <motion.div 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: node.color }}
                  animate={{
                    scale: isIlluminated ? 1.5 : 1,
                    boxShadow: isIlluminated ? `0 0 15px ${node.color}` : 'none'
                  }}
                />
              </motion.div>
              {/* Node Label */}
              <motion.span 
                className="mt-3 text-[10px] sm:text-xs font-tech uppercase tracking-widest px-3 py-1 rounded backdrop-blur-md border border-white/10 transition-colors duration-200 whitespace-nowrap" 
                style={{ color: isIlluminated ? '#fff' : (node.color || '#93c5fd') }}
                animate={{
                  backgroundColor: isIlluminated ? `${node.color}40` : 'rgba(15, 23, 42, 0.7)',
                  boxShadow: isIlluminated ? `0 0 20px ${node.color}40` : 'none',
                  borderColor: isIlluminated ? node.color : 'rgba(255,255,255,0.1)'
                }}
              >
                {node.label}
              </motion.span>
            </motion.div>
          </div>
        );
      })}
      </div>
    </motion.div>
  );
}
