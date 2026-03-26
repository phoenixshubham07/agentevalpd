import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lock, ServerCrash, Zap } from 'lucide-react';

const securityFeatures = [
  {
    icon: <Lock className="w-6 h-6 text-blue-500" />,
    title: "VPC-Native Deployments",
    description: (
      <>
        Run Syntrox.ai <span className="text-white font-medium">entirely within your firewall</span>. Your proprietary data never leaves the premise.
      </>
    ),
    color: "from-blue-500/20",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    borderColor: "group-hover:border-blue-500/50",
    scannerBg: "bg-gradient-to-b from-transparent via-blue-500/80 to-transparent",
    iconGlow: "group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    lineColor: "#3b82f6"
  },
  {
    icon: <ServerCrash className="w-6 h-6 text-cyan-500" />,
    title: "Emergency Controls",
    description: (
      <>
        Instantly <span className="text-white font-medium">freeze a rogue agent</span> or an entire fleet across the globe with a single action.
      </>
    ),
    color: "from-cyan-500/20",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
    borderColor: "group-hover:border-cyan-500/50",
    scannerBg: "bg-gradient-to-b from-transparent via-cyan-500/80 to-transparent",
    iconGlow: "group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]",
    lineColor: "#06b6d4"
  },
  {
    icon: <Zap className="w-6 h-6 text-cyan-500" />,
    title: "Zero-Latency Operations",
    description: (
      <>
        Intercept PII and "Poison Prompts" with <span className="text-white font-medium">sub-20ms latency</span> scaling horizontally.
      </>
    ),
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
    <section ref={sectionRef} className="py-32 relative bg-transparent overflow-visible">
      {/* Background Cyber-grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-20 opacity-20"></div>

      {/* Vertical Roadmap Lines */}
      <div className="absolute inset-x-0 top-0 h-full max-w-7xl mx-auto pointer-events-none hidden md:block z-0">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full absolute inset-0 overflow-visible">
          <defs></defs>
          {/* ===== ENTERPRISE PERIMETER: Security Sensor Bracket ===== */}

          {/* Left bracket — outer glow layer */}
          <motion.path 
            d="M 20 0 L 20 150 C 20 200, 70 200, 70 250 L 70 750 C 70 800, 20 800, 20 850 C 20 950, 500 950, 500 1050" 
            fill="none" stroke="#06b6d4" strokeWidth="6" opacity="0.15"
          />
          {/* Left bracket — dashed core */}
          <motion.path 
            d="M 20 0 L 20 150 C 20 200, 70 200, 70 250 L 70 750 C 70 800, 20 800, 20 850 C 20 950, 500 950, 500 1050" 
            fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="10 10"             initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -100 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          {/* Left bracket corner sensor nodes */}
          <motion.circle cx="20" cy="150" r="4" fill="#020617" stroke="#06b6d4" strokeWidth="2"             animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}/>
          <motion.circle cx="20" cy="150" r="2" fill="#67e8f9"
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}/>
          <motion.circle cx="70" cy="500" r="4" fill="#020617" stroke="#06b6d4" strokeWidth="2"             animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}/>
          <motion.circle cx="70" cy="500" r="2" fill="#67e8f9"
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}/>
          <motion.circle cx="20" cy="850" r="4" fill="#020617" stroke="#06b6d4" strokeWidth="2"             animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}/>
          <motion.circle cx="20" cy="850" r="2" fill="#67e8f9"
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}/>

          {/* Right bracket — outer glow layer */}
          <motion.path 
            d="M 980 0 L 980 150 C 980 200, 930 200, 930 250 L 930 750 C 930 800, 980 800, 980 850 C 980 950, 500 950, 500 1050" 
            fill="none" stroke="#3b82f6" strokeWidth="6" opacity="0.15"
          />
          {/* Right bracket — dashed core */}
          <motion.path 
            d="M 980 0 L 980 150 C 980 200, 930 200, 930 250 L 930 750 C 930 800, 980 800, 980 850 C 980 950, 500 950, 500 1050" 
            fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="10 10"             initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -100 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          {/* Right bracket corner sensor nodes */}
          <motion.circle cx="980" cy="150" r="4" fill="#020617" stroke="#3b82f6" strokeWidth="2"             animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}/>
          <motion.circle cx="980" cy="150" r="2" fill="#93c5fd"
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}/>
          <motion.circle cx="930" cy="500" r="4" fill="#020617" stroke="#3b82f6" strokeWidth="2"             animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}/>
          <motion.circle cx="930" cy="500" r="2" fill="#93c5fd"
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}/>
          <motion.circle cx="980" cy="850" r="4" fill="#020617" stroke="#3b82f6" strokeWidth="2"             animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}/>
          <motion.circle cx="980" cy="850" r="2" fill="#93c5fd"
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}/>
        </svg>

      </div>

      {/* Background glow for Social Proof Section */}
      <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[60px] -translate-y-1/2 -z-10 pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-[800px] h-[800px] bg-cyan-600/20 rounded-full blur-[60px] -translate-y-1/2 -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-16">
        {/* Full Width News Ticker */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen overflow-hidden bg-blue-950/40 border-y border-blue-900/50 py-3 z-20 shadow-[0_0_30px_rgba(59,130,246,0.2)] flex backdrop-blur-sm">
          <div className="animate-ticker-rtl">
            {/* Generate duplicate items to ensure a seamless loop */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-10 whitespace-nowrap">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></span>
                <span className="text-blue-400 font-bold font-tech text-base tracking-widest uppercase opacity-80">Enterprise Security</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-20 relative flex flex-col items-center">
          <div className="relative inline-block z-20 bg-[#020617]/80 backdrop-blur-md px-8 py-4 rounded-2xl shadow-[0_0_40px_rgba(2,6,23,0.9)]">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight text-white leading-tight"
            >
              Engineered for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]">Enterprise</span> <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">Perimeter.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-slate-300 font-body max-w-2xl mx-auto leading-relaxed"
            >
              Built from day one for the most security-conscious organizations. <span className="text-white font-medium">Your data stays yours—always.</span>
            </motion.p>
          </div>
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
                className={`relative h-full group p-8 rounded-2xl bg-[#0a0f1e] border border-white/[0.05] transition-all duration-300 overflow-hidden ${feature.glowColor} ${feature.borderColor}`}
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
                      className="group-hover:animate-[iconBounce_3s_ease-in-out_infinite]"
                    >
                      {feature.icon}
                    </motion.div>
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 font-heading tracking-wide flex items-center gap-2">
                    <span className="opacity-0 group-hover:opacity-100 group-hover:text-cyan-400 transition-opacity duration-300 select-none">&gt;</span>
                    {feature.title}
                    <span className="animate-pulse opacity-0 group-hover:opacity-100 text-cyan-400 select-none">_</span>
                  </h3>
                  
                  <p className="text-slate-400 text-base leading-relaxed group-hover:text-slate-300 transition-colors duration-300 block">
                    {feature.description}
                  </p>
                </div>
                
                {/* Cyberpunk corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/10 group-hover:border-white/50 transition-colors duration-300 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/10 group-hover:border-white/50 transition-colors duration-300 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/10 group-hover:border-white/50 transition-colors duration-300 rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-white/50 transition-colors duration-300 rounded-br-xl" />


              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
