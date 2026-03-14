import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lock, ServerCrash, Zap } from 'lucide-react';

const securityFeatures = [
  {
    icon: <Lock className="w-6 h-6 text-blue-500" />,
    title: "VPC-Native Deployments",
    description: "Run AgentEval entirely within your firewall. Your proprietary data never leaves the premise.",
    color: "from-blue-500/20",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    borderColor: "group-hover:border-blue-500/50",
    scannerBg: "bg-gradient-to-b from-transparent via-blue-500/80 to-transparent",
    iconGlow: "group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    lineColor: "#3b82f6"
  },
  {
    icon: <ServerCrash className="w-6 h-6 text-purple-500" />,
    title: "Emergency Controls",
    description: "Instantly freeze a rogue agent or an entire fleet across the globe with a single action.",
    color: "from-purple-500/20",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    borderColor: "group-hover:border-purple-500/50",
    scannerBg: "bg-gradient-to-b from-transparent via-purple-500/80 to-transparent",
    iconGlow: "group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]",
    lineColor: "#a855f7"
  },
  {
    icon: <Zap className="w-6 h-6 text-cyan-500" />,
    title: "Zero-Latency Operations",
    description: "Intercept PII and \"Poison Prompts\" with sub-20ms latency scaling horizontally.",
    color: "from-cyan-500/20",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
    borderColor: "group-hover:border-cyan-500/50",
    scannerBg: "bg-gradient-to-b from-transparent via-cyan-500/80 to-transparent",
    iconGlow: "group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]",
    lineColor: "#06b6d4"
  }
];

export default function SocialProof() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"]
  });

  return (
    <section ref={sectionRef} className="py-32 relative bg-transparent border-y border-white/5 overflow-hidden">
      {/* Background Cyber-grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-20 opacity-20"></div>

      {/* Vertical Roadmap Lines */}
      <div className="absolute inset-x-0 top-0 h-full max-w-7xl mx-auto pointer-events-none hidden md:block z-0">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full absolute inset-0 overflow-visible">
          <defs>
            <filter id="glow-amber-social" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-red-social" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-blue-social" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Left Line */}
          <motion.path 
            d="M 166 0 L 166.01 1000" 
            fill="none" stroke="#f59e0b" strokeWidth="3" filter="url(#glow-amber-social)"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: useTransform(scrollYProgress, [0, 0.8], [0, 1]) }}
          />
          {/* Center Line */}
          <motion.path 
            d="M 500 0 L 500.01 1000" 
            fill="none" stroke="#ef4444" strokeWidth="3" filter="url(#glow-red-social)"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: useTransform(scrollYProgress, [0, 0.8], [0, 1]) }}
          />
          {/* Right Line */}
          <motion.path 
            d="M 833 0 L 833.01 1000" 
            fill="none" stroke="#3b82f6" strokeWidth="3" filter="url(#glow-blue-social)"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: useTransform(scrollYProgress, [0, 0.8], [0, 1]) }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 border border-slate-700 text-slate-300 text-xs font-tech tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            <span>Enterprise Security</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold font-heading mb-6 tracking-tight text-white"
          >
            Engineered for the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">Enterprise Perimeter.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-400 font-light"
          >
            Built from day one for the most security-conscious organizations. Your data stays yours—always.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 * index, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative h-full group p-8 rounded-2xl bg-[#0a0f1e]/80 backdrop-blur-md border border-white/[0.05] transition-all duration-300 overflow-hidden ${feature.glowColor} ${feature.borderColor}`}
              >
                {/* Top Gradient Glow */}
                <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${feature.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                
                {/* Cyberpunk Scanner Line */}
                <motion.div 
                  className={`absolute left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 ${feature.scannerBg} z-20 blur-[1px]`}
                  initial={{ top: '-10%' }}
                  whileHover={{ top: '110%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative z-10">
                  <motion.div 
                    className={`p-3 bg-white/5 rounded-xl self-start inline-block mb-6 border border-white/10 ${feature.iconGlow}`}
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      animate={{ y: [0, -4, 0], scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                    >
                      {feature.icon}
                    </motion.div>
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 font-heading tracking-wide flex items-center gap-2">
                    <span className="opacity-0 group-hover:opacity-100 group-hover:text-cyan-400 transition-opacity duration-300 select-none">&gt;</span>
                    {feature.title}
                    <span className="animate-pulse opacity-0 group-hover:opacity-100 text-cyan-400 select-none">_</span>
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Cyberpunk corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/10 group-hover:border-white/50 transition-colors duration-300 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/10 group-hover:border-white/50 transition-colors duration-300 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/10 group-hover:border-white/50 transition-colors duration-300 rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-white/50 transition-colors duration-300 rounded-br-xl" />

                {/* Connecting dot to roadmap line */}
                <motion.div 
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full z-30"
                  style={{ backgroundColor: feature.lineColor }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
