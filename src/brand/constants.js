// ─── Syntrox.ai Brand Constants ───────────────────────────────────────────────

// ─── Colors ──────────────────────────────────────────────────────────────────

export const BRAND_COLORS = {
  blue: '#3b82f6',
  cyan: '#22d3ee',
  white: '#ffffff',
  dark: '#020617',
  muted: '#64748b',
  glow: 'rgba(59,130,246,0.3)',
  particle: '#475569',
  threat: '#ef4444',
};

// ─── Hexagon Geometry ────────────────────────────────────────────────────────
// Flat-top hexagon: vertices rotated 30° so a flat edge sits on top.
// Center at (50, 50), circumradius R = 35, inside a padded viewBox.

const R = 35;
const CX = 50;
const CY = 50;

export const HEX_CENTER = { x: CX, y: CY };
export const HEX_RADIUS = R;
export const HEX_VIEWBOX = '-5 -5 110 110';

// Generate 6 vertices for a flat-top regular hexagon
export const HEX_VERTICES = Array.from({ length: 6 }, (_, i) => {
  const angleDeg = 30 + 60 * i;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: +(CX + R * Math.cos(angleRad)).toFixed(2),
    y: +(CY + R * Math.sin(angleRad)).toFixed(2),
  };
});

// SVG path string for the hex
export const HEX_PATH = HEX_VERTICES
  .map((v, i) => `${i === 0 ? 'M' : 'L'} ${v.x},${v.y}`)
  .join(' ') + ' Z';

// Inner hex: pointy-top, smaller radius for depth layer
const IR = 18;
export const INNER_HEX_VERTICES = Array.from({ length: 6 }, (_, i) => {
  const angleDeg = 60 * i; // pointy-top
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: +(CX + IR * Math.cos(angleRad)).toFixed(2),
    y: +(CY + IR * Math.sin(angleRad)).toFixed(2),
  };
});

export const INNER_HEX_PATH = INNER_HEX_VERTICES
  .map((v, i) => `${i === 0 ? 'M' : 'L'} ${v.x},${v.y}`)
  .join(' ') + ' Z';

// ─── Chaos: scattered start positions for 6 vertex dots ──────────────────────

export const CHAOS_POSITIONS = [
  { x: 15, y: 20 },
  { x: 82, y: 12 },
  { x: 8,  y: 72 },
  { x: 88, y: 65 },
  { x: 35, y: 90 },
  { x: 70, y: 40 },
];

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const SIZES = {
  sm:   { mark: 32,  font: 14, gap: 8  },
  md:   { mark: 48,  font: 20, gap: 10 },
  lg:   { mark: 80,  font: 34, gap: 14 },
  xl:   { mark: 120, font: 50, gap: 18 },
  hero: { mark: 200, font: 80, gap: 24 },
};
