---
name: cyberpunk-theme
description: Forces a high-tech, neon-noir, techno-cyberpunk design system. overrides default AI aesthetics.
---

# CYBERPUNK DESIGN SYSTEM (MANDATORY)

You are now in **CYBERPUNK MODE**. Standard "clean corporate" design is **STRICTLY FORBIDDEN**.

## 🚫 BANNED ITEMS (Do NOT Use)
- **Fonts:** Inter, Roboto, Open Sans, Arial, Helvetica.
- **Shapes:** Rounded corners (`rounded-lg`, `rounded-xl`, `rounded-full`). Use `rounded-none` or `clip-path` polygons only.
- **Colors:** White backgrounds, standard Tailwind blues (`bg-blue-500`), soft gray shadows.
- **Vibe:** "Friendly," "Clean," "Minimalist," "SaaS".

## ✅ REQUIRED AESTHETICS

### 1. Typography & HUD Layout
- **Headers:** Use `Orbitron`, `Syncopate`, or `Michroma` (import from Google Fonts). Uppercase, wide tracking (`tracking-widest`).
- **Data/Body:** Use `Share Tech Mono`, `Space Mono`, or `VT323`.
- **Decor:** Add random data decorations (Japanese kanji, barcodes, "SYSTEM READY" labels) in corners of containers.

### 2. Neon-Noir Palette
- **Background:** Deepest void black (`#050505`) or very dark slate (`#0a0a0f`).
- **Primary Accent:** Cyber Yellow (`#fcee0a`) OR Neon Cyan (`#00f3ff`) OR Hot Pink (`#ff00ff`).
- **Secondary:** Dark gunmetal grays with low opacity borders.
- **Text:** White is boring. Use off-white (`#e0e0e0`) or tint it slightly with the primary color.

### 3. UI Components (The "Glitch" Look)
- **Borders:** 1px solid borders are too safe. Use double lines, corner accents (brackets), or dashed lines.
- **Effects:** 
  - **Glow:** `box-shadow: 0 0 10px var(--neon-color), 0 0 20px var(--neon-color);`
  - **Scanlines:** Overlay a repeating linear gradient to simulate CRT screens.
  - **Glitch:** Add CSS keyframe animations that skew/translate elements on hover.
- **Buttons:** Skewed rectangles (`transform: skewX(-20deg)`).

## 4. CSS Implementation Rules
- Use `backdrop-filter: blur(4px)` for glass panels, but keep them dark.
- Use `mix-blend-mode: screen` for glowing overlays.
- Add a global "noise" texture overlay at 5% opacity.

## 5. Tone
- Aggressive, high-contrast, industrial, "High Tech Low Life."
- The design should have visual tension.
- The design should feel like it's from a dystopian future, not a polished corporate product.
## Final Notes
- Always prioritize the cyberpunk aesthetic over conventional design principles.
