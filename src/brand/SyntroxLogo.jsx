import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SyntroxMark from './SyntroxMark';
import SyntroxWordmark from './SyntroxWordmark';
import { SIZES, BRAND_COLORS } from './constants';

/**
 * Composed Syntrox logo — mark + wordmark with coordinated animation.
 *
 * @param {string}   size      - "sm" | "md" | "lg" | "xl" | "hero"
 * @param {string}   variant   - "mark" | "wordmark" | "full"
 * @param {boolean}  animate   - Play intro animation (false = static)
 * @param {string}   color     - "blue" | "white" | "dark"
 * @param {Function} onAnimationComplete
 * @param {string}   className
 */
export default function SyntroxLogo({
  size = 'md',
  variant = 'full',
  animate = true,
  color = 'white',
  paused = false,
  onAnimationComplete,
  className = '',
}) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const shouldAnimate = animate && !prefersReduced;
  const [markReady, setMarkReady] = useState(!shouldAnimate);

  const dims = SIZES[size] || SIZES.md;

  const colorMap = {
    blue: BRAND_COLORS.blue,
    white: BRAND_COLORS.white,
    dark: BRAND_COLORS.dark,
  };
  const resolvedColor = colorMap[color] || BRAND_COLORS.white;

  const showMark = variant === 'mark' || variant === 'full';
  const showText = variant === 'wordmark' || variant === 'full';
  const isHero = size === 'hero';

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: isHero ? 'column' : 'row',
        alignItems: 'center',
        gap: isHero ? dims.gap * 1.5 : dims.gap,
        userSelect: 'none',
      }}
    >
      {showMark && (
        <SyntroxMark
          size={dims.mark}
          color={resolvedColor}
          animate={shouldAnimate}
          onReady={() => {
            setMarkReady(true);
            onAnimationComplete?.();
          }}
        />
      )}

      {showText && (
        <motion.div
          initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
          animate={markReady || !shouldAnimate ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          <SyntroxWordmark
            fontSize={dims.font}
            color={resolvedColor}
            animate={shouldAnimate}
            show={markReady || !shouldAnimate}
            delay={0}
            paused={paused}
          />
        </motion.div>
      )}
    </div>
  );
}
