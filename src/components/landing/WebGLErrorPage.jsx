import React from 'react';
import { motion } from 'framer-motion';
import SyntroxLogo from '../../brand/SyntroxLogo';

const steps = [
  {
    id: '01',
    title: 'Disable Brave Shields for this site',
    desc: 'Click the orange lion icon in the address bar and toggle Shields off.',
    icon: '🛡',
  },
  {
    id: '02',
    title: 'Enable hardware acceleration',
    desc: 'Go to brave://settings/system and turn on "Use hardware acceleration when available". Restart Brave.',
    icon: '⚙',
  },
  {
    id: '03',
    title: 'Update your GPU drivers',
    desc: 'Outdated display drivers on Windows can prevent WebGL from starting.',
    icon: '⬆',
  },
  {
    id: '04',
    title: 'Try a different browser',
    desc: 'Chrome, Edge, and Firefox all support this page without any configuration.',
    icon: '🌐',
  },
];

const HexDot = ({ style }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" style={style}>
    <polygon
      points="5,0 9.33,2.5 9.33,7.5 5,10 0.67,7.5 0.67,2.5"
      fill="none"
      stroke="rgba(59,130,246,0.35)"
      strokeWidth="1"
    />
  </svg>
);

export default function WebGLErrorPage({ onDismiss }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#020617',
        color: '#fff',
        fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid background */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative hex dots */}
      {[
        { top: '12%', left: '8%' },
        { top: '20%', right: '10%' },
        { bottom: '18%', left: '12%' },
        { bottom: '14%', right: '8%' },
      ].map((s, i) => (
        <HexDot key={i} style={{ position: 'absolute', opacity: 0.6, ...s }} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '560px' }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <SyntroxLogo size="md" variant="full" animate={false} color="white" />
        </div>

        {/* Status badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 14px',
              borderRadius: '4px',
              border: '1px solid rgba(239,68,68,0.3)',
              background: 'rgba(239,68,68,0.08)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#f87171',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#ef4444',
                display: 'inline-block',
                boxShadow: '0 0 6px #ef4444',
              }}
            />
            WebGL Unavailable
          </div>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(22px, 5vw, 30px)',
            fontWeight: 700,
            color: '#fff',
            textAlign: 'center',
            marginBottom: '14px',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          3D rendering isn't available
          <br />
          <span style={{ color: '#3b82f6' }}>in this browser</span>
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            color: '#64748b',
            textAlign: 'center',
            lineHeight: 1.6,
            marginBottom: '40px',
          }}
        >
          Syntrox uses WebGL for 3D visualizations. Brave on desktop sometimes
          blocks or fails to initialize it. Here's how to fix it.
        </p>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)',
            marginBottom: '32px',
          }}
        />

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '16px 18px',
                borderRadius: '8px',
                background: 'rgba(15,23,42,0.8)',
                border: '1px solid rgba(59,130,246,0.12)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Step number */}
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: '#3b82f6',
                  letterSpacing: '1px',
                  paddingTop: '2px',
                  minWidth: '24px',
                  opacity: 0.7,
                }}
              >
                {step.id}
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#e2e8f0',
                    marginBottom: '4px',
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: '#475569',
                    lineHeight: 1.55,
                  }}
                >
                  {step.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://www.google.com/chrome/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 24px',
              borderRadius: '6px',
              background: '#3b82f6',
              color: '#fff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#2563eb')}
            onMouseLeave={e => (e.currentTarget.style.background = '#3b82f6')}
          >
            Open in Chrome
          </a>

          {onDismiss && (
            <button
              onClick={onDismiss}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 24px',
                borderRadius: '6px',
                background: 'transparent',
                border: '1px solid rgba(59,130,246,0.3)',
                color: '#94a3b8',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                letterSpacing: '0.01em',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.6)';
                e.currentTarget.style.color = '#e2e8f0';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              Continue anyway
            </button>
          )}
        </div>

        {/* Footer note */}
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: '#1e3a5f',
            textAlign: 'center',
            marginTop: '36px',
            letterSpacing: '1px',
          }}
        >
          SYNTROX.IO · WEBGL ERROR · BRAVE DESKTOP
        </p>
      </motion.div>
    </div>
  );
}
