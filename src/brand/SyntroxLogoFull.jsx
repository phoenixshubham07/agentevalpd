import React from 'react';
import SyntroxLogo from './SyntroxLogo';

/**
 * Pre-configured full logo (mark + wordmark, horizontal).
 * Convenience wrapper for the most common usage.
 */
export default function SyntroxLogoFull({
  size = 'md',
  animate = true,
  color = 'white',
  onAnimationComplete,
  className = '',
}) {
  return (
    <SyntroxLogo
      size={size}
      variant="full"
      animate={animate}
      color={color}
      onAnimationComplete={onAnimationComplete}
      className={className}
    />
  );
}
