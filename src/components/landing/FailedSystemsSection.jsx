import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function RedactedWord({ word, threshold, scrollYProgress, color = '#ffffff', barColor = '#020617' }) {
  const barScaleX = useTransform(scrollYProgress, [threshold, threshold + 0.042], [1, 0]);
  const barOpacity = useTransform(scrollYProgress, [threshold + 0.030, threshold + 0.042], [1, 0]);

  return (
    <span className="relative inline-block">
      <span style={{ color }}>{word}</span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-[2px] origin-right pointer-events-none"
        style={{
          backgroundColor: barColor,
          scaleX: barScaleX,
          opacity: barOpacity,
        }}
      />
    </span>
  );
}

export default function FailedSystemsSection() {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.38], [0.06, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.10], [0, 1]);
  const badgeOpacity = useTransform(scrollYProgress, [0.88, 0.96], [0, 1]);

  const line1 = [
    { word: 'Built',     t: 0.38 },
    { word: 'on',        t: 0.41 },
    { word: 'a',         t: 0.43 },
    { word: 'decade',    t: 0.45 },
    { word: 'of',        t: 0.47 },
    { word: 'analyzing', t: 0.49 },
    { word: 'failed',    t: 0.52, color: '#fca5a5' },
    { word: 'systems.',  t: 0.55, color: '#fca5a5' },
  ];

  const line2 = [
    { word: 'SYNTROX',  t: 0.60, color: '#ffffff' },
    { word: 'governs',  t: 0.64, color: '#60a5fa' },
    { word: 'what',     t: 0.67, color: '#cbd5e1' },
    { word: 'other',    t: 0.70, color: '#cbd5e1' },
    { word: 'AIs',      t: 0.73, color: '#cbd5e1' },
    { word: "didn't",   t: 0.76, color: '#cbd5e1' },
    { word: 'survive',  t: 0.79, color: '#f87171' },
    { word: 'long',     t: 0.82, color: '#cbd5e1' },
    { word: 'enough',   t: 0.84, color: '#cbd5e1' },
    { word: 'to',       t: 0.86, color: '#cbd5e1' },
    { word: 'learn.',   t: 0.89, color: '#f87171' },
  ];

  return (
    <div ref={outerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#020617]">

        {/* Static red radial atmosphere */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(239,68,68,0.05),transparent_70%)]" />

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.4)_2px,rgba(0,0,0,0.4)_4px)]" />

        <motion.div
          style={{ scale, opacity: contentOpacity }}
          className="relative z-10 text-center px-6 max-w-6xl mx-auto select-none"
        >
          {/* CLASSIFIED label */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-red-800/40" />
            <span className="text-[9px] font-tech tracking-[0.45em] text-red-700/60 uppercase">
              Classified
            </span>
            <div className="h-px w-10 bg-red-800/40" />
          </div>

          {/* Line 1 — smaller */}
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mb-10">
            {line1.map((w, i) => (
              <span key={i} className="text-base md:text-lg font-tech tracking-widest">
                <RedactedWord
                  word={w.word}
                  threshold={w.t}
                  scrollYProgress={scrollYProgress}
                  color={w.color || '#475569'}
                />
              </span>
            ))}
          </div>

          {/* Line 2 — large */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-4 leading-none">
            {line2.map((w, i) => (
              <span
                key={i}
                className="text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight"
              >
                <RedactedWord
                  word={w.word}
                  threshold={w.t}
                  scrollYProgress={scrollYProgress}
                  color={w.color}
                />
              </span>
            ))}
          </div>

          {/* ACTIVE GOVERNANCE badge — appears after full reveal */}
          <motion.div
            style={{ opacity: badgeOpacity }}
            className="mt-12 flex items-center justify-center gap-3"
          >
            <div className="h-px w-10 bg-cyan-500/30" />
            <span className="text-[9px] font-tech tracking-[0.45em] text-cyan-500/50 uppercase">
              Active Governance System
            </span>
            <div className="h-px w-10 bg-cyan-500/30" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
