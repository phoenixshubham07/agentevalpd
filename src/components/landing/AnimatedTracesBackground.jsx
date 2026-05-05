import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

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

  const opacity = useTransform(scrollY, [0, 600, 2000, 4000, 5500], [1, 0.25, 0.2, 0.2, 0.25]);
  const filter = useTransform(scrollY, [0, 600, 2000, 4000, 5500], ["blur(0px)", "blur(3px)", "blur(4px)", "blur(4px)", "blur(6px)"]);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
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

        setTimeout(() => {
          setActiveTraces(p => p.filter(t => t.id !== newTrace.id));
        }, 3000);

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
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1),_transparent_70%)] mix-blend-screen z-[-1]"></div>
      <div className="absolute top-3/4 right-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.08),_transparent_70%)] mix-blend-screen z-[-1]"></div>

      <div className="absolute inset-0 w-full h-full scale-95 md:scale-100 origin-center">
        <svg className="absolute inset-0 w-full h-full opacity-60">
          {/* Static Lines */}
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

          {/* Trace Pulses */}
          {activeTraces.map(trace => (
            <g key={trace.id}>
              <motion.circle
                r="4"
                fill={trace.color}
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

        {/* Nodes — all animations use only transform/opacity/filter (GPU composited) */}
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
                animate={{ scale: isIlluminated ? 1.3 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
              >
                {/* Node center — filter:drop-shadow is GPU-composited, unlike box-shadow */}
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center relative overflow-hidden"
                  style={{
                    border: `1px solid ${isIlluminated ? node.color : `${node.color}50`}`,
                    filter: isIlluminated
                      ? `drop-shadow(0 0 8px ${node.color}) drop-shadow(0 0 16px ${node.color}80)`
                      : `drop-shadow(0 0 4px ${node.color}40)`,
                    transition: 'filter 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  {/* Background via opacity — composited */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: node.color,
                      opacity: isIlluminated ? 0.3 : 0,
                      transition: 'opacity 0.2s ease',
                    }}
                  />
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full relative z-10"
                    style={{ backgroundColor: node.color }}
                    animate={{ scale: isIlluminated ? 1.5 : 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  />
                </div>

                {/* Label — CSS transitions only, no Framer Motion on paint props */}
                <div
                  className="mt-3 text-[10px] sm:text-xs font-tech uppercase tracking-widest px-3 py-1 rounded shadow-lg whitespace-nowrap relative overflow-hidden"
                  style={{
                    color: isIlluminated ? '#fff' : (node.color || '#93c5fd'),
                    border: `1px solid ${isIlluminated ? node.color : 'rgba(255,255,255,0.1)'}`,
                    filter: isIlluminated ? `drop-shadow(0 0 8px ${node.color}80)` : 'none',
                    transition: 'color 0.2s ease, border-color 0.2s ease, filter 0.2s ease',
                  }}
                >
                  <span
                    className="absolute inset-0 rounded"
                    style={{
                      backgroundColor: `${node.color}40`,
                      opacity: isIlluminated ? 1 : 0,
                      transition: 'opacity 0.2s ease',
                    }}
                  />
                  <span className="relative z-10">{node.label}</span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
