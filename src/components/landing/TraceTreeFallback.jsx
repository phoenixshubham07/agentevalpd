import React from 'react';

export default function TraceTreeFallback() {
  return (
    <div
      style={{
        height: '540px',
        width: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'relative', width: '384px', height: '384px' }}>
        {/* Outer ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '9999px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            animation: 'spin 10s linear infinite',
          }}
        />
        {/* Middle ring */}
        <div
          style={{
            position: 'absolute',
            inset: '16px',
            borderRadius: '9999px',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            animation: 'spin 15s linear infinite reverse',
          }}
        />
        {/* Inner ring */}
        <div
          style={{
            position: 'absolute',
            inset: '32px',
            borderRadius: '9999px',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            animation: 'spin 20s linear infinite',
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.1), rgba(6, 78, 59, 0.1))',
            filter: 'blur(40px)',
          }}
        />

        {/* Center label */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#64748b',
            }}
          >
            SYNTROX
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '18px',
              fontWeight: 600,
              color: '#e2e8f0',
            }}
          >
            Governance Layer
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: '#475569',
              textAlign: 'center',
              maxWidth: '240px',
              lineHeight: 1.5,
            }}
          >
            Real-time trace interception &amp; AI shield enforcement
          </div>
          <div
            style={{
              marginTop: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '4px',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              background: 'rgba(34, 197, 94, 0.08)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#4ade80',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                display: 'inline-block',
                boxShadow: '0 0 6px #22c55e',
              }}
            />
            Active
          </div>
        </div>
      </div>

      {/* Keyframe for spin (inline style fallback) */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
