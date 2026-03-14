import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ProblemAgitation from './ProblemAgitation';
import FeatureHighlights from './FeatureHighlights';
import SocialProof from './SocialProof';
import Footer from './Footer';
import AnimatedTracesBackground from './AnimatedTracesBackground';
import TraceTreeMRI from './TraceTreeMRI';
import KillSwitchDemo from '../demos/KillSwitchDemo';

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

      <AnimatedTracesBackground />
      <main>
        <HeroSection />
        <ProblemAgitation />
        
        <section ref={roadmapRef} className="pt-48 md:pt-64 pb-24 w-full relative z-10 border-t border-white/5 overflow-visible">
          
          {/* Incoming Roadmap Lines from ProblemAgitation */}
          <div className="absolute inset-x-0 -top-32 h-[450px] md:h-[550px] max-w-7xl mx-auto pointer-events-none hidden md:block z-0">
            <svg viewBox="0 0 1000 400" className="w-full h-full absolute inset-0 overflow-visible">
              <defs>
                <filter id="glow-amber" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-red" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-blue" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-white" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {/* Left Branch */}
              <motion.path 
                d="M 166 0 L 166 120 L 500 240 L 500 400" 
                fill="none" stroke="#f59e0b" strokeWidth="3" filter="url(#glow-amber)"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: useTransform(scrollYProgress, [0, 0.15], [0, 1]) }}
              />
              {/* Center Branch */}
              <motion.path 
                d="M 500 0 L 500.01 400" 
                fill="none" stroke="#ef4444" strokeWidth="3" filter="url(#glow-red)"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: useTransform(scrollYProgress, [0, 0.15], [0, 1]) }}
              />
              {/* Right Branch */}
              <motion.path 
                d="M 833 0 L 833 120 L 500 240 L 500 400" 
                fill="none" stroke="#3b82f6" strokeWidth="3" filter="url(#glow-blue)"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: useTransform(scrollYProgress, [0, 0.15], [0, 1]) }}
              />
              {/* Combined Core Line going into Trust But Verify */}
              <motion.path 
                d="M 500 240 L 500 400" 
                fill="none" stroke="#ffffff" strokeWidth="6" filter="url(#glow-white)"
                vectorEffect="non-scaling-stroke"
                style={{ 
                  pathLength: useTransform(scrollYProgress, [0.08, 0.18], [0, 1]), 
                  opacity: useTransform(scrollYProgress, [0.08, 0.12], [0, 1]) 
                }}
              />
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
              <p className="mt-6 max-w-2xl text-lg text-slate-400 mx-auto leading-relaxed">
                Gain deep observability into your autonomous fleet. Pinpoint PII leaks and instantly sever rogue agents with millisecond latency.
              </p>
            </div>
            
            <div className="flex flex-col gap-32 mt-16 w-full relative z-10">
              {/* Feature 01: Trace Tree */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col gap-8 w-full relative"
              >
                {/* Background Edge Highlight when in view */}
                <motion.div 
                  className="absolute -inset-4 md:-inset-8 border border-purple-500/30 shadow-[0_0_80px_rgba(168,85,247,0.15),inset_0_0_80px_rgba(168,85,247,0.1)] rounded-3xl pointer-events-none -z-10"
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.0 }}
                  viewport={{ margin: "-200px" }}
                />

                <div className="text-center px-4">
                  <div className="inline-flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold font-tech relative z-10">01</div>
                    <h3 className="text-2xl font-bold font-heading text-white">Full X-Ray Vision</h3>
                  </div>
                  <p className="text-slate-400 max-w-2xl mx-auto">Visualize agent decision branches instantly. Our unified telemetry tracks LLM calls, deterministic workers, and system guardrails in one tree.</p>
                </div>
                {/* Full width container for TraceTree */}
                <div className="w-full max-w-5xl mx-auto px-2 sm:px-6">
                  <TraceTreeMRI />
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
                {/* Background Edge Highlight when in view */}
                <motion.div 
                  className="absolute -inset-4 md:-inset-8 border border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.15),inset_0_0_80px_rgba(6,182,212,0.1)] rounded-3xl pointer-events-none -z-10"
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.0 }}
                  viewport={{ margin: "-200px" }}
                />

                <div className="text-center px-4">
                  <div className="inline-flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold font-tech relative z-10">02</div>
                    <h3 className="text-2xl font-bold font-heading text-white">The Global Kill Switch</h3>
                  </div>
                  <p className="text-slate-400 max-w-2xl mx-auto">Emergency brakes for the autonomous era. Freeze a rogue agent or halt the entire execution fleet across your VPC without a code deploy.</p>
                </div>
                {/* Full width container for KillSwitch */}
                <div className="w-full max-w-5xl mx-auto px-2 sm:px-6 h-[60vh] min-h-[500px]">
                  <KillSwitchDemo onToggle={setKillSwitchActive} />
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
