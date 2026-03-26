import React, { useState } from 'react';
import SyntroxLogo from './SyntroxLogo';
import SyntroxMark from './SyntroxMark';
import { BRAND_COLORS } from './constants';

const label = (text) => ({
  color: BRAND_COLORS.muted,
  fontSize: 11,
  fontFamily: '"JetBrains Mono", monospace',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  marginBottom: 32,
  textAlign: 'center',
});

export default function BrandShowcase() {
  const [markKey, setMarkKey] = useState(0);
  const [logoKey, setLogoKey] = useState(0);
  const [logoPaused, setLogoPaused] = useState(false);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: BRAND_COLORS.dark,
        color: BRAND_COLORS.white,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 100,
        padding: '100px 24px',
        fontFamily: '"Space Grotesk", sans-serif',
      }}
    >
      {/* ── 1. THE LIVING HEXAGON (standalone mark) ──────────────── */}
      <section style={{ textAlign: 'center' }}>
        <p style={label()}>The Living Hexagon — Standalone Mark</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <SyntroxMark key={markKey} size={240} color={BRAND_COLORS.white} animate={true} />
          <button onClick={() => setMarkKey(k => k + 1)} style={btnStyle}>
            Replay
          </button>
        </div>
      </section>

      <Divider />

      {/* ── 2. ANIMATED FULL LOGO ────────────────────────────────── */}
      <section style={{ textAlign: 'center' }}>
        <p style={label()}>Animated Full Logo — Hero Size</p>
        <SyntroxLogo key={logoKey} size="hero" variant="full" animate={true} color="white" paused={logoPaused} />
        <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
          <button
            onClick={() => setLogoPaused(p => !p)}
            style={{ ...btnStyle, borderColor: logoPaused ? `${BRAND_COLORS.blue}99` : `${BRAND_COLORS.blue}40`,
              color: logoPaused ? BRAND_COLORS.blue : BRAND_COLORS.muted }}
          >
            {logoPaused ? 'Resume' : 'Pause'}
          </button>
          <button onClick={() => { setLogoPaused(false); setLogoKey(k => k + 1); }} style={btnStyle}>
            Replay
          </button>
        </div>
      </section>

      <Divider />

      {/* ── 3. STATIC MARK SIZES ─────────────────────────────────── */}
      <section style={{ textAlign: 'center' }}>
        <p style={label()}>Static Mark — All Sizes (living idle)</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['xl', 'lg', 'md', 'sm'].map(sz => (
            <div key={sz} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <SyntroxLogo size={sz} variant="mark" animate={false} color="white" />
              <span style={{ color: BRAND_COLORS.muted, fontSize: 10, fontFamily: '"JetBrains Mono", monospace' }}>{sz}</span>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── 4. STATIC FULL LOGOS ──────────────────────────────────── */}
      <section style={{ textAlign: 'center' }}>
        <p style={label()}>Static Full Logo — All Sizes</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
          {['xl', 'lg', 'md', 'sm'].map(sz => (
            <div key={sz} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ color: BRAND_COLORS.muted, fontSize: 10, fontFamily: '"JetBrains Mono", monospace', width: 28, textAlign: 'right' }}>{sz}</span>
              <SyntroxLogo size={sz} variant="full" animate={false} color="white" />
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── 5. WORDMARK ONLY ─────────────────────────────────────── */}
      <section style={{ textAlign: 'center' }}>
        <p style={label()}>Wordmark Only</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          {['xl', 'lg', 'md', 'sm'].map(sz => (
            <SyntroxLogo key={sz} size={sz} variant="wordmark" animate={false} color="white" />
          ))}
        </div>
      </section>

      <Divider />

      {/* ── 6. COLOR VARIANT ─────────────────────────────────────── */}
      <section style={{ textAlign: 'center' }}>
        <p style={label()}>Blue Variant</p>
        <SyntroxLogo size="lg" variant="full" animate={false} color="blue" />
      </section>
    </div>
  );
}

function Divider() {
  return <div style={{ width: 120, height: 1, background: `${BRAND_COLORS.white}08` }} />;
}

const btnStyle = {
  padding: '8px 20px',
  background: 'transparent',
  border: `1px solid ${BRAND_COLORS.blue}40`,
  color: BRAND_COLORS.blue,
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 11,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  transition: 'border-color 0.2s',
};
