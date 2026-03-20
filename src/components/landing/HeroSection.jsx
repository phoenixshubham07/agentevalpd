import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';

const ScrambleText = ({ text, delay = 0, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\\\/[]{}—=+*^?#_";
  
  useEffect(() => {
    let iteration = 0;
    let timeoutId;
    let intervalId;
    
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setDisplayText(
          text.split("").map((letter, index) => {
            if(index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(intervalId);
        }
        
        iteration += 4;
      }, 20);
    }, delay * 1000);
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    }
  }, [text, delay]);
  
  return <span className={className}>{displayText}</span>;
}

export default function HeroSection() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end center"]
  });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-10 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(147,51,234,0.15)_0%,_transparent_70%)] mix-blend-screen animate-pulse duration-10000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(11,15,25,0.8)_0%,_transparent_70%)] -z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.08)_0%,_transparent_70%)] opacity-80"></div>
        
        {/* Carbon Fibre pattern from Pitch Deck */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex-grow flex flex-col justify-center">


        <motion.h1 
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-[4rem] lg:text-[7rem] font-bold font-heading tracking-tighter mb-4 text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] leading-none"
        >
          Agent<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Eval</span>
        </motion.h1>

        <div className="text-xl text-slate-300 font-body font-light max-w-4xl mx-auto leading-relaxed tracking-wide mb-6">
          <ScrambleText text="The Global Governance Layer for " delay={0.2} />
          <ScrambleText text="Autonomous AI." delay={0.6} className="text-blue-400 font-medium font-tech" />
        </div>

        <div className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed font-body">
          <ScrambleText text="Real-time observability, cognitive safety, and asynchronous evaluation for enterprise multi-agent systems. Control the uncontrollable." delay={1.0} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Cyberpunk Button 1 */}
          <a href="#" className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-4 border border-blue-500/50 bg-blue-500/10 text-blue-400 font-tech uppercase tracking-widest transition-all hover:bg-blue-500/20 hover:border-blue-400 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-400 group-hover:border-white transition-colors"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-400 group-hover:border-white transition-colors"></div>
             <span className="relative z-10 flex items-center gap-3 text-xs font-bold">
               <span className="opacity-50 group-hover:opacity-100 transition-opacity">&gt;</span> 
               JOIN_WAITLIST 
               <span className="opacity-50 animate-pulse">_</span>
             </span>
          </a>
        </motion.div>

        {/* Mouse Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="mt-16 flex flex-col items-center gap-3 text-slate-200 font-tech text-xs tracking-widest uppercase"
        >
          <div className="relative w-5 h-8 border border-slate-400/80 rounded-full flex justify-center pt-1.5 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <motion.div 
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-slate-200 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            />
          </div>
          <span className="text-slate-200 font-bold uppercase tracking-[0.3em] text-[10px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4 py-1 bg-slate-900/50 backdrop-blur-sm rounded-full border border-white/5">
            Scroll peacefully, you are in right hands
          </span>
        </motion.div>
      </div>
      
      {/* Downward Roadmap Line escaping Hero section */}
      <div ref={lineRef} className="relative w-[2px] h-32 bg-slate-800/50 mt-auto z-20">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] origin-top"
          style={{ scaleY: scrollYProgress }}
        />
      </div>

      {/* Bottom gradient fade down */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none z-10"></div>
    </section>
  );
}
