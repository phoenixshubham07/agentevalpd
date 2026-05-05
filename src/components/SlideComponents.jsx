import React from 'react';
import SyntroxWordmark from '../brand/SyntroxWordmark';

// Every slide: consistent padding so all titles start at the same Y position
export const Slide = ({ children, className = "" }) => (
  <div className={`w-full h-full px-14 pt-14 pb-10 relative overflow-hidden flex flex-col ${className}`}>
    {/* Syntrox wordmark — top-left, every slide, pure static text logo, no animated mark */}
    <div className="absolute top-5 left-8 z-50">
      <SyntroxWordmark fontSize={20} animate={false} color="#ffffff" />
    </div>
    {children}
  </div>
);

// SlideHeader: landing-page blue accent
export const SlideHeader = ({ title, subtitle }) => (
  <div className="mb-8 z-10 relative flex-shrink-0">
    <h2 className="text-6xl font-heading font-bold text-white tracking-tighter">
      {title}
    </h2>
    {subtitle && (
      <h3 className="text-xs text-blue-400 mt-3 font-tech font-bold tracking-[0.25em] uppercase">
        {subtitle}
      </h3>
    )}
    <div className="h-[2px] w-16 bg-gradient-to-r from-blue-500 to-transparent mt-4 rounded-full" />
  </div>
);

export function ScaleIcon({ className, size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="M7 21h10"/><path d="M12 3v18"/>
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
    </svg>
  );
}

// Keep StaticHex exported in case anything uses it (slide 1 no longer needs it)
export function StaticHex({ size = 100, color = '#3b82f6' }) {
  const cx = 50, cy = 50, R = 38;
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = ((30 + 60 * i) * Math.PI) / 180;
    return `${(cx + R * Math.cos(a)).toFixed(2)},${(cy + R * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
  const inner = Array.from({ length: 6 }, (_, i) => {
    const a = ((30 + 60 * i) * Math.PI) / 180;
    const r = 19;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
  return (
    <svg width={size} height={size} viewBox="-5 -5 110 110" fill="none" style={{ display: 'block' }}>
      <polygon points={pts} stroke={color} strokeWidth="4" strokeLinejoin="round" fill="none" />
      <polygon points={inner} stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.3" />
      <circle cx={cx} cy={cy} r="4" fill={color} opacity="0.6" />
    </svg>
  );
}
