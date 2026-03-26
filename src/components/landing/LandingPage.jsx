import React, { useRef, useState, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from './HeroSection';
import ProblemAgitation from './ProblemAgitation';
import FeatureHighlights from './FeatureHighlights';
import SocialProof from './SocialProof';
import Footer from './Footer';
import AgentTraceBackground from '../../backgrounds/AgentTraceBackground';

// Lazy load heavy 3D/demo components to code-split Three.js (~200KB+)
const TraceTree3D = lazy(() => import('./TraceTree3D'));
const KillSwitchDemo = lazy(() => import('../demos/KillSwitchDemo'));

export default function LandingPage() {
  const roadmapRef = useRef(null);
  const [killSwitchActive, setKillSwitchActive] = useState(false);
  const { scrollYProgress } = useScroll({
    target: roadmapRef,
    offset: ["start center", "end end"]
  });

  return (
    <div className={`bg-[#020617] text-slate-200 min-h-screen font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden relative transition-all duration-700 ${killSwitchActive ? 'hue-rotate-0' : ''}`}>
      {/* Full-page red overlay when kill switch is active */}
      <div 
        className={`fixed inset-0 z-[100] pointer-events-none transition-all duration-700 ${
          killSwitchActive 
            ? 'opacity-100' 
            : 'opacity-0'
        }`}
      >
        {/* Red vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(127,29,29,0.6)_100%)]"></div>
        {/* Red tint overlay */}
        <div className="absolute inset-0 bg-red-950/25 mix-blend-multiply"></div>
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(220,38,38,0.03)_2px,rgba(220,38,38,0.03)_4px)]"></div>
        {/* Top and bottom red glow bars */}
        <div className="absolute top-0 inset-x-0 h-1 bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.8),0_0_60px_rgba(220,38,38,0.4)]"></div>
        <div className="absolute bottom-0 inset-x-0 h-1 bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.8),0_0_60px_rgba(220,38,38,0.4)]"></div>
      </div>

      <AgentTraceBackground />
      <main>
        <HeroSection />
        <ProblemAgitation />
        
        <section ref={roadmapRef} className="pt-48 md:pt-64 pb-4 w-full relative z-10 overflow-visible">
          
          {/* Incoming Roadmap Lines from ProblemAgitation */}
          <div className="absolute inset-x-0 -top-32 bottom-0 max-w-7xl mx-auto pointer-events-none hidden md:block z-0">
            <svg viewBox="0 0 1000 3500" preserveAspectRatio="none" className="w-full h-full absolute inset-0 overflow-visible">
              {/* ===== BIOLUMINESCENT NEURAL LINKS ===== */}
              
              {/* Left Branch - Thick Ambient Aura */}
              <motion.path d="M 166 0 C 166 150, 250 240, 500 240" fill="none" stroke="#f59e0b" strokeWidth="10"  opacity="0.4"
                vectorEffect="non-scaling-stroke" style={{ pathLength: useTransform(scrollYProgress, [0, 0.15], [0, 1.5]) }} />
              {/* Left Branch - Inner Photon Filament */}
              <motion.path d="M 166 0 C 166 150, 250 240, 500 240" fill="none" stroke="#fde68a" strokeWidth="2"                 vectorEffect="non-scaling-stroke" style={{ pathLength: useTransform(scrollYProgress, [0, 0.15], [0, 1.5]) }} />

              {/* Center Branch - Thick Ambient Aura */}
              <motion.path d="M 500 0 C 400 80, 600 160, 500 240" fill="none" stroke="#ef4444" strokeWidth="10"  opacity="0.4"
                vectorEffect="non-scaling-stroke" style={{ pathLength: useTransform(scrollYProgress, [0, 0.15], [0, 1.5]) }} />
              {/* Center Branch - Inner Photon Filament */}
              <motion.path d="M 500 0 C 400 80, 600 160, 500 240" fill="none" stroke="#fca5a5" strokeWidth="2"                 vectorEffect="non-scaling-stroke" style={{ pathLength: useTransform(scrollYProgress, [0, 0.15], [0, 1.5]) }} />

              {/* Right Branch - Thick Ambient Aura */}
              <motion.path d="M 833 0 C 833 150, 750 240, 500 240" fill="none" stroke="#3b82f6" strokeWidth="10" opacity="0.4"
                vectorEffect="non-scaling-stroke" style={{ pathLength: useTransform(scrollYProgress, [0, 0.15], [0, 1.5]) }} />
              {/* Right Branch - Inner Photon Filament */}
              <motion.path d="M 833 0 C 833 150, 750 240, 500 240" fill="none" stroke="#93c5fd" strokeWidth="2"                 vectorEffect="non-scaling-stroke" style={{ pathLength: useTransform(scrollYProgress, [0, 0.15], [0, 1.5]) }} />
              
              {/* ===== INTERSECTION NODE (The Synapse Pool) ===== */}
              <motion.circle cx="500" cy="240" r="5" fill="#ffffff"                 style={{ opacity: useTransform(scrollYProgress, [0.12, 0.15], [0, 1]), scale: useTransform(scrollYProgress, [0.12, 0.15], [0, 1.5]) }}
              />
              <motion.circle cx="500" cy="240" r="14" fill="transparent" stroke="#06b6d4" strokeWidth="2"                 style={{ opacity: useTransform(scrollYProgress, [0.14, 0.18], [0, 0.6]), scale: useTransform(scrollYProgress, [0.14, 0.20], [0, 2.5]) }}
              />

              {/* ===== BRAIDED CORE NERVE BUNDLE ===== */}
              {/* Central Power Spine - Thick Ambient Glow (Fades out before the rock) */}
              <motion.path d="M 500 240 L 500 480" fill="none" stroke="#3b82f6" strokeWidth="16" opacity="0.3"
                vectorEffect="non-scaling-stroke" style={{ pathLength: useTransform(scrollYProgress, [0.13, 0.25], [0, 1.5]), opacity: useTransform(scrollYProgress, [0.12, 0.14], [0, 1]) }} />
              
              {/* Central Power Spine - Bright Core */}
              <motion.path d="M 500 240 L 500 480" fill="none" stroke="#ffffff" strokeWidth="3"                 vectorEffect="non-scaling-stroke" style={{ pathLength: useTransform(scrollYProgress, [0.13, 0.25], [0, 1.5]), opacity: useTransform(scrollYProgress, [0.12, 0.14], [0, 1]) }} />
              
              {/* ===== TRUST BUT VERIFY: Fiber-Optic Data Conduits ===== */}
              
              {/* LEFT CONDUIT — Cyan fiber optic cable */}
              {/* Outer ambient aura */}
              <motion.path d="M 500 240 C 530 260, 530 300, 500 320 C 470 340, 470 380, 500 400 C 530 420, 530 460, 500 480 C 500 550, 20 550, 20 850 L 20 3500" fill="none" stroke="#06b6d4" strokeWidth="12"                 vectorEffect="non-scaling-stroke" style={{ pathLength: useTransform(scrollYProgress, [0.13, 0.60], [0, 1.5]), opacity: 0.15 }} />
              {/* Mid glow ring */}
              <motion.path d="M 500 240 C 530 260, 530 300, 500 320 C 470 340, 470 380, 500 400 C 530 420, 530 460, 500 480 C 500 550, 20 550, 20 850 L 20 3500" fill="none" stroke="#06b6d4" strokeWidth="4"                 vectorEffect="non-scaling-stroke" style={{ pathLength: useTransform(scrollYProgress, [0.13, 0.60], [0, 1.5]), opacity: useTransform(scrollYProgress, [0.12, 0.14], [0, 0.5]) }} />
              {/* Bright inner core */}
              <motion.path d="M 500 240 C 530 260, 530 300, 500 320 C 470 340, 470 380, 500 400 C 530 420, 530 460, 500 480 C 500 550, 20 550, 20 850 L 20 3500" fill="none" stroke="#e0f7fa" strokeWidth="1.5"
                vectorEffect="non-scaling-stroke" style={{ pathLength: useTransform(scrollYProgress, [0.13, 0.60], [0, 1.5]), opacity: useTransform(scrollYProgress, [0.12, 0.14], [0, 0.9]) }} />
              {/* Dashed pulse traveling the line — data packet */}
              <motion.path d="M 500 240 C 530 260, 530 300, 500 320 C 470 340, 470 380, 500 400 C 530 420, 530 460, 500 480 C 500 550, 20 550, 20 850 L 20 3500" fill="none" stroke="#67e8f9" strokeWidth="3" strokeDasharray="6 80"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: useTransform(scrollYProgress, [0.13, 0.60], [0, 1.5]), opacity: useTransform(scrollYProgress, [0.12, 0.14], [0, 1]) }}
                animate={{ strokeDashoffset: [-200, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}/>

              {/* RIGHT CONDUIT — Blue fiber optic cable */}
              {/* Outer ambient aura */}
              <motion.path d="M 500 240 C 470 260, 470 300, 500 320 C 530 340, 530 380, 500 400 C 470 420, 470 460, 500 480 C 500 550, 980 550, 980 850 L 980 3500" fill="none" stroke="#3b82f6" strokeWidth="12"                 vectorEffect="non-scaling-stroke" style={{ pathLength: useTransform(scrollYProgress, [0.13, 0.60], [0, 1.5]), opacity: 0.15 }} />
              {/* Mid glow ring */}
              <motion.path d="M 500 240 C 470 260, 470 300, 500 320 C 530 340, 530 380, 500 400 C 470 420, 470 460, 500 480 C 500 550, 980 550, 980 850 L 980 3500" fill="none" stroke="#3b82f6" strokeWidth="4"                 vectorEffect="non-scaling-stroke" style={{ pathLength: useTransform(scrollYProgress, [0.13, 0.60], [0, 1.5]), opacity: useTransform(scrollYProgress, [0.12, 0.14], [0, 0.5]) }} />
              {/* Bright inner core */}
              <motion.path d="M 500 240 C 470 260, 470 300, 500 320 C 530 340, 530 380, 500 400 C 470 420, 470 460, 500 480 C 500 550, 980 550, 980 850 L 980 3500" fill="none" stroke="#bfdbfe" strokeWidth="1.5"
                vectorEffect="non-scaling-stroke" style={{ pathLength: useTransform(scrollYProgress, [0.13, 0.60], [0, 1.5]), opacity: useTransform(scrollYProgress, [0.12, 0.14], [0, 0.9]) }} />
              {/* Dashed pulse — data packet */}
              <motion.path d="M 500 240 C 470 260, 470 300, 500 320 C 530 340, 530 380, 500 400 C 470 420, 470 460, 500 480 C 500 550, 980 550, 980 850 L 980 3500" fill="none" stroke="#93c5fd" strokeWidth="3" strokeDasharray="6 80"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: useTransform(scrollYProgress, [0.13, 0.60], [0, 1.5]), opacity: useTransform(scrollYProgress, [0.12, 0.14], [0, 1]) }}
                animate={{ strokeDashoffset: [-200, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}/>
            </svg>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-10 pt-24"
          >
            <div className="text-center mb-16 px-4">
              <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-white font-heading relative inline-block">
                Trust But <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">Verify.</span>
              </h2>
              <p className="mt-8 max-w-3xl text-xl md:text-2xl font-light text-slate-300 mx-auto leading-relaxed">
                Gain deep observability into your autonomous fleet. Pinpoint <span className="text-white font-medium">PII leaks</span> and instantly <span className="text-white font-medium">sever rogue agents</span> with millisecond latency.
              </p>
            </div>
            
            <div className="flex flex-col gap-32 mt-16 w-full relative z-10">
              {/* Feature 01: Trace Tree */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col gap-4 w-full relative -mt-8"
              >

                <div className="text-center px-4">
                  <div className="inline-flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold font-tech relative z-10">01</div>
                    <h3 className="text-2xl font-bold font-heading text-white">Full X-Ray Vision</h3>
                  </div>
                  <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">Visualize agent decision branches instantly. Our unified telemetry tracks <span className="text-white font-medium">LLM calls</span>, <span className="text-white font-medium">deterministic workers</span>, and <span className="text-white font-medium">system guardrails</span> in one tree.</p>
                </div>
                {/* Full width container for TraceTree */}
                <div className="relative w-full">
                  <div className="hidden md:block absolute top-1/2 left-[2%] w-16 lg:w-32 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent z-0 -translate-y-1/2">
                    <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#020617] border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-[ping_3s_infinite]" />
                    </div>
                  </div>
                  <div className="hidden md:block absolute top-1/2 right-[2%] w-16 lg:w-32 h-[2px] bg-gradient-to-l from-blue-500 to-transparent z-0 -translate-y-1/2">
                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#020617] border-2 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-[ping_3s_infinite_1s]" />
                    </div>
                  </div>
                  <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 relative z-10">
                    <Suspense fallback={<div className="w-full h-[540px] bg-slate-900/50 rounded-2xl animate-pulse" />}>
                      <TraceTree3D />
                    </Suspense>
                  </div>
                </div>
              </motion.div>
              
              {/* Feature 02: Kill Switch */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col gap-8 w-full relative"
              >

                <div className="text-center px-4">
                  <div className="inline-flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold font-tech relative z-10">02</div>
                    <h3 className="text-2xl font-bold font-heading text-white">The Global Kill Switch</h3>
                  </div>
                  <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">Emergency brakes for the autonomous era. <span className="text-white font-medium">Freeze a rogue agent</span> or halt the <span className="text-white font-medium">entire execution fleet</span> across your VPC without a code deploy.</p>
                </div>
                {/* Full width container for KillSwitch */}
                <div className="relative w-full">
                  <div className="hidden md:block absolute top-1/2 left-[2%] w-16 lg:w-32 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent z-0 -translate-y-1/2">
                    <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#020617] border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-[ping_3s_infinite_0.5s]" />
                    </div>
                  </div>
                  <div className="hidden md:block absolute top-1/2 right-[2%] w-16 lg:w-32 h-[2px] bg-gradient-to-l from-blue-500 to-transparent z-0 -translate-y-1/2">
                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#020617] border-2 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-[ping_3s_infinite_1.5s]" />
                    </div>
                  </div>
                  <div className="w-full max-w-5xl mx-auto px-2 sm:px-6 h-[60vh] min-h-[500px] relative z-10">
                    <Suspense fallback={<div className="w-full h-full bg-slate-900/30 rounded-2xl border border-slate-800/50" />}>
                      <KillSwitchDemo active={killSwitchActive} onToggle={() => setKillSwitchActive(!killSwitchActive)} />
                    </Suspense>
                  </div>
                </div>
              </motion.div>
            </div>
            
          </motion.div>
        </section>

        <FeatureHighlights />
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
}
