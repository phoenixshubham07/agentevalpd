import React, { useRef, useState, useEffect } from 'react';
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


  return (
    <footer ref={sectionRef} className="relative pt-12 pb-12 overflow-hidden">

      {/* === BACKGROUND === */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#04071a] to-[#010408]" />
      {/* Very subtle blue tint — doesn't fight the card */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(59,130,246,0.06),transparent_70%)]" />
      {/* Fine dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px] opacity-60 pointer-events-none" />



      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">

        {/* Wrapper for CTA Card to securely bind the white line */}
        <div className="relative mb-24">

          {/* LEFT panel — lightweight circuit lines (no SVG blur filters) */}
          <div className="absolute left-0 top-0 bottom-0 w-56 pointer-events-none z-0 hidden lg:block">
            <svg viewBox="0 0 220 500" preserveAspectRatio="none" className="w-full h-full">
              {/* VERTICAL RAILS */}
              <line x1="8"  y1="0" x2="8"  y2="500" stroke="#06b6d4" strokeWidth="1.5" opacity="0.4"/>
              <line x1="40" y1="0" x2="40" y2="500" stroke="#06b6d4" strokeWidth="1"   opacity="0.2"/>
              <line x1="75" y1="40" x2="75" y2="460" stroke="#0e7490" strokeWidth="1"  opacity="0.15"/>
              {/* HORIZONTAL BRANCHES */}
              <line x1="8" y1="40"  x2="120" y2="40"  stroke="#06b6d4" strokeWidth="1" opacity="0.3"/>
              <line x1="8" y1="80"  x2="160" y2="80"  stroke="#06b6d4" strokeWidth="1" opacity="0.45"/>
              <line x1="8" y1="150" x2="140" y2="150" stroke="#06b6d4" strokeWidth="1" opacity="0.35"/>
              <line x1="8" y1="190" x2="100" y2="190" stroke="#22d3ee" strokeWidth="1" opacity="0.30"/>
              <line x1="8" y1="260" x2="180" y2="260" stroke="#06b6d4" strokeWidth="1" opacity="0.35"/>
              <line x1="8" y1="370" x2="155" y2="370" stroke="#06b6d4" strokeWidth="1" opacity="0.30"/>
              <line x1="8" y1="455" x2="130" y2="455" stroke="#06b6d4" strokeWidth="1" opacity="0.25"/>
              {/* JUNCTION DOTS (static, no animation) */}
              {[{cx:8,cy:40},{cx:8,cy:80},{cx:8,cy:150},{cx:8,cy:260},{cx:8,cy:370},
                {cx:40,cy:80},{cx:40,cy:150},{cx:40,cy:260},
                {cx:75,cy:115},{cx:75,cy:220}
              ].map((n,i) => (
                <circle key={i} cx={n.cx} cy={n.cy} r="2.5" fill="#06b6d4" opacity="0.5"/>
              ))}
              {/* 1 signal pulse (CSS animateMotion only) */}
              <circle r="2.5" fill="#67e8f9" opacity="0.8">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 8 0 L 8 500"/>
              </circle>
            </svg>
          </div>

          {/* RIGHT panel — lightweight circuit lines (no SVG blur filters) */}
          <div className="absolute right-0 top-0 bottom-0 w-56 pointer-events-none z-0 hidden lg:block">
            <svg viewBox="0 0 220 500" preserveAspectRatio="none" className="w-full h-full">
              {/* VERTICAL RAILS */}
              <line x1="212" y1="0" x2="212" y2="500" stroke="#3b82f6" strokeWidth="1.5" opacity="0.4"/>
              <line x1="180" y1="0" x2="180" y2="500" stroke="#3b82f6" strokeWidth="1"   opacity="0.2"/>
              <line x1="145" y1="40" x2="145" y2="460" stroke="#1d4ed8" strokeWidth="1"  opacity="0.15"/>
              {/* HORIZONTAL BRANCHES */}
              <line x1="212" y1="40"  x2="100" y2="40"  stroke="#3b82f6" strokeWidth="1" opacity="0.3"/>
              <line x1="212" y1="80"  x2="60"  y2="80"  stroke="#3b82f6" strokeWidth="1" opacity="0.45"/>
              <line x1="212" y1="150" x2="80"  y2="150" stroke="#3b82f6" strokeWidth="1" opacity="0.35"/>
              <line x1="212" y1="190" x2="120" y2="190" stroke="#60a5fa" strokeWidth="1" opacity="0.30"/>
              <line x1="212" y1="260" x2="40"  y2="260" stroke="#3b82f6" strokeWidth="1" opacity="0.35"/>
              <line x1="212" y1="370" x2="65"  y2="370" stroke="#3b82f6" strokeWidth="1" opacity="0.30"/>
              <line x1="212" y1="455" x2="90"  y2="455" stroke="#3b82f6" strokeWidth="1" opacity="0.25"/>
              {/* JUNCTION DOTS (static) */}
              {[{cx:212,cy:40},{cx:212,cy:80},{cx:212,cy:150},{cx:212,cy:260},{cx:212,cy:370},
                {cx:180,cy:80},{cx:180,cy:150},{cx:180,cy:260},
                {cx:145,cy:115},{cx:145,cy:220}
              ].map((n,i) => (
                <circle key={i} cx={n.cx} cy={n.cy} r="2.5" fill="#3b82f6" opacity="0.5"/>
              ))}
              {/* 1 signal pulse */}
              <circle r="2.5" fill="#93c5fd" opacity="0.8">
                <animateMotion dur="4.5s" repeatCount="indefinite" begin="0.5s" path="M 212 0 L 212 500"/>
              </circle>
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

      </div>



      {/* === GRATITUDE SECTION — THE MOST BEAUTIFUL SECTION === */}
      <div className="relative w-full overflow-hidden pt-28 pb-10">

        {/* ── COSMOS BACKGROUND ── */}
        {/* Pure black void */}
        <div className="absolute inset-0 bg-black" />

        {/* ── NEBULA CLOUDS (reduced blur, fewer elements) ── */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-violet-700 opacity-[0.15] blur-[80px] pointer-events-none" />
        <div className="absolute top-0 -left-32 w-[500px] h-[350px] rounded-full bg-purple-900 opacity-[0.20] blur-[70px] pointer-events-none" />
        <div className="absolute top-[35%] -right-20 w-[400px] h-[300px] rounded-full bg-amber-600 opacity-[0.10] blur-[70px] pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[300px] rounded-full bg-blue-900 opacity-[0.15] blur-[70px] pointer-events-none" />

        {/* ── Galaxy center line (no blur filter, just gradient) ── */}
        <div className="absolute top-[50%] left-[10%] right-[10%] h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,240,180,0.10) 50%, rgba(255,255,255,0.06) 70%, transparent)' }}
        />

        {/* ── 2 static nebula accents (no animation, CSS only) ── */}
        <div className="absolute top-[15%] left-[8%] w-[250px] h-[250px] rounded-full bg-violet-500 opacity-[0.12] blur-[60px] pointer-events-none" />
        <div className="absolute bottom-[15%] right-[10%] w-[220px] h-[220px] rounded-full bg-amber-400 opacity-[0.10] blur-[60px] pointer-events-none" />

        {/* ── TWINKLING STARS (8 only, CSS animation, no framer motion) ── */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            {top:'6%', left:'10%', d:2,  o:0.8, dur:2.5, color:'#fff'},
            {top:'12%',left:'55%', d:2,  o:0.9, dur:2.0, color:'#c4b5fd'},
            {top:'25%',left:'85%', d:1.5,o:0.7, dur:3.2, color:'#fde68a'},
            {top:'45%',left:'20%', d:2,  o:0.7, dur:3.0, color:'#fff'},
            {top:'55%',left:'75%', d:2.5,o:0.8, dur:2.2, color:'#93c5fd'},
            {top:'70%',left:'40%', d:1.5,o:0.6, dur:3.8, color:'#fff'},
            {top:'80%',left:'90%', d:2,  o:0.8, dur:2.8, color:'#fde68a'},
            {top:'90%',left:'15%', d:1.5,o:0.7, dur:3.5, color:'#c4b5fd'},
          ].map((s,i) => (
            <div key={i}
              className="absolute rounded-full"
              style={{
                top: s.top, left: s.left,
                width: s.d, height: s.d,
                backgroundColor: s.color,
                boxShadow: `0 0 ${s.d * 2}px ${s.color}`,
                animation: `twinkle ${s.dur}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
          <style>{`@keyframes twinkle { 0%,100%{opacity:0.8;transform:scale(1)} 50%{opacity:0.15;transform:scale(0.5)} }`}</style>
        </div>





        <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center">

          {/* ── HEADING ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-6"
          >
            {/* Cinematic golden divider line */}
            <div className="flex items-center gap-4 justify-center mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/50"/>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,1)]"/>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/50"/>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold font-heading tracking-tight leading-tight mb-5">
              <span className="text-white">Built by those who </span>
              <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.4)]">
                refuse to trust blindly.
              </span>
            </h2>

            <p className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed font-light">
              This artifact is dedicated to the{' '}
              <span className="text-amber-300 font-semibold">paranoid pioneers</span>{' '}
              building the next generation of safe, autonomous technology.{' '}
              <span className="text-white font-medium">The machine sees all. The machine answers to you.</span>
            </p>
          </motion.div>

          {/* ── COMIC SPEECH BUBBLE — DEVELOPERS dialogue ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 300, damping: 18 }}
            className="relative mb-10"
          >
            {/* Comic bubble body */}
            <div className="relative px-10 py-5 rounded-2xl border-4 border-red-400/90 bg-[#1a0000]/80 backdrop-blur-md shadow-[0_0_40px_rgba(239,68,68,0.3),inset_0_0_20px_rgba(239,68,68,0.05)]">
              {/* Halftone dots texture inside bubble */}
              <div className="absolute inset-0 rounded-xl opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(239,68,68,0.8) 1px, transparent 1px)', backgroundSize: '8px 8px' }}/>

              <AnimatePresence mode="wait">
                {showBubble && (
                  <motion.span
                    key={phraseIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="relative z-10 font-mono font-black text-2xl md:text-3xl tracking-[0.1em] text-red-300 drop-shadow-[0_0_16px_rgba(239,68,68,1)]"
                  >
                    {phrases[phraseIndex]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Comic bubble tail pointing DOWN (toward the terminal below) */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '14px solid transparent',
                borderRight: '14px solid transparent',
                borderTop: '22px solid rgba(248,113,113,0.9)',
                filter: 'drop-shadow(0 4px 12px rgba(239,68,68,0.5))'
              }}
            />
          </motion.div>

          {/* ── CINEMATIC TERMINAL WINDOW ── */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
          >
            {/* Outer golden glow halo */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-500/20 via-transparent to-violet-500/20 blur-sm pointer-events-none"/>
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-400/30 via-transparent via-50% to-blue-500/20 pointer-events-none"/>

            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_120px_rgba(251,191,36,0.08),0_0_60px_rgba(120,80,255,0.08),0_40px_80px_rgba(0,0,0,0.9)] border border-amber-400/10">

              {/* Terminal chrome header — gold-tinted */}
              <div className="flex items-center gap-2 px-5 py-3.5 bg-[#0a0800]/95 backdrop-blur-xl border-b border-amber-400/10">
                <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-[0_0_8px_rgba(239,68,68,0.8)]"/>
                <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-[0_0_8px_rgba(234,179,8,0.8)]"/>
                <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-[0_0_8px_rgba(34,197,94,0.8)]"/>
                <div className="ml-4 flex-1 text-center">
                  <span className="text-xs font-mono text-amber-600/70 tracking-widest">syntrox@neural-core — bash — 80×24</span>
                </div>
              </div>

              {/* Terminal body */}
              <div className="relative bg-[#020608]/98 backdrop-blur-xl">
                {/* Amber scan lines */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(251,191,36,0.008)_2px,rgba(251,191,36,0.008)_4px)] pointer-events-none z-10"/>
                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6))] pointer-events-none z-10"/>

                <div className="relative h-[420px] z-20">
                  <iframe
                    src="/ascii-art.html"
                    title="Syntrox ASCII Art"
                    className="w-full h-full border-none mix-blend-screen"
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                    tabIndex="-1"
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── CURSIVE SYNTROX SIGNATURE ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 flex flex-col items-center"
          >
            {/* Thin top separator */}
            <div className="flex items-center gap-5 mb-2">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400/30"/>
              <div className="w-1 h-1 rounded-full bg-amber-400/50"/>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/30"/>
            </div>

            {/* Cursive signature */}
            <motion.p
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                color: '#ffffff',
                textShadow: '0 0 15px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.1)',
                lineHeight: 1,
                letterSpacing: '0.02em',
                padding: '10px 0'
              }}
            >
              Syntrox
            </motion.p>
          </motion.div>


        </div>
      </div>




      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center mt-12 border-t border-white/5 pt-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-300 font-tech tracking-widest">Syntrox.ai</span>
          </div>

          <div className="flex gap-8 text-sm text-slate-500 hover:text-slate-300 transition-colors">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="mailto:founders@syntrox.ai" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} Syntrox.ai
          </div>
        </div>
      </div>
    </footer>
  );
}
