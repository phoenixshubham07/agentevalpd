import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Network, EyeOff, CheckCircle2, Database } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const features = [
  {
    title: "Dynamic Topology Mapping",
    description: (
      <>
        See the invisible. Our engines map complex, multi-agent interactions in real-time. Automatically <span className="text-white font-medium">detect execution bottlenecks</span>, unroll infinite logic loops, and <span className="text-white font-medium">visualize agent handoffs</span> before they cause catastrophic failures.
      </>
    ),
    icon: <Network className="w-6 h-6" />,
    accent: { color: '#3b82f6', gradient: 'from-blue-500/20 to-cyan-500/10', border: 'border-blue-500/50', glow: 'rgba(59,130,246,0.4)', text: 'text-blue-400', hoverText: 'text-blue-200', tag: '01' },
    delay: 0.1
  },
  {
    title: "Autonomous Data Redaction",
    description: (
      <>
        Zero-trust by default. Our in-stream redaction layer scans and <span className="text-white font-medium">shields sensitive enterprise entities</span> on the fly. Guarantee data compliance without sacrificing agent context.
      </>
    ),
    icon: <EyeOff className="w-6 h-6" />,
    accent: { color: '#8b5cf6', gradient: 'from-purple-500/20 to-indigo-500/10', border: 'border-purple-500/50', glow: 'rgba(139,92,246,0.4)', text: 'text-purple-400', hoverText: 'text-purple-200', tag: '02' },
    delay: 0.3
  },
  {
    title: "Asynchronous Truth-Grounding",
    description: (
      <>
        Don't trust; verify. We asynchronously judge agent outputs against dynamic organizational contexts to <span className="text-white font-medium">detect deviations</span>, tool-usage bypasses, and <span className="text-white font-medium">hallucinations</span> with deterministic precision.
      </>
    ),
    icon: <CheckCircle2 className="w-6 h-6" />,
    accent: { color: '#f43f5e', gradient: 'from-rose-500/20 to-pink-500/10', border: 'border-rose-500/50', glow: 'rgba(244,63,94,0.4)', text: 'text-rose-400', hoverText: 'text-rose-200', tag: '03' },
    delay: 0.2
  },
  {
    title: "High-IOPS Hybrid Telemetry",
    description: (
      <>
        Built for planetary scale. Process <span className="text-white font-medium">thousands of semantic traces simultaneously</span> with our dual-engine architecture, combining extremely low-latency stream processing with deep OLAP analytics.
      </>
    ),
    icon: <Database className="w-6 h-6" />,
    accent: { color: '#f59e0b', gradient: 'from-amber-500/20 to-orange-500/10', border: 'border-amber-500/50', glow: 'rgba(245,158,11,0.4)', text: 'text-amber-400', hoverText: 'text-amber-200', tag: '04' },
    delay: 0.4
  }
];

export default function FeatureHighlights() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"]
  });

  return (
    <section ref={sectionRef} id="solution" className="py-24 relative bg-[#020617]/50 backdrop-blur-3xl overflow-hidden">
      {/* Background glow for features */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 -z-10"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -translate-y-1/2 -z-10"></div>
      
      {/* Vertical Roadmap Lines */}
      <div className="absolute inset-x-0 top-0 h-full max-w-7xl mx-auto pointer-events-none hidden md:block z-0">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full absolute inset-0 overflow-visible">
          <defs>
            <filter id="glow-white-feature" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Center Core Line */}
          <motion.path 
            d="M 500 0 L 500.01 1000" 
            fill="none" stroke="#ffffff" strokeWidth="6" filter="url(#glow-white-feature)"
            vectorEffect="non-scaling-stroke"
            style={{ 
              pathLength: useTransform(scrollYProgress, [0, 0.8], [0, 1]),
              opacity: 0.6
            }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-0 relative z-30 pt-16">
        {/* Full Width News Ticker */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen overflow-hidden bg-[#450a0a] py-4 z-20 shadow-[0_0_20px_rgba(239,68,68,0.2)] flex">
          <div className="animate-ticker-rtl">
            {/* Generate duplicate items to ensure a seamless loop */}
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-10 whitespace-nowrap">
                <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)] animate-[ping_2s_infinite]"></span>
                <span className="text-red-400 font-bold font-tech text-lg tracking-widest uppercase">Active Governance</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center flex flex-col items-center">
          <div className="relative inline-block z-20 bg-[#020617]/80 backdrop-blur-md px-6 py-2 rounded-2xl shadow-[0_0_40px_rgba(2,6,23,0.9)]">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold font-heading tracking-tight text-white max-w-4xl leading-tight"
            >
              Engineered for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-200">Paranoid Enterprise.</span>
            </motion.h2>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full px-2 sm:px-6 lg:px-12 xl:px-24 mx-auto min-h-screen -mt-16">
        <ScrollStack 
          useWindowScroll={true} 
          stackPosition="20%"
          itemDistance={0}
          itemScale={0.03}
          blurAmount={2}
        >
          {features.map((feature, idx) => (
            <ScrollStackItem 
              key={idx} 
              itemClassName="!h-auto !p-0 !bg-transparent !border-0 !rounded-[2rem] !shadow-none overflow-visible"
            >
              <div 
                className="group relative w-full h-[320px] md:h-[280px] p-8 md:p-12 flex flex-col lg:flex-row gap-8 items-start lg:items-center rounded-[2rem] border border-slate-700/60 overflow-hidden transition-all duration-500 hover:border-opacity-0"
                style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(11,17,32,0.98))' }}
              >
                {/* Animated gradient border on hover */}
                <div className="absolute inset-0 rounded-[2rem] p-[1px] overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div 
                    className="absolute inset-[-200%] pointer-events-none [animation:spin_6s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]"
                    style={{ 
                      background: `conic-gradient(from 0deg, transparent 0%, ${feature.accent.color} 10%, transparent 30%, ${feature.accent.color}80 60%, transparent 80%)`
                    }}
                  ></div>
                </div>

                {/* Inner background layer (sits above the gradient border) */}
                <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-[#0B1120] pointer-events-none"></div>

                {/* Gradient glow on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${feature.accent.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]`}
                ></div>

                {/* Glowing radial background for icon area */}
                <div 
                  className="absolute left-12 top-1/2 -translate-y-1/2 w-48 h-48 opacity-0 group-hover:opacity-100 blur-[70px] transition-all duration-700 pointer-events-none rounded-full"
                  style={{ backgroundColor: `${feature.accent.color}15` }}
                ></div>

                {/* Feature number tag */}
                <div 
                  className="absolute top-6 right-6 text-xs font-tech tracking-widest opacity-30 group-hover:opacity-60 transition-opacity z-20"
                  style={{ color: feature.accent.color }}
                >
                  {feature.accent.tag}
                </div>

                {/* Cyberpunk Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-slate-700 transition-colors duration-500 rounded-tl-[2rem] z-20" style={{ borderColor: undefined }}></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-slate-700 transition-colors duration-500 rounded-tr-[2rem] z-20"></div>

                {/* Animated Connection Lines linking cards to the vertical roadmap */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                  {idx === 0 && (
                    <motion.path
                      d="M -100 160 L 50 160"
                      fill="none" stroke="#f59e0b" strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                    />
                  )}
                  {idx === 1 && (
                    <motion.path
                      d="M -50 160 L 50 160"
                      fill="none" stroke="#ef4444" strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                    />
                  )}
                  {idx === 2 && (
                    <motion.path
                      d="M -100 160 L 50 160"
                      fill="none" stroke="#3b82f6" strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                    />
                  )}
                  {idx === 3 && (
                    <motion.path
                      d="M -50 160 L 50 160"
                      fill="none" stroke="#ef4444" strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                    />
                  )}
                </svg>

                <div 
                  className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 shrink-0 rounded-2xl border flex items-center justify-center transition-all duration-500 lg:rotate-3 group-hover:rotate-0 relative z-20"
                  style={{ 
                    backgroundColor: `${feature.accent.color}10`,
                    borderColor: `${feature.accent.color}30`,
                  }}
                >
                  <style>{`
                    .card-${idx}:hover .icon-box-${idx} {
                      box-shadow: 0 0 40px ${feature.accent.glow};
                      border-color: ${feature.accent.color}80 !important;
                      background-color: ${feature.accent.color}20 !important;
                    }
                  `}</style>
                  <div className={`icon-box-${idx} w-full h-full rounded-2xl flex items-center justify-center transition-all duration-500`}>
                    {React.cloneElement(feature.icon, { className: `w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 ${feature.accent.text} group-hover:${feature.accent.hoverText} transition-colors` })}
                  </div>
                </div>
                
                <div className="flex flex-col flex-grow relative z-20 w-full overflow-hidden">
                  <h3 
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 font-heading tracking-wide transition-all duration-500 whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-base lg:text-lg leading-relaxed md:leading-loose flex-grow font-body max-w-4xl group-hover:text-slate-300 transition-colors duration-500 line-clamp-3 md:line-clamp-none block">
                    {feature.description}
                  </p>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
