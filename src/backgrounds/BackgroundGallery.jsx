import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CircuitBoardBackground from './CircuitBoardBackground';
import NeuralNetworkBackground from './NeuralNetworkBackground';
import AgentTraceBackground from './AgentTraceBackground';

const BACKGROUNDS = [
  {
    id: 'agent-trace',
    name: 'Agent Trace',
    tag: '✦ CODED',
    tagColor: '#ef4444',
    type: 'component',
    description:
      'Full Syntrox governance pipeline: 15 named nodes across 4 layers (Proxy → Governance → AI Models → Eval → Verdict). Flowing animated dash edges, gradient signal trails, node illumination on trace arrival, and a periodic KILL-SWITCH event that flashes everything red. Inspired directly by AnimatedTracesBackground.',
    bestFor: 'Landing page hero, full-page background (direct AnimatedTracesBackground replacement)',
    component: AgentTraceBackground,
  },
  {
    id: 'circuit-board-coded',
    name: 'Circuit Board Firewall',
    tag: '✦ CODED',
    tagColor: '#06b6d4',
    type: 'component',
    description:
      'Procedurally generated, fully animated PCB canvas. Signal pulses travel along cyan/blue trace lines; amber capacitor symbols glow; IC chip packages scattered across the board; red LEDs pulse as alert indicators.',
    bestFor: 'Full-page hero background, AnimatedTracesBackground replacement',
    component: CircuitBoardBackground,
  },
  {
    id: 'neural-network-coded',
    name: 'Neural Network Graph',
    tag: '✦ CODED',
    tagColor: '#3b82f6',
    type: 'component',
    description:
      'Procedural force-graph of AI agent nodes connected by fiber-optic edges. A bright sentinel node sits at the center; signal pulses travel along edges activating destination nodes. Cyan/blue/amber/red color system. 30fps Canvas, zero blur filters.',
    bestFor: 'Hero section, ProblemAgitation section, AI agent monitoring theme',
    component: NeuralNetworkBackground,
  },
  {
    id: 'mission-control',
    src: '/backgrounds/mission-control.png',
    name: 'Mission Control HUD',
    tag: '⭐ PNG',
    tagColor: '#eab308',
    type: 'image',
    description:
      'Cyberpunk ops interface with floating data panels, kill-switch alerts, fiber-optic conduits, and a multi-agent network diagram being monitored in real-time.',
    bestFor: 'Inspiration reference, static overlay use',
  },
  {
    id: 'neural-network',
    src: '/backgrounds/neural-network.png',
    name: 'Neural Network Graph',
    tag: 'PNG',
    tagColor: '#3b82f6',
    type: 'image',
    description:
      'Omniscient AI agent graph radiating from a central sentinel node. Cyan nodes, glowing blue links, amber circuit traces, red pulse signals.',
    bestFor: 'Hero section, Problem/Solution section',
  },
  {
    id: 'circuit-board',
    src: '/backgrounds/circuit-board.png',
    name: 'Circuit Board (photo)',
    tag: 'PNG',
    tagColor: '#3b82f6',
    type: 'image',
    description:
      'Hyper-detailed PCB: dark navy with etched cyan traces, amber glowing capacitors, red alert LEDs, and blue fiber-optic data streams.',
    bestFor: 'Feature Highlights section, reference for coded version',
  },
  {
    id: 'cosmos-membrane',
    src: '/backgrounds/cosmos-membrane.png',
    name: 'Cosmos Membrane',
    tag: 'PNG',
    tagColor: '#a855f7',
    type: 'image',
    description:
      'Cinematic nebula with violet purple clouds, amber-gold stellar region, crimson red gas trails, and a glowing cyan governance ring.',
    bestFor: 'Footer, Gratitude section',
  },
  {
    id: 'proxy-intercept',
    src: '/backgrounds/proxy-intercept.png',
    name: 'Proxy Intercept',
    tag: 'PNG',
    tagColor: '#ef4444',
    type: 'image',
    description:
      'Light storm — blue, amber, and red threads converging into a blazing cyan proxy spine representing Syntrox intercepting all AI traffic.',
    bestFor: 'ProblemAgitation section, pitch slides',
  },
];

export default function BackgroundGallery() {
  const [selected, setSelected] = useState('circuit-board-coded');
  const [previewMode, setPreviewMode] = useState('overlay'); // 'overlay' | 'raw'

  const active = BACKGROUNDS.find((b) => b.id === selected);
  const ActiveComp = active?.component;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col overflow-hidden">

      {/* ── HEADER ── */}
      <div className="relative border-b border-white/5 bg-[#020617]/95 backdrop-blur-xl z-20 flex-none">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)] animate-pulse block" />
            <span className="font-mono text-xs tracking-widest uppercase text-cyan-400">Syntrox.ai</span>
            <span className="text-white/20 mx-1">/</span>
            <span className="font-mono text-xs tracking-widest uppercase text-slate-400">Background Lab</span>
          </div>

          <div className="flex items-center gap-2">
            {[['overlay', '⬛ With Content'], ['raw', '⛶ Raw BG']].map(([mode, label]) => (
              <button
                key={mode}
                onClick={() => setPreviewMode(mode)}
                className={`px-3 py-1.5 rounded font-mono text-xs uppercase tracking-wider border transition-all ${
                  previewMode === mode
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                    : 'border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 57px)' }}>

        {/* ── SIDEBAR ── */}
        <div className="w-64 flex-none border-r border-white/5 bg-[#010812] overflow-y-auto flex flex-col gap-1 p-2">
          <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest px-2 py-2">
            {BACKGROUNDS.length} Backgrounds
          </p>
          {BACKGROUNDS.map((bg) => (
            <button
              key={bg.id}
              onClick={() => setSelected(bg.id)}
              className={`group relative w-full rounded-lg overflow-hidden border text-left transition-all ${
                selected === bg.id
                  ? 'border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                  : 'border-white/5 hover:border-white/20'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-full" style={{ aspectRatio: '16/9', background: '#010812' }}>
                {bg.type === 'image' ? (
                  <img src={bg.src} alt={bg.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="relative w-full h-full overflow-hidden">
                    <div className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
                      {bg.component && React.createElement(bg.component)}
                    </div>
                  </div>
                )}
                {selected === bg.id && (
                  <div className="absolute inset-0 bg-cyan-500/10 border-2 border-cyan-400/40" />
                )}
                {bg.type === 'component' && (
                  <div className="absolute top-1 right-1 text-[8px] font-mono bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-1 py-0.5 rounded">
                    LIVE
                  </div>
                )}
              </div>
              {/* Label */}
              <div className="px-2.5 py-2 bg-[#020617]/90">
                <span
                  className="text-[8px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded-sm inline-block mb-0.5"
                  style={{ color: bg.tagColor, background: `${bg.tagColor}18`, border: `1px solid ${bg.tagColor}35` }}
                >
                  {bg.tag}
                </span>
                <p className="text-xs font-semibold text-slate-200 leading-tight">{bg.name}</p>
              </div>
            </button>
          ))}
        </div>

        {/* ── MAIN PREVIEW ── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex-1 relative overflow-hidden"
            >
              {/* BACKGROUND */}
              {active?.type === 'component' && ActiveComp ? (
                <ActiveComp />
              ) : (
                <>
                  <img
                    src={active?.src}
                    alt={active?.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Dim overlay matching how the site uses it */}
                  <div className="absolute inset-0 bg-[#020617]/55" />
                </>
              )}

              {/* Dark overlay only in overlay mode */}
              {active?.type === 'component' && previewMode === 'overlay' && (
                <div className="absolute inset-0 bg-[#020617]/45 pointer-events-none z-10" />
              )}

              {/* Simulated landing page content */}
              {previewMode === 'overlay' && (
                <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-8 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-4"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 rounded-full bg-[#020617]/60 backdrop-blur-sm text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Active Governance System
                    </span>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="text-6xl md:text-8xl font-black text-white tracking-tight mb-4"
                    style={{ textShadow: '0 0 60px rgba(6,182,212,0.25)' }}
                  >
                    Syntrox.ai
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-xl text-slate-300 font-light max-w-lg mb-8"
                  >
                    The Active Governance System for{' '}
                    <span className="text-cyan-400 font-bold font-mono drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]">
                      Autonomous AI.
                    </span>
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.5 }}
                    className="flex gap-4"
                  >
                    <div className="px-8 py-3 border border-blue-500/50 bg-blue-500/10 text-blue-400 font-mono text-xs uppercase tracking-widest">
                      &gt; JOIN_WAITLIST _
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── INFO STRIP ── */}
          <div className="border-t border-white/5 bg-[#020617]/90 backdrop-blur-xl px-6 py-4 flex flex-col md:flex-row gap-4 items-start flex-none">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-sm font-bold text-white truncate">{active?.name}</h2>
                <span
                  className="text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-sm flex-none"
                  style={{ color: active?.tagColor, background: `${active?.tagColor}18`, border: `1px solid ${active?.tagColor}35` }}
                >
                  {active?.tag}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-1">{active?.description}</p>
              <p className="text-[11px] text-slate-500">
                <span className="text-slate-400 font-semibold">Best for: </span>{active?.bestFor}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 flex-none">
              <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Import</p>
              {active?.type === 'component' ? (
                <code className="text-[11px] bg-slate-900 border border-white/5 px-3 py-1.5 rounded text-cyan-400 font-mono whitespace-nowrap">
                  import CircuitBoardBackground from '@/backgrounds/CircuitBoardBackground'
                </code>
              ) : (
                <code className="text-[11px] bg-slate-900 border border-white/5 px-3 py-1.5 rounded text-slate-400 font-mono whitespace-nowrap">
                  url('/backgrounds/{active?.id}.png')
                </code>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
