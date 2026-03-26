import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BRAND_COLORS = {
  blue: '#3b82f6',
  white: '#f1f5f9',
};

// --- EQUATION STYLES ---

const EquationClassic = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
    <span>Syn</span><span style={{ margin: '0 0.25em' }}>=</span><span style={{ marginRight: '0.15em' }}>+</span>
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '0 0.15em' }}>
      <span style={{ fontSize: '1.3em', lineHeight: 1 }}>Σ</span>
      <span style={{ fontSize: '0.45em', marginTop: '-0.1em' }}>i</span>
    </span>
    <span style={{ marginLeft: '0.15em' }}>p<sub style={{ fontSize: '0.5em', verticalAlign: 'bottom', marginLeft: '0.05em' }}>i</sub></span>
    <span style={{ marginLeft: '0.25em', fontStyle: 'italic', fontFamily: 'serif' }}>ℓ<sub style={{ fontSize: '0.5em', verticalAlign: 'bottom', fontStyle: 'normal', fontFamily: '"Space Grotesk", sans-serif', marginLeft: '0.05em' }}>i</sub></span>
  </span>
);

const EquationMinimal = () => (
  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 300, letterSpacing: '-0.05em' }}>
    Syn = Σ p<sub style={{fontSize:'0.6em'}}>i</sub> log(p<sub style={{fontSize:'0.6em'}}>i</sub>)
  </span>
);

const EquationQuantum = () => (
  <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontStyle: 'italic', fontWeight: 600 }}>
    ∇<span style={{fontSize:'0.6em', verticalAlign:'super', marginLeft:'0.25em'}}>2</span>Ψ − (1/c<span style={{fontSize:'0.6em', verticalAlign:'super', marginLeft:'0.25em'}}>2</span>)∂<span style={{fontSize:'0.6em', verticalAlign:'super', marginLeft:'0.25em'}}>2</span>Ψ/∂t<span style={{fontSize:'0.6em', verticalAlign:'super', marginLeft:'0.25em'}}>2</span> = 0
  </span>
);


// --- GLITCH EFFECTS ---

// 1. Cyber Slice (The original one)
const GlitchCyberSlice = ({ children }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <style>{`
      @keyframes g-slice-1 {
        0% { clip-path: inset(10% 0 80% 0); transform: translateX(-3px); }
        20% { clip-path: inset(30% 0 20% 0); transform: translateX(3px); }
        40% { clip-path: inset(70% 0 10% 0); transform: translateX(-2px); }
        60% { clip-path: inset(20% 0 50% 0); transform: translateX(4px); }
        80% { clip-path: inset(50% 0 30% 0); transform: translateX(-4px); }
        100% { clip-path: inset(5% 0 90% 0); transform: translateX(2px); }
      }
      @keyframes g-slice-2 {
        0% { clip-path: inset(80% 0 10% 0); transform: translateX(3px); }
        20% { clip-path: inset(10% 0 60% 0); transform: translateX(-3px); }
        40% { clip-path: inset(40% 0 40% 0); transform: translateX(2px); }
        60% { clip-path: inset(80% 0 5% 0); transform: translateX(-4px); }
        80% { clip-path: inset(15% 0 70% 0); transform: translateX(4px); }
        100% { clip-path: inset(60% 0 20% 0); transform: translateX(-2px); }
      }
    `}</style>
    <div style={{ opacity: 0.9, filter: 'saturate(0) contrast(1.5)', transform: 'skewX(-5deg)' }}>{children}</div>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', color: '#0ff', mixBlendMode: 'screen', animation: 'g-slice-1 0.2s infinite linear alternate-reverse', textShadow: '2px 0 #0ff' }}>{children}</div>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', color: '#f0f', mixBlendMode: 'screen', animation: 'g-slice-2 0.25s infinite linear alternate', textShadow: '-2px 0 #f0f' }}>{children}</div>
  </div>
);

// 2. VCR Distort (Blurry, horizontal scan tracking)
const GlitchVCR = ({ children }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <style>{`
      @keyframes vcr-distort {
        0% { transform: translateX(0) scaleY(1); filter: blur(0px); opacity: 1; }
        10% { transform: translateX(-10px) scaleY(1.2); filter: blur(2px); opacity: 0.8; }
        20% { transform: translateX(10px) scaleY(0.8); filter: blur(4px); opacity: 0.6; }
        30% { transform: translateX(0) scaleY(1); filter: blur(0px); opacity: 1; }
      }
      @keyframes vcr-scan {
        0% { background-position: 0 0; }
        100% { background-position: 0 10px; }
      }
    `}</style>
    <div style={{ animation: 'vcr-distort 0.4s infinite random' }}>
      <div style={{ color: '#fff', textShadow: '3px 0px 0px rgba(0,255,0,0.5), -3px 0px 0px rgba(0,0,255,0.5)' }}>{children}</div>
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.2) 2px, rgba(255,255,255,0.2) 4px)', mixBlendMode: 'overlay', pointerEvents: 'none', animation: 'vcr-scan 0.1s infinite linear' }} />
    </div>
  </div>
);

// 3. RGB Separation (Smooth ghosting text)
const GlitchRGB = ({ children }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <style>{`
      @keyframes rgb-r { 0% { transform: translate(0,0); } 50% { transform: translate(-4px, -2px); } 100% { transform: translate(2px, 2px); } }
      @keyframes rgb-g { 0% { transform: translate(0,0); } 50% { transform: translate(4px, 2px); } 100% { transform: translate(-2px, -2px); } }
      @keyframes rgb-b { 0% { transform: translate(0,0); } 50% { transform: translate(2px, -4px); } 100% { transform: translate(-2px, 4px); } }
    `}</style>
    <div style={{ position: 'relative', color: 'transparent' }}>{children}</div>
    <div style={{ position: 'absolute', top: 0, left: 0, color: '#f00', mixBlendMode: 'screen', animation: 'rgb-r 0.15s infinite alternate' }}>{children}</div>
    <div style={{ position: 'absolute', top: 0, left: 0, color: '#0f0', mixBlendMode: 'screen', animation: 'rgb-g 0.18s infinite alternate-reverse' }}>{children}</div>
    <div style={{ position: 'absolute', top: 0, left: 0, color: '#00f', mixBlendMode: 'screen', animation: 'rgb-b 0.2s infinite alternate' }}>{children}</div>
  </div>
);

// 4. Data Corruption (Blocks disappearing and replacing text)
const GlitchCorruption = ({ children }) => {
  const [chars, setChars] = useState("!<>-_\\\\/[]{}—=+*^?#_012345");
  useEffect(() => {
    const int = setInterval(() => setChars([...chars].sort(() => 0.5 - Math.random()).join("")), 50);
    return () => clearInterval(int);
  }, [chars]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ opacity: Math.random() > 0.5 ? 1 : 0.2 }}>{children}</div>
      {Math.random() > 0.3 && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: BRAND_COLORS.blue, mixBlendMode: 'difference', clipPath: `inset(${Math.random() * 80}% 0 ${Math.random() * 80}% 0)` }} />
      )}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', overflow: 'hidden', color: BRAND_COLORS.white, opacity: 0.5, letterSpacing: '0.2em', clipPath: `inset(0 ${Math.random() * 50}% 0 ${Math.random() * 50}%)` }}>
        {chars.substring(0, 10)}
      </div>
    </div>
  );
};


// 5. Vertical Melt (Jittery vertical slicing)
const GlitchMelt = ({ children }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <style>{`
      @keyframes melt-drop1 {
        0% { clip-path: inset(0 0 0 0); transform: translateY(0); }
        50% { clip-path: inset(30% 0 0 0); transform: translateY(6px); color: #0ff; }
        100% { clip-path: inset(0 0 0 0); transform: translateY(0); }
      }
      @keyframes melt-drop2 {
        0% { clip-path: inset(0 0 0 0); transform: translateY(0); }
        50% { clip-path: inset(0 0 50% 0); transform: translateY(-6px); color: #f0f; }
        100% { clip-path: inset(0 0 0 0); transform: translateY(0); }
      }
    `}</style>
    <div>{children}</div>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', mixBlendMode: 'screen', animation: 'melt-drop1 0.15s infinite alternate' }}>{children}</div>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', mixBlendMode: 'screen', animation: 'melt-drop2 0.2s infinite alternate-reverse' }}>{children}</div>
  </div>
);

// 6. Geometric Fracture (Diagonal split)
const GlitchFracture = ({ children }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <style>{`
      @keyframes fracture-1 {
        0% { transform: translate(0, 0); opacity: 1; }
        50% { transform: translate(-6px, -4px) rotate(-2deg); opacity: 0.8; filter: drop-shadow(4px 4px 0px #f00); }
        100% { transform: translate(0, 0); opacity: 1; }
      }
      @keyframes fracture-2 {
        0% { transform: translate(0, 0); opacity: 1; }
        50% { transform: translate(6px, 4px) rotate(2deg); opacity: 0.8; filter: drop-shadow(-4px -4px 0px #0ff); }
        100% { transform: translate(0, 0); opacity: 1; }
      }
    `}</style>
    <div style={{ opacity: 0 }}>{children}</div>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', color: '#fff', clipPath: 'polygon(0 0, 100% 0, 0 100%)', animation: 'fracture-1 0.12s infinite alternate' }}>{children}</div>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', color: '#fff', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)', animation: 'fracture-2 0.15s infinite alternate-reverse', mixBlendMode: 'screen' }}>{children}</div>
  </div>
);

// 7. CRT Clean Overload (Reverted to the highly-readable glowing skew)
const GlitchCRT = ({ children }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <style>{`
      @keyframes crt-pulse {
        0% { text-shadow: 0 0 5px #fff, 0 0 20px #0ff, 0 0 40px #0ff; transform: scaleX(1); }
        50% { text-shadow: 0 0 5px #fff, 0 0 10px #0ff, 0 0 20px #0ff; transform: scaleX(1.1) skewX(-15deg); color: #e0ffff; filter: contrast(200%); }
        100% { text-shadow: 0 0 5px #fff, 0 0 20px #0ff, 0 0 40px #0ff; transform: scaleX(1); }
      }
    `}</style>
    <div style={{ animation: 'crt-pulse 0.08s infinite', color: '#fff' }}>
      {children}
    </div>
    <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 3px, rgba(0,0,0,0.8) 4px)', pointerEvents: 'none', mixBlendMode: 'multiply' }} />
  </div>
);

// 8. CRT Scanline Sweep
const GlitchCRTSweep = ({ children }) => (
  <div style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', padding: '0 5px' }}>
    <style>{`
      @keyframes crt-sweep {
        0% { top: -20%; }
        100% { top: 120%; }
      }
      @keyframes crt-glow {
        0%, 100% { text-shadow: 0 0 5px #fff, 0 0 10px #0ff; }
        50% { text-shadow: 0 0 5px #fff, 0 0 20px #0ff, 0 0 30px #0ff; }
      }
    `}</style>
    <div style={{ animation: 'crt-glow 2s infinite', color: '#fff' }}>
      {children}
    </div>
    <div style={{ position: 'absolute', left: 0, width: '100%', height: '8px', background: 'rgba(255,255,255,0.9)', boxShadow: '0 0 15px #fff, 0 0 30px #0ff', mixBlendMode: 'overlay', animation: 'crt-sweep 1.5s linear infinite', zIndex: 10 }} />
    <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 3px, rgba(0,0,0,0.5) 4px)', pointerEvents: 'none', mixBlendMode: 'multiply' }} />
  </div>
);

// 9. CRT Quantum Flip
const GlitchCRTFlip = ({ children }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <style>{`
      @keyframes crt-flip {
        0%, 92% { background: transparent; color: #fff; text-shadow: 0 0 5px #fff, 0 0 10px #0ff; filter: invert(0); box-shadow: none; }
        94%, 98% { background: #0ff; color: #000; text-shadow: none; filter: invert(1); box-shadow: 0 0 20px #0ff; }
        100% { background: transparent; color: #fff; text-shadow: 0 0 5px #fff, 0 0 10px #0ff; filter: invert(0); box-shadow: none; }
      }
    `}</style>
    <div style={{ padding: '0 10px', animation: 'crt-flip 4s infinite', borderRadius: '4px' }}>
      {children}
    </div>
    <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 3px, rgba(0,0,0,0.5) 4px)', pointerEvents: 'none', mixBlendMode: 'multiply' }} />
  </div>
);

// 10. CRT Tracking Jitter
const GlitchCRTTracking = ({ children }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <style>{`
      @keyframes crt-track {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-3px); filter: brightness(1.2); }
        20% { transform: translateX(2px); }
        30% { transform: translateX(0); filter: brightness(1); }
        70% { transform: translateX(0); }
        80% { transform: translateX(4px); filter: brightness(1.3); }
        90% { transform: translateX(-2px); }
      }
    `}</style>
    <div style={{ animation: 'crt-track 0.6s infinite', color: '#fff', textShadow: '0 0 5px #fff, 0 0 15px #0ff, 3px 0 0 rgba(255,0,0,0.5), -3px 0 0 rgba(0,0,255,0.5)' }}>
      {children}
    </div>
    <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.6) 3px, rgba(0,0,0,0.6) 4px)', pointerEvents: 'none', mixBlendMode: 'multiply' }} />
  </div>
);


// 11. Clean CRT Corruption (Safe combo of Data Corruption blocks + CRT glow, no noisy chars)
const GlitchCleanCRTCorruption = ({ children }) => {
  const [showBlock, setShowBlock] = useState(false);
  const [blockClip, setBlockClip] = useState('inset(0 0 0 0)');

  useEffect(() => {
    const int = setInterval(() => {
      const shouldShow = Math.random() > 0.6;
      setShowBlock(shouldShow);
      if (shouldShow) {
        setBlockClip(`inset(${Math.random() * 60}% 0 ${Math.random() * 60}% 0)`);
      }
    }, 80);
    return () => clearInterval(int);
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <style>{`
        @keyframes crt-pulse-clean {
          0% { text-shadow: 0 0 5px #fff, 0 0 10px #0ff, 0 0 20px #0ff; }
          50% { text-shadow: 0 0 5px #fff, 0 0 15px #0ff, 0 0 30px #0ff; color: #e0ffff; filter: contrast(150%); }
          100% { text-shadow: 0 0 5px #fff, 0 0 10px #0ff, 0 0 20px #0ff; }
        }
        @keyframes g-slice-h {
          0% { clip-path: inset(10% 0 80% 0); transform: translateX(-4px); }
          20% { clip-path: inset(30% 0 20% 0); transform: translateX(4px); }
          40% { clip-path: inset(70% 0 10% 0); transform: translateX(-3px); }
          60% { clip-path: inset(20% 0 50% 0); transform: translateX(5px); }
          80% { clip-path: inset(50% 0 30% 0); transform: translateX(-5px); }
          100% { clip-path: inset(5% 0 90% 0); transform: translateX(3px); }
        }
      `}</style>
      
      {/* Base CRT layer */}
      <div style={{ animation: 'crt-pulse-clean 0.1s infinite', color: '#fff', opacity: showBlock ? 0.8 : 1 }}>
        {children}
      </div>

      {/* Base Break Slices */}
      {showBlock && (
        <>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', color: '#fff', clipPath: 'inset(10% 0 70% 0)', transform: 'translateX(-4px)', zIndex: 8, pointerEvents: 'none' }}>
            {children}
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', color: '#fff', clipPath: 'inset(60% 0 20% 0)', transform: 'translateX(5px)', zIndex: 8, pointerEvents: 'none' }}>
            {children}
          </div>
          
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', color: '#0ff', mixBlendMode: 'screen', animation: 'g-slice-h 0.2s infinite linear alternate-reverse', textShadow: '2px 0 #0ff', zIndex: 9, pointerEvents: 'none' }}>
            {children}
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', color: '#f0f', mixBlendMode: 'screen', animation: 'g-slice-h 0.25s infinite linear alternate', textShadow: '-2px 0 #f0f', zIndex: 9, pointerEvents: 'none' }}>
            {children}
          </div>
        </>
      )}

      {/* Clean Data Corruption Blocks */}
      {showBlock && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: BRAND_COLORS.blue, mixBlendMode: 'difference', clipPath: blockClip, zIndex: 10, pointerEvents: 'none' }} />
      )}

      {/* Master Scanline Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)', pointerEvents: 'none', mixBlendMode: 'multiply', zIndex: 11 }} />
    </div>
  );
};


// --- PLAYGROUND UI ---

function GlitchDemoCard({ GlitchWrapper, Equation, title, desc }) {
  const [isGlitching, setIsGlitching] = useState(true);

  // Toggle glitch every 2 seconds
  useEffect(() => {
    const int = setInterval(() => setIsGlitching(v => !v), 1500);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-6">
      <div className="h-24 flex items-center justify-center w-full bg-black/50 rounded-lg overflow-hidden border border-slate-800/50">
        <span className="text-4xl text-white font-heading font-bold">
          {isGlitching ? (
            <GlitchWrapper><Equation color="#fff" /></GlitchWrapper>
          ) : (
            <span>SYNTROX<span className="text-blue-500 font-tech text-2xl">.ai</span></span>
          )}
        </span>
      </div>
      <div>
        <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{desc}</p>
      </div>
    </div>
  );
}

export default function GlitchPlayground() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 py-16 px-6 relative">
      <div className="absolute top-6 left-6">
        <a href="/" className="text-blue-400 font-tech text-sm hover:text-white transition-colors border border-blue-500/30 px-4 py-2 rounded uppercase tracking-wider">
          &lt; Back to Site
        </a>
      </div>

      <div className="max-w-6xl mx-auto mt-12">
        <h1 className="text-5xl font-heading font-bold text-white mb-4">Glitch & Math Playground</h1>
        <p className="text-xl text-slate-400 mb-16 max-w-2xl">
          Testing various styling formats for the mathematical equation alongside high-intensity cyberpunk glitch animations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          
          <GlitchDemoCard 
            title="Style A: Cyber Slice + Classic Math"
            desc="The original implementation. Heavy red/cyan chromatic aberration slicing horizontally. Equation uses precise HTML sub/superscripts."
            GlitchWrapper={GlitchCyberSlice}
            Equation={EquationClassic}
          />

          <GlitchDemoCard 
            title="Style B: VCR Scan + Minimalist Math"
            desc="A degraded VHS tape effect with blur and scanlines. Equation uses a monospace simplified formatting."
            GlitchWrapper={GlitchVCR}
            Equation={EquationMinimal}
          />

          <GlitchDemoCard 
            title="Style C: RGB Separation + Quantum Math"
            desc="Smooth, extreme separation of the color channels. Equation is stylized abstractly using symbols."
            GlitchWrapper={GlitchRGB}
            Equation={EquationQuantum}
          />

          <GlitchDemoCard 
            title="Style D: Data Corruption + Classic Math"
            desc="Harsh blue error blocks overlaying the text, combined with randomly scrambling characters underneath."
            GlitchWrapper={GlitchCorruption}
            Equation={EquationClassic}
          />

          <GlitchDemoCard 
            title="Style E (Combined): Data Corruption + Quantum Math"
            desc="The requested combo: Abstract quantum equation paired with heavy blue data block corruption."
            GlitchWrapper={GlitchCorruption}
            Equation={EquationQuantum}
          />

          <GlitchDemoCard 
            title="Style F: Vertical Melt + Quantum Math"
            desc="Stuttering vertical slices displacing up and down wildly, combined with Quantum math."
            GlitchWrapper={GlitchMelt}
            Equation={EquationQuantum}
          />

          <GlitchDemoCard 
            title="Style G: Clean CRT Overload"
            desc="The original clear CRT effect with heavy cyan glowing and skewing."
            GlitchWrapper={GlitchCRT}
            Equation={EquationQuantum}
          />

          <GlitchDemoCard 
            title="Style I: CRT Scanline Sweep"
            desc="A thick, bright scanning laser that continually sweeps downwards over the vibrating glowing text."
            GlitchWrapper={GlitchCRTSweep}
            Equation={EquationQuantum}
          />

          <GlitchDemoCard 
            title="Style J: Quantum Flip"
            desc="The text periodically inverts colors violently (black on cyan) representing a discrete state flip."
            GlitchWrapper={GlitchCRTFlip}
            Equation={EquationQuantum}
          />

          <GlitchDemoCard 
            title="Style K: CRT Tracking Jitter"
            desc="Extremely stable and legible CRT glow with sudden horizontal tracking errors and RGB fringing."
            GlitchWrapper={GlitchCRTTracking}
            Equation={EquationQuantum}
          />

          <GlitchDemoCard 
            title="Style L: Clean CRT Corruption (The Perfect Blend)"
            desc="No noisy characters! Combines clean CRT tracking with rapid blue Data Corruption blocks shifting opacity naturally."
            GlitchWrapper={GlitchCleanCRTCorruption}
            Equation={EquationQuantum}
          />

          <GlitchDemoCard 
            title="Style H: Geometric Fracture + Quantum Math"
            desc="Diagonal clipping paths tear the equation directly in half, pulling the shards apart with a 3D shadow."
            GlitchWrapper={GlitchFracture}
            Equation={EquationQuantum}
          />

        </div>
      </div>
    </div>
  );
}
