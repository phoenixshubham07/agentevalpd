import React, { useRef, useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"]
  });

  // Ballmer "developers" speech bubble cycling
  const phrases = [
    'DEVELOPERS!',
    'DEVELOPERS!!',
    'DEVELOPERS!!!',
    'DEVELOPERS!!!!',
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Start the cycle after a short delay
    const startTimer = setTimeout(() => setShowBubble(true), 2000);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!showBubble) return;
    const interval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % phrases.length);
    }, 700); // Increased speed
    return () => clearInterval(interval);
  }, [showBubble, phrases.length]);

  // Forward scroll events from ASCII art iframe to maintain smooth scrolling
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.type === 'iframeWheel') {
        window.dispatchEvent(new WheelEvent('wheel', {
          deltaY: e.data.deltaY,
          deltaX: e.data.deltaX,
          bubbles: true,
          cancelable: true
        }));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <footer ref={sectionRef} className="relative pt-32 pb-12 overflow-hidden bg-[#020617]/50 backdrop-blur-2xl border-t border-white/5">


      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/30 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">

        {/* Wrapper for CTA Card to securely bind the white line */}
        <div className="relative mb-24">

          {/* White Line Behind CTA Only (Stops exactly at the CTA bottom, before the text links) */}
          <div className="absolute left-0 right-0 -top-32 bottom-0 pointer-events-none hidden md:block z-0">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full absolute inset-0 overflow-visible">
              <defs>
                <filter id="glow-white-cta" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <motion.path
                d="M 50 0 L 50 100"
                fill="none" stroke="#ffffff" strokeWidth="6" filter="url(#glow-white-cta)"
                vectorEffect="non-scaling-stroke"
                style={{
                  pathLength: useTransform(scrollYProgress, [0, 0.5], [0, 1]),
                  opacity: 0.6
                }}
              />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            {/* Premium Glassmorphic CTA Card */}
            <div className="relative max-w-3xl mx-auto p-12 md:p-16 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 overflow-hidden">
              {/* Animated gradient ring */}
              <div className="absolute inset-0 rounded-3xl p-[1px] overflow-hidden pointer-events-none">
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0%,#eab308_10%,transparent_20%,#ef4444_40%,transparent_50%,#3b82f6_70%,transparent_80%,#ef4444_90%,transparent_100%)] animate-spin" style={{ animationDuration: '8s' }}></div>
              </div>
              {/* Inner card content */}
              <div className="relative z-10">
                {/* Glowing accent orbs */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-600/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute -bottom-20 left-1/4 w-48 h-48 bg-yellow-600/15 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute -bottom-20 right-1/4 w-48 h-48 bg-blue-600/15 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="relative z-20 bg-[#020617]/80 backdrop-blur-md px-8 py-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-slate-800/50 max-w-2xl mx-auto flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#020617]/50 border border-white/10 text-white font-bold font-tech tracking-wider uppercase mb-8 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-[ping_2s_infinite]"></span>
                    <span>Private Beta</span>
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-bold font-heading text-white tracking-tight mb-6 leading-tight text-center">
                    Enter the next era of <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-400 to-blue-500">AI Governance.</span>
                  </h2>
                  <p className="text-slate-300 text-lg md:text-xl mb-10 text-center leading-relaxed font-body font-light">
                    Spots for our private beta are <span className="text-red-400 font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">strictly limited</span>. Secure your organization's place in the future of <span className="text-white font-medium">autonomous AI safety</span>.
                  </p>

                  <a href="#" className="group inline-flex items-center justify-center px-10 py-5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-full transition-all hover:from-blue-500 hover:to-blue-400 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:scale-105 duration-300 relative overflow-hidden">
                    <span className="relative z-10">Join the Waitlist</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
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

      {/* ASCII Art Embed and Splitting Lines Container */}
      <div className="w-full relative mt-24 pb-10 flex flex-col items-center">
        
        {/* Animated TV-Frame HUD framing the ASCII Art */}
        <div className="w-full max-w-5xl h-[950px] absolute top-0 pointer-events-none hidden md:block z-20">
          <svg viewBox="0 0 1000 950" preserveAspectRatio="none" className="w-full h-full absolute inset-0 overflow-visible">
            <defs>
              <filter id="glow-amber-split" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-red-split" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-blue-split" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Continuing White Stub */}
            <motion.path
              d="M 500 0 L 500 80"
              fill="none" stroke="#ffffff" strokeWidth="4"
              vectorEffect="non-scaling-stroke"
              style={{
                pathLength: useTransform(scrollYProgress, [0.8, 0.85], [0, 1]),
                opacity: 0.8
              }}
            />

            {/* Left Branch Split (Amber) - TV Frame Left Loop */}
            <motion.path
              d="M 500 80 L 50 120 L 50 820 L 500 860"
              fill="none" stroke="#f59e0b" strokeWidth="3" filter="url(#glow-amber-split)"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: useTransform(scrollYProgress, [0.85, 0.98], [0, 1]) }}
            />

            {/* Center Branch Split (Red) - Drops down into "System Core Accessed" */}
            <motion.path
              d="M 500 80 L 500 150"
              fill="none" stroke="#ef4444" strokeWidth="4" filter="url(#glow-red-split)"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: useTransform(scrollYProgress, [0.85, 0.90], [0, 1]) }}
            />

            {/* Right Branch Split (Blue) - TV Frame Right Loop */}
            <motion.path
              d="M 500 80 L 950 120 L 950 820 L 500 860"
              fill="none" stroke="#3b82f6" strokeWidth="3" filter="url(#glow-blue-split)"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: useTransform(scrollYProgress, [0.85, 0.98], [0, 1]) }}
            />
            
            {/* Bottom Stem powering the Developer Console Quote */}
            <motion.path
              d="M 500 860 L 500 910"
              fill="none" stroke="#ef4444" strokeWidth="4" filter="url(#glow-red-split)"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: useTransform(scrollYProgress, [0.96, 1], [0, 1]) }}
            />
          </svg>
        </div>

        {/* Pure Transparent Terminal Zone without Cards */}
        <div className="w-full max-w-5xl mx-auto md:px-12 mt-16 z-30 relative pt-12">
          
          {/* Ambient terminal glow for pure aesthetic, no rigid borders */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-900/10 blur-[120px] -z-10 pointer-events-none"></div>

          {/* ASCII Context Message */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.85, 0.95], [0, 1]) }}
            className="text-center mb-10 max-w-3xl mx-auto px-4 relative z-10"
          >
            <div className="inline-flex items-center justify-center gap-4 mb-6 relative">
               <span className="w-24 h-[1px] bg-gradient-to-r from-transparent to-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
               <span className="text-sm font-tech text-slate-200 font-bold tracking-[0.4em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">System Core Accessed</span>
               <span className="w-24 h-[1px] bg-gradient-to-l from-transparent to-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
            </div>
            <p className="text-base md:text-lg font-mono text-slate-300 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              Thank you for scrolling into the depths. This raw terminal artifact is dedicated to the paranoid pioneers building the next generation of safe, autonomous technology. We're glad you're here.
            </p>
          </motion.div>

          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.85, 0.98], [0, 1])
            }}
            className="w-full max-w-4xl mx-auto h-[400px] relative z-10 transition-opacity duration-300"
          >
            {/* Soft scanline overlay over the iframe to blend it perfectly */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)] pointer-events-none z-20"></div>
            
            <iframe
              src="/ascii-art.html"
              title="AgentEval ASCII Art"
              className="w-full h-full border-none mix-blend-screen opacity-90"
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
              tabIndex="-1"
            />
          </motion.div>
          
          {/* Output Terminal Console Quote - Powered by the TV Frame Base Stem */}
          <div className="relative w-full max-w-4xl mx-auto flex justify-center mt-12 mb-8 h-16 z-40">
            <AnimatePresence mode="wait">
              {showBubble && (
                <motion.div
                  key={phraseIndex}
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute bottom-0 flex flex-col items-center"
                >
                  <div className="relative px-8 py-3 bg-[#050505]/90 backdrop-blur-md border border-red-500/80 rounded-sm shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                    <span
                      className="font-mono font-bold text-lg md:text-2xl tracking-[0.2em] text-red-500"
                    >
                      {phrases[phraseIndex]}
                    </span>
                    {/* Brutalist terminal tail pointing to base stem */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[12px] border-b-red-500/80" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </footer>
  );
}
