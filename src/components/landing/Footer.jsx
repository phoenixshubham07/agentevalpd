import React, { useRef } from 'react';
import { Shield } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Footer() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"]
  });

  return (
    <footer ref={sectionRef} className="relative pt-32 pb-12 overflow-hidden bg-transparent border-t border-white/5">
      {/* Vertical Roadmap Lines */}
      <div className="absolute inset-x-0 top-0 h-[1000px] max-w-7xl mx-auto pointer-events-none hidden md:block z-0">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full absolute inset-0 overflow-visible">
          <defs>
            <filter id="glow-amber-footer" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-red-footer" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-blue-footer" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Left Line */}
          <motion.path 
            d="M 166 0 L 166.01 1000" 
            fill="none" stroke="#f59e0b" strokeWidth="3" filter="url(#glow-amber-footer)"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: useTransform(scrollYProgress, [0, 0.8], [0, 1]) }}
          />
          {/* Center Line */}
          <motion.path 
            d="M 500 0 L 500.01 1000" 
            fill="none" stroke="#ef4444" strokeWidth="3" filter="url(#glow-red-footer)"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: useTransform(scrollYProgress, [0, 0.8], [0, 1]) }}
          />
          {/* Right Line */}
          <motion.path 
            d="M 833 0 L 833.01 1000" 
            fill="none" stroke="#3b82f6" strokeWidth="3" filter="url(#glow-blue-footer)"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: useTransform(scrollYProgress, [0, 0.8], [0, 1]) }}
          />
        </svg>
      </div>

      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/30 rounded-full blur-[150px]"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="mb-24 relative"
        >
          {/* Premium Glassmorphic CTA Card */}
          <div className="relative max-w-3xl mx-auto p-12 md:p-16 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 overflow-hidden">
            {/* Animated gradient ring */}
            <div className="absolute inset-0 rounded-3xl p-[1px] overflow-hidden pointer-events-none">
              <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0%,#f59e0b_10%,transparent_20%,#ef4444_40%,transparent_50%,#3b82f6_70%,transparent_80%,#8b5cf6_90%,transparent_100%)] animate-spin" style={{ animationDuration: '8s' }}></div>
            </div>
            {/* Inner card content */}
            <div className="relative z-10">
              {/* Glowing accent orbs */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute -bottom-20 left-1/4 w-48 h-48 bg-purple-600/15 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute -bottom-20 right-1/4 w-48 h-48 bg-amber-600/15 rounded-full blur-[80px] pointer-events-none"></div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-slate-300 text-xs font-tech tracking-widest uppercase mb-8 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                <span>Private Beta</span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-bold font-heading text-white tracking-tight mb-6 leading-tight">
                Enter the next era of <br className="hidden md:block" /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-blue-400">AI Governance.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">Spots for our private beta are strictly limited. Secure your organization's place in the future of autonomous AI safety.</p>
              
              <a href="#" className="group inline-flex items-center justify-center px-10 py-5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-full transition-all hover:from-blue-500 hover:to-blue-400 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:scale-105 duration-300 relative overflow-hidden">
                <span className="relative z-10">Join the Waitlist</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <span className="font-heading font-semibold text-lg tracking-tight text-white">AgentEval</span>
          </div>
          
          <div className="flex gap-8 text-sm text-slate-500 hover:text-slate-300 transition-colors">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="mailto:founders@agenteval.ai" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} AgentEval.ai
          </div>
        </div>
      </div>
    </footer>
  );
}
