import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// Pre-defined nodes simulating an abstract multi-agent network (router, planner, tools, evaluators)
const NODES = [
  { id: 'master', x: 50, y: 15, label: 'Master Router', color: '#ef4444' },
  
  { id: 'plan1', x: 25, y: 35, label: 'Task Planner A', color: '#3b82f6' },
  { id: 'plan2', x: 75, y: 35, label: 'Task Planner B', color: '#eab308' },
  
  { id: 'exec1', x: 15, y: 55, label: 'Code Dev Agent', color: '#ef4444' },
  { id: 'exec2', x: 35, y: 55, label: 'DB Query Agent', color: '#3b82f6' },
  { id: 'exec3', x: 65, y: 55, label: 'Search Tool', color: '#eab308' },
  { id: 'exec4', x: 85, y: 55, label: 'API Tool', color: '#3b82f6' },

  { id: 'eval1', x: 50, y: 80, label: 'Truth-Grounding Eval', color: '#ef4444' }
];

// Edges connecting the agents with colors
const EDGES = [
  { source: 'master', target: 'plan1', color: '#3b82f6' },
  { source: 'master', target: 'plan2', color: '#eab308' },
  
  { source: 'plan1', target: 'exec1', color: '#ef4444' },
  { source: 'plan1', target: 'exec2', color: '#3b82f6' },
  { source: 'plan1', target: 'exec3', color: '#eab308' },
  
  { source: 'plan2', target: 'exec3', color: '#eab308' },
  { source: 'plan2', target: 'exec4', color: '#3b82f6' },
  
  { source: 'exec1', target: 'eval1', color: '#ef4444' },
  { source: 'exec2', target: 'eval1', color: '#ef4444' },
  { source: 'exec3', target: 'eval1', color: '#ef4444' },
  { source: 'exec4', target: 'eval1', color: '#ef4444' }
];



export default function AnimatedTracesBackground() {
  const [activeTraces, setActiveTraces] = useState([]);
  const [illuminatedNodes, setIlluminatedNodes] = useState({});
  const { scrollY } = useScroll();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });
  
  // Keep traces blurred and dim at the bottom to preserve content legibility
  const opacity = useTransform(scrollY, [0, 600, 2000, 4000, 5500], [1, 0.25, 0.2, 0.2, 0.25]);
  const filter = useTransform(scrollY, [0, 600, 2000, 4000, 5500], ["blur(0px)", "blur(3px)", "blur(4px)", "blur(4px)", "blur(6px)"]);

  useEffect(() => {
    // Pause animations when off-screen
    if (!isInView) return;

    // Generate streaming activity pulses along random edges
    const interval = setInterval(() => {
      // Cap concurrent traces at 3 to prevent unbounded growth
      setActiveTraces(prev => {
        if (prev.length >= 3) return prev;

        const activeEdge = EDGES[Math.floor(Math.random() * EDGES.length)];
        const sourceNode = NODES.find(n => n.id === activeEdge.source);
        const targetNode = NODES.find(n => n.id === activeEdge.target);

        const newTrace = {
          id: Math.random().toString(36).substr(2, 9),
          source: sourceNode,
          target: targetNode,
          color: Math.random() > 0.5 ? '#eab308' : (Math.random() > 0.5 ? '#ef4444' : '#3b82f6')
        };

        // Cleanup trace after animation
        setTimeout(() => {
          setActiveTraces(p => p.filter(t => t.id !== newTrace.id));
        }, 3000);

        // Trigger node illumination when trace arrives
        setTimeout(() => {
          setIlluminatedNodes(p => ({ ...p, [targetNode.id]: true }));
          setTimeout(() => {
            setIlluminatedNodes(p => ({ ...p, [targetNode.id]: false }));
          }, 500);
        }, 2500);

        return [...prev, newTrace];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#020617]"
      style={{ opacity, filter }}
    >
      {/* Substituted CSS blur with zero-cost radial gradients */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1),_transparent_70%)] mix-blend-screen z-[-1]"></div>
      <div className="absolute top-3/4 right-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.08),_transparent_70%)] mix-blend-screen z-[-1]"></div>
      
      {/* Scaled Container for Edges and Nodes to preserve relative positioning */}
      <div className="absolute inset-0 w-full h-full scale-95 md:scale-100 origin-center">
        {/* SVG Network Canvas */}
        <svg className="absolute inset-0 w-full h-full opacity-60">
        <defs>
          {/* Removed expensive feGaussianBlur filter for performance */}
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
              // Removed filter="url(#glow)" for performance
              initial={{ cx: `${trace.source.x}%`, cy: `${trace.source.y}%`, opacity: 0 }}
              animate={{ 
                cx: `${trace.target.x}%`, 
                cy: `${trace.target.y}%`, 
                opacity: [0, 1, 1, 0] 
              }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
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
                className="mt-3 text-[10px] sm:text-xs font-tech uppercase tracking-widest px-3 py-1 rounded shadow-lg border border-white/10 transition-colors duration-200 whitespace-nowrap" 
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
