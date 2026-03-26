import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, ShieldAlert, Scale } from 'lucide-react';

const problems = [
  {
    id: 1,
    icon: <Cpu className="w-6 h-6 text-amber-500" />,
    title: "Unpredictability",
    description: (
      <>
        Agents stuck in infinite loops can <span className="text-white font-medium">burn $20,000 in API credits</span> overnight. Silent failures cost time and capital.
      </>
    ),
    color: "from-amber-500/20",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
    borderColor: "group-hover:border-amber-500/50",
    scannerBg: "bg-gradient-to-b from-transparent via-amber-500/80 to-transparent",
    iconGlow: "group-hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    lineColor: "#f59e0b",
    glowId: "glow-amber"
  },
  {
    id: 2,
    icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
    title: "Security Risks",
    description: (
      <>
        Multi-agent systems create uncontrollable surfaces. Bad actors can <span className="text-white font-medium">hijack agents to bypass</span> traditional security perimeters.
      </>
    ),
    color: "from-red-500/20",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]",
    borderColor: "group-hover:border-red-500/50",
    scannerBg: "bg-gradient-to-b from-transparent via-red-500/80 to-transparent",
    iconGlow: "group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]",
    lineColor: "#ef4444",
    glowId: "glow-red"
  },
  {
    id: 3,
    icon: <Scale className="w-6 h-6 text-blue-500" />,
    title: "Compliance Paralysis",
    description: (
      <>
        Enterprises cannot deploy agents that might <span className="text-white font-medium">hallucinate regulatory advice</span> or <span className="text-white font-medium">leak PII</span> into public LLM models.
      </>
    ),
    color: "from-blue-500/20",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    borderColor: "group-hover:border-blue-500/50",
    scannerBg: "bg-gradient-to-b from-transparent via-blue-500/80 to-transparent",
    iconGlow: "group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    lineColor: "#3b82f6",
    glowId: "glow-blue"
  }
];

export default function ProblemAgitation() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={sectionRef} id="problem" className="py-32 relative bg-transparent overflow-hidden">
      {/* Background Cyber-grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-20 opacity-20 mask-image:linear-gradient(to_bottom,transparent,black,transparent)"></div>

      {/* Incoming Roadmap Line to title */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-32 bg-slate-800/50 z-20">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] origin-top"
          style={{ scaleY: useTransform(scrollYProgress, [0, 0.2], [0, 1]) }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold font-heading mb-6 tracking-tight text-white"
          >
            Multi-agent systems are black boxes. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">We turn on the lights.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 font-light leading-relaxed"
          >
            The Trust Gap is blocking adoption. Enterprises want the efficiency of autonomous AI, but the risks of deploying <span className="text-white font-medium">stochastic systems at scale</span> are paralyzing.
          </motion.p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10 pt-4 md:pt-0">
            {problems.map((problem, index) => (
              <div key={problem.id} className="relative">
                {/* Mobile Fallback Line from Top */}
                <div className="absolute -top-6 left-1/2 w-[2px] h-6 bg-slate-800/50 md:hidden z-0 -translate-x-1/2">
                   <motion.div 
                     className="absolute top-0 left-0 w-full h-full bg-blue-500 origin-top"
                     style={{ scaleY: useTransform(scrollYProgress, [0.1, 0.4], [0, 1]) }}
                   />
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1 * index, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative h-full group p-8 rounded-2xl bg-[#0a0f1e] border border-white/[0.05] transition-all duration-300 overflow-hidden ${problem.glowColor} ${problem.borderColor}`}
                >
                  {/* Top Gradient Glow */}
                  <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${problem.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                  
                  {/* Cyberpunk Scanner Line */}
                  <motion.div 
                    className={`absolute left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 ${problem.scannerBg} z-20 blur-[1px]`}
                    initial={{ top: '-10%' }}
                    whileHover={{ top: '110%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="relative z-10">
                    <motion.div 
                      className={`p-3 bg-white/5 rounded-xl self-start inline-block mb-6 border border-white/10 ${problem.iconGlow}`}
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="group-hover:animate-[iconBounce_3s_ease-in-out_infinite]"
                      >
                        {problem.icon}
                      </motion.div>
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold text-white mb-3 font-heading tracking-wide flex items-center gap-2">
                      <span className="opacity-0 group-hover:opacity-100 group-hover:text-amber-400 transition-opacity duration-300 select-none">&gt;</span>
                      {problem.title}
                      <span className="animate-pulse opacity-0 group-hover:opacity-100 text-amber-400 select-none">_</span>
                    </h3>
                    
                    <p className="text-slate-400 text-base leading-relaxed group-hover:text-slate-300 transition-colors duration-300 block">
                      {problem.description}
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
      </div>
    </section>
  );
}
