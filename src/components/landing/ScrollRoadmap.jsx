import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollRoadmap() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [windowSize, setWindowSize] = useState({ width: 1000, height: 2000 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    // Also trigger after a bit to let layout settle
    const to = setTimeout(handleResize, 1000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(to);
    };
  }, []);

  const isDesktop = windowSize.width >= 768; // md breakpoint

  // We draw fixed SVGs covering the entire page height.
  // The path starts at top center (Hero)
  // Drops to Problem section
  // Splits into 3 lines
  // Runs down through the rest of the page

  const centerX = windowSize.width / 2;
  const leftX = isDesktop ? windowSize.width * 0.2 : 40;
  const rightX = isDesktop ? windowSize.width * 0.8 : windowSize.width - 40;

  // Approximate section Y coordinates based on viewport heights
  const heroBottom = 800; 
  const problemTop = 1000;
  const cardsY = 1300;
  const section1Y = 2200; // Trust But Verify
  const section2Y = 3000; // Full X-Ray
  const section3Y = 3800; // Kill Switch

  // SVG Paths
  // Main trunk from top to ProblemAgitation title
  const trunkPath = `M ${centerX} 200 L ${centerX} ${problemTop}`;
  
  // Left branch (Unpredictability -> Trust But Verify)
  const leftBranch = `M ${centerX} ${problemTop} 
                      C ${centerX} ${problemTop + 100}, ${leftX} ${problemTop + 100}, ${leftX} ${cardsY}
                      L ${leftX} ${section1Y} 
                      C ${leftX} ${section1Y + 100}, ${centerX - 200} ${section1Y + 100}, ${centerX - 200} ${section1Y + 200}`;

  // Center branch (Security Risks -> Full X-Ray)
  const centerBranch = `M ${centerX} ${problemTop} 
                        L ${centerX} ${section2Y}`;

  // Right branch (Compliance -> Kill Switch)
  const rightBranch = `M ${centerX} ${problemTop} 
                       C ${centerX} ${problemTop + 100}, ${rightX} ${problemTop + 100}, ${rightX} ${cardsY}
                       L ${rightX} ${section3Y} 
                       C ${rightX} ${section3Y + 100}, ${centerX + 200} ${section3Y + 100}, ${centerX + 200} ${section3Y + 200}`;


  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ height: windowSize.height }}>
      <svg 
        className="w-full h-full"
        viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow Filters */}
        <defs>
          <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base faint lines */}
        <path d={trunkPath} stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
        <path d={leftBranch} stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
        <path d={centerBranch} stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
        <path d={rightBranch} stroke="rgba(255,255,255,0.05)" strokeWidth="2" />

        {/* Animated tracing lines */}
        <motion.path
          d={trunkPath}
          stroke="#3b82f6"
          strokeWidth="3"
          filter="url(#glow-blue)"
          style={{ pathLength: scaleY }}
        />
        <motion.path
          d={leftBranch}
          stroke="#f59e0b"
          strokeWidth="3"
          filter="url(#glow-amber)"
          style={{ pathLength: scaleY }}
        />
        <motion.path
          d={centerBranch}
          stroke="#3b82f6"
          strokeWidth="3"
          filter="url(#glow-blue)"
          style={{ pathLength: scaleY }}
        />
        <motion.path
          d={rightBranch}
          stroke="#ef4444"
          strokeWidth="3"
          filter="url(#glow-red)"
          style={{ pathLength: scaleY }}
        />
      </svg>
    </div>
  );
}
