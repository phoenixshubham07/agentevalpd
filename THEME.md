# Syntrox.ai — Design System & Theme Guide

## Overview
Syntrox.ai is a **cyberpunk-inspired AI governance platform** with a **dark, tech-forward aesthetic**. The design emphasizes **precision, trust, and cutting-edge technology** through a carefully curated color palette, geometric logo, and cinematic animations.

---

## 1. Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| **Dark Background** | `#020617` | Main page background, dark void |
| **Blue (Primary)** | `#3b82f6` | CTA buttons, accents, primary UI elements |
| **Cyan (Secondary)** | `#22d3ee` | Secondary accents, glow effects, circuit lines |
| **White** | `#ffffff` | Text, UI elements, high contrast |
| **Muted Gray** | `#64748b` | Body text, labels, secondary information |
| **Threat Red** | `#ef4444` | Warnings, alerts, danger states |

### Effects & Overlays
- **Blue Glow** — `rgba(59,130,246,0.3)` — Used for soft glows, halos, and depth
- **Particle Subtle** — `#475569` — For fine details, grid patterns, borders
- **Dark Overlays** — `rgba(0,0,0,0.6–0.9)` — Depth, vignettes, layering

### Gradient Usage
- **Hero Gradient** — `from-amber-300 via-yellow-200 to-amber-400` — Premium text (headings, CTA)
- **Blue-to-Violet** — `from-blue-600 to-violet-500` — Accent gradients, premium borders
- **Dark-to-Transparent** — `from-[#020617]/80 to-transparent` — Fade overlays

---

## 2. Typography

### Font Stack

| Use Case | Font | Weight | Notes |
|----------|------|--------|-------|
| **Headings** | Space Grotesk | 600–700 (Bold) | Tech-forward, geometric, modern |
| **Body Text** | Inter | 400–500 (Regular) | Clean, readable, high legibility |
| **Technical/Code** | JetBrains Mono | 400–600 | Monospace, ASCII art, terminal styling |
| **Cursive Signature** | Great Vibes | 400 | Elegant, hand-written feel for brand signature |

### Type Scale

#### Headings
- **H1** — 3.5rem–6rem (clamp) — Main page titles, splash screen
- **H2** — 2rem–3.5rem — Section headings, feature titles
- **H3** — 1.5rem–2.5rem — Subsection headings
- **Label/Tag** — 0.625rem–0.75rem (10–12px) — Uppercase, tracking 0.15em

#### Body
- **Large** — 1.125rem–1.25rem (18–20px) — Lead paragraphs
- **Regular** — 1rem (16px) — Body text, descriptions
- **Small** — 0.875rem–0.75rem (14–12px) — Captions, muted text

### Line Height
- **Tight** — 1.2 — Headings
- **Normal** — 1.5 — Body text
- **Relaxed** — 1.7–1.8 — Long-form content

### Letter Spacing
- **Headings** — `tracking-tight` (−0.02em)
- **Body** — Normal or `tracking-wide` (0.025em)
- **Uppercase Labels** — `tracking-widest` (0.15em)
- **Tech/Code** — `tracking-wide` (0.05em)

---

## 3. The Logo: Syntrox Mark

### Logo Overview
The **Syntrox Mark** is a **living hexagon** — a flat-top regular hexagon with an inner concentric hexagon, animated with oscillating motion and morphing effects. It represents **governance**, **precision**, and **living systems**.

### Logo Specifications

| Property | Value |
|----------|-------|
| **Shape** | Flat-top regular hexagon (6 vertices) |
| **Circumradius** | 35 units (in 100×100 viewBox) |
| **Center** | (50, 50) |
| **Inner Hexagon** | Pointy-top, radius 18 (depth layer) |
| **Stroke Width** | 2–3px (varies by size) |
| **Color** | `#3b82f6` (Blue) or `#ffffff` (White) |
| **Animation** | Idle oscillation, vertex dots scatter → converge |

### Animations
1. **Idle Loop** — Continuous subtle oscillation of the mark outline
2. **Intro Sequence** — Splash screen: vertices scatter, then converge with glow effect (~3s total)
3. **Hover/Focus** — Scale up 1.05, glow intensifies

### Sizes
- **sm** (32px) — Navigation, small UI
- **md** (48px) — Cards, medium contexts
- **lg** (80px) — Section headers
- **xl** (120px) — Large display, featured
- **hero** (200px) — Splash screen, full page hero

### Usage Rules
- Always pair with **breathing space** — don't crowd adjacent elements
- On dark backgrounds: use **white or cyan**
- On light backgrounds: use **blue or dark navy**
- In animations: use **glow effects** (`drop-shadow`, `blur`) to emphasize motion

---

## 4. Design Principles

### Visual Hierarchy
1. **Dark void as foundation** — Deep navy/black (#020617) creates trust and focus
2. **Bright accents pop** — Blue, cyan, and white draw attention
3. **Gradients for premium feel** — Amber/gold highlights key CTAs
4. **Subtle depth** — Blur, shadows, and nested layers (no flat design)

### Motion & Animation
- **Cinematic pacing** — Animations feel **slow, deliberate, cinematic** (not snappy)
- **Easing curves** — Favor ease-out and ease-in-out for smoothness
- **Scroll triggers** — Elements animate **on viewport entry** (scroll-triggered, not auto-play)
- **Glow effects** — Heavy use of `box-shadow: 0 0 Xpx rgba(...)` for depth

### Spacing & Layout
- **Generous padding** — 16px–32px minimum on sections
- **Max-width containers** — 7xl (80rem / 1280px) for text
- **Grid alignment** — 8px baseline grid for rhythm
- **Breathing room** — Don't pack elements; use whitespace strategically

### Components Style
- **Glassmorphism** — Semi-transparent backgrounds with `backdrop-blur`
- **Rounded corners** — `rounded-2xl` to `rounded-3xl` for cards (24–32px radius)
- **Borders** — Subtle `border-white/10` or `border-blue/20` on light cards
- **Shadows** — Soft, layered shadows: `0 0 60px rgba(...)`

---

## 5. Implementation Details

### CSS/Tailwind Utilities
```
# Colors (Tailwind extend)
text-white, text-slate-200, text-slate-300
bg-[#020617], bg-slate-900/60, bg-[#0a0800]

# Typography (Tailwind extend)
font-heading (Space Grotesk), font-body (Inter), font-tech (JetBrains Mono)

# Spacing
gap-6, gap-8, gap-12, p-6, px-12, py-16

# Shadows & Effects
drop-shadow-[0_0_8px_rgba(...)]
shadow-[0_0_120px_rgba(...)]
blur-[80px]

# Animations
animate-pulse, animate-spin, custom @keyframes
```

### Framer Motion Usage
- `useInView` with `margin: "-50px"` for scroll-triggered animations
- `clipPath` for text reveals (left-to-right wipes)
- `pathLength` for SVG stroke animations
- Custom easing: `[0.16, 1, 0.3, 1]` for cinematic curves

---

## 6. Component Guidelines

### Buttons
- **Primary CTA** — Blue gradient background, white text, hover scale 1.05 + glow
- **Secondary** — Transparent with border, hover border brightens
- **Styling** — `rounded-full`, `px-8 py-4`, mono font for labels

### Premium Feature Cards (ScrollStack Style)
These cards are the main showpiece of the landing page. Each has a unique accent color that defines its entire look.

**Structure:**
- **Background** — Deep dark gradient: `linear-gradient(135deg, rgba(15,23,42,0.95), rgba(11,17,32,0.98))`
- **Border** — Subtle base border `border-slate-700/60`, animated gradient border on hover
- **Base Height** — 280px–320px (responsive)
- **Spacing** — `p-8` to `p-12` (horizontal), `gap-8` flex layout with icon + text

**Accent Colors Per Card:**
| Card | Title | Color | Gradient | Border | Glow |
|------|-------|-------|----------|--------|------|
| 1 | Real-Time Agent Visibility | `#3b82f6` (Blue) | `from-blue-500/20 to-cyan-500/10` | `border-blue-500/50` | `rgba(59,130,246,0.4)` |
| 2 | Autonomous Data Redaction | `#06b6d4` (Cyan) | `from-cyan-500/20 to-blue-500/10` | `border-cyan-500/50` | `rgba(6,182,212,0.4)` |
| 3 | Asynchronous Truth-Grounding | `#f43f5e` (Rose) | `from-rose-500/20 to-pink-500/10` | `border-rose-500/50` | `rgba(244,63,94,0.4)` |

**Hover Effects:**
1. **Rotating gradient border** — Conic gradient spins around card edge (6s rotation, initiated on hover)
2. **Glow overlay** — Gradient background fade-in with accent color (opacity 0→100%, 700ms)
3. **Radial glow** — Large blurred circle behind icon (opacity 0→100%, blur 70px)
4. **Icon box glow** — 40px `box-shadow` with accent color on icon container
5. **Border brightening** — Hover border opacity increases

**Icon Container:**
- **Size** — 64px–112px (responsive: `w-16 h-16` → `w-28 h-28`)
- **Background** — Semi-transparent accent: `${color}10`
- **Border** — `${color}30`
- **Rotation** — 3° by default (`lg:rotate-3`), resets to 0° on hover
- **Glow** — Large radial glow on hover (blur 70px, opacity 100%)

**Cyberpunk Details:**
- **Corner accents** — Top-left and top-right: small `border-t-2 border-l/r-2` angled corners
- **Feature tag** — Top-right: monospace text, opacity 30% (→60% on hover), e.g., "01", "02", "03"
- **Connection lines** — Animated SVG paths connecting card to vertical roadmap (pathLength animation, 1s duration)

**Text Styling:**
- **Title** — Large, bold, `font-heading`, accent color text
- **Description** — Slate gray body text, segments highlighted in white with font-medium
- **Icon** — 24px lucide icon, accent color

### Kill Switch (Emergency Controls Demo)
An interactive dashboard demonstrating fleet control with a centerpiece large red button.

**Structure:**
- **Top Bar** — Status indicator badge showing "FLEET ACTIVE" or "FLEET HALTED"
- **Left Panel** — Metrics display (Active Agents, Requests/Sec, Risk Score) in small card grid
- **Center** — Large 160px circular button with Power icon
- **Locked Overlay** — Red-tinted vignette when engaged

**Status States:**

| State | Button | Metrics | Overlay | Badge |
|-------|--------|---------|---------|-------|
| **Active** | Red gradient (`from-[#b91c1c] to-[#7f1d1d]`), border `#ef4444`, scale 100% | Show numbers, color normal | None | Green: "FLEET ACTIVE" |
| **Locked** | Slate dark, border `#64748b`, scale 95% | Animate to 0, risk = "CRITICAL" | Red tint, red crosshair lines, grayscale | Red: "FLEET HALTED" |

**Button Details:**
- **Size** — 160px diameter circle
- **Border** — 6px, color-coded (red active, slate locked)
- **Shadow** — Base: `0 0 60px rgba(0,0,0,0.8)`; hover: `0 0 100px rgba(220,38,38,0.5)`
- **Icon** — Power symbol (24px), centered, pulsing on hover (active state only)
- **Label** — "KILL SWITCH" or "RESET", uppercase, font-heading, tight tracking
- **Hover** — Scale 1.05 + enhanced glow (active only)

**Metric Cards:**
- **Background** — `bg-slate-900/40` with `backdrop-blur-sm`
- **Border** — `border-slate-800`, transitions to brighter on hover
- **Icon** — Monospace label (10px, uppercase, tracking-widest)
- **Number** — Large (4xl) bold number, animated on scroll (0→actual value over 1.5s)
- **Color** — White (Agents), blue (Requests), green/red (Risk Score)

**Locked State Effects:**
1. **Global overlay** — Red-tinted semi-transparent vignette
2. **Crosshair** — Horizontal and vertical red lines through center with glow
3. **Grayscale wash** — Slight desaturation (backdrop-grayscale-50%)
4. **Warning banner** — "⚠ 503 SERVICE PAUSED" with red border, bouncing animation
5. **Number animation** — All metrics count down to 0 in 1.5s

**Text Styling:**
- **Title** — "Emergency Controls", font-heading, semibold
- **Subtitle** — "Level 3 Governance Protocol", monospace, tiny, gray
- **Badge** — Bold, uppercase, monospace, with pinging status dot

### Backgrounds
- **Hero sections** — Dark void + subtle radial gradients (nebula effect)
- **Card backgrounds** — Layered: dark base + blue radial overlay + grain texture
- **Vignettes** — Dark `radial-gradient` at edges for depth

---

## 7. Quick Reference: Key Values

```javascript
// Colors
BRAND_COLORS = {
  blue: '#3b82f6',
  cyan: '#22d3ee',
  white: '#ffffff',
  dark: '#020617',
  muted: '#64748b',
  glow: 'rgba(59,130,246,0.3)',
  threat: '#ef4444',
}

// Feature Card Accent Colors
FEATURE_ACCENTS = {
  blue: '#3b82f6',      // Real-Time Agent Visibility
  cyan: '#06b6d4',      // Autonomous Data Redaction
  rose: '#f43f5e',      // Asynchronous Truth-Grounding
  amber: '#f59e0b',     // High-IOPS Hybrid Telemetry
}

// Fonts
fontFamily: {
  heading: 'Space Grotesk',
  body: 'Inter',
  tech: 'JetBrains Mono',
}

// Sizes (mark)
32px (sm), 48px (md), 80px (lg), 120px (xl), 200px (hero)

// Timing
Animations: 1.2s–3.5s (cinematic, not snappy)
Easing: [0.16, 1, 0.3, 1] (smooth cubic)
```

---

## 8. Usage Notes for MVP Reshaping

When adapting the MVP frontend to match Syntrox theme:

1. **Replace all backgrounds** with `#020617` or dark navy
2. **Recolor buttons** to blue (`#3b82f6`) with white text
3. **Switch fonts** to Space Grotesk (headings), Inter (body)
4. **Add glow effects** to key UI elements using `box-shadow`
5. **Slow down animations** — they should feel cinematic, not frantic
6. **Implement the hexagon mark** as a logo/icon where appropriate
7. **Use generous spacing** and avoid cluttered layouts
8. **Add glassmorphism** to cards/overlays with `backdrop-blur`
9. **Highlight CTAs** with amber/gold gradients
10. **Test in dark mode only** — this is a dark-first design

---

**Last Updated:** March 28, 2026
**Version:** 1.0
