import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';
import { SyntroxWordmark, SyntroxMark } from '../../brand';

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
  const logoRef = useRef(null);
  const [splashDone, setSplashDone] = useState(false);
  const [markReady, setMarkReady] = useState(false);
  const logoInView = useInView(logoRef, { margin: '-40px' });
  
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end center"]
  });

  // Aggressive scroll lock while splash screen is active
  useEffect(() => {
    const preventScroll = (e) => e.preventDefault();
    
    if (!splashDone) {
      // Force snap to top on load
      window.scrollTo(0, 0);
      
      // Lock CSS overflow on both body and html to handle all browser quirks
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Actively prevent scroll events
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      // Match the 1.2s transition duration of the splash elements fading out
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
      }, 1200);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
      };
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [splashDone]);

  // Dismiss splash once mark animation completes
  useEffect(() => {
    if (markReady) {
      const timer = setTimeout(() => setSplashDone(true), 150);
      return () => clearTimeout(timer);
    }
  }, [markReady]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-10 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.04)_0%,_transparent_70%)] mix-blend-screen animate-pulse duration-10000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(11,15,25,0.9)_0%,_transparent_70%)] -z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.03)_0%,_transparent_70%)] opacity-80"></div>
        
        {/* Carbon Fibre pattern from Pitch Deck */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0 mix-blend-overlay"></div>
      </div>

      {/* Black Splash Background */}
      <motion.div 
        className="fixed inset-0 z-50 bg-[#020617]"
        initial={{ opacity: 1 }}
        animate={{ opacity: splashDone ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ pointerEvents: splashDone ? 'none' : 'auto' }}
      />

      {/* Floating mark — appears at bottom-right once logo scrolls out of view */}
      <motion.div
        className="fixed bottom-5 right-5 z-[40] pointer-events-none"
        initial={false}
        animate={{
          opacity: splashDone && !logoInView ? 1 : 0,
          scale:   splashDone && !logoInView ? 1 : 0.4,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <SyntroxMark size={56} animate={false} />
      </motion.div>

      <div ref={logoRef} className="relative z-[60] w-full flex justify-center mt-12 mb-0">
        <motion.div
          initial={{ y: '25vh', scale: 3 }}
          animate={splashDone ? { y: 0, scale: 1 } : { y: '25vh', scale: 3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-[60]"
        >
          <SyntroxMark
            size={112}
            animate={true}
            onReady={() => setMarkReady(true)}
          />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex-grow flex flex-col justify-start pt-2">

        <h1 className="flex justify-center w-full relative z-20 min-h-[100px] mb-6">
          <span className="sr-only">Syntrox.ai</span>
          {splashDone && (
            <>
              <div className="hidden lg:block relative z-20" aria-hidden="true">
                <SyntroxWordmark fontSize={80} animate={true} delay={100} glitch={true} />
              </div>
              <div className="block lg:hidden relative z-20" aria-hidden="true">
                <SyntroxWordmark fontSize={48} animate={true} delay={100} glitch={true} />
              </div>
            </>
          )}
        </h1>

        <div className="text-xl md:text-2xl text-slate-300 font-body font-light max-w-4xl mx-auto leading-relaxed tracking-wide mb-6">
          <ScrambleText text="The Active Governance System for " delay={0.2} />
          <ScrambleText text="Autonomous AI." delay={0.6} className="text-cyan-400 font-bold font-tech drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
        </div>

        <div className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
          <ScrambleText text="We don't just observe; we " delay={1.0} className="font-body" />
          <ScrambleText text="intercept." delay={1.4} className="font-tech text-white font-bold tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          <div className="mt-4 text-lg md:text-xl text-slate-400 font-body">
            <ScrambleText text="Absolute control and cognitive safety for enterprise multi-agent swarms." delay={1.8} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8"
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
