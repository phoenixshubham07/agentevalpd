import React, { useState, useEffect } from 'react';
import { slidesPart1 } from '../slides/SlidesPart1';
import { slidesPart2 } from '../slides/SlidesPart2';

const slides = [...slidesPart1, ...slidesPart2];

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = slides.length;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const isPrintMode = new URLSearchParams(window.location.search).get('print') === 'true';

  if (isPrintMode) {
    return (
      <div className="w-full bg-[#050505] text-slate-200 font-sans min-h-screen">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@200;300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
          .font-heading { font-family: 'Space Grotesk', sans-serif; }
          .font-body { font-family: 'Inter', sans-serif; }
          .font-tech { font-family: 'JetBrains Mono', monospace; }
          
          /* Force all animations to end state for PDF */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Override Framer Motion and other opacity-based animations */
          [style*="opacity: 0"], 
          .opacity-0,
          motion-div,
          [data-framer-component-type],
          div[style*="opacity"] {
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
            filter: none !important;
          }

          @page { 
            size: 1920px 1080px; 
            margin: 0; 
          }
          
          body { 
            margin: 0; 
            background: #050505 !important; 
            overflow: visible !important;
          }
          
          /* Ensure all nested components are visible */
          .flex-1 { flex: 1 1 auto !important; }
        `}</style>
        {slides.map((slide, index) => (
          <div 
            key={index} 
            style={{ 
              width: '1920px', 
              height: '1080px', 
              position: 'relative', 
              overflow: 'hidden', 
              pageBreakAfter: 'always', 
              breakAfter: 'page' 
            }}
          >
            {slide}
          </div>
        ))}
      </div>
    );
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // Add dependency

  return (
    <div className={`w-full bg-[#050505] text-slate-200 font-sans selection:bg-purple-500 selection:text-white flex flex-col h-screen overflow-hidden`}>

      {/* Font Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@200;300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

        .font-heading { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-tech { font-family: 'JetBrains Mono', monospace; }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        /* Print Break Page logic */
        @media print {
          .print-break { page-break-after: always; break-after: page; height: 100vh; width: 100vw; overflow: hidden; }
        }
      `}</style>

      {/* Slide Counter (Top Right) */}
      <div className="absolute top-8 right-8 z-50 flex items-center gap-4 no-print">
        <div className="px-4 py-2 bg-black/40 border border-slate-800/50 rounded-full backdrop-blur-md flex items-center gap-2">
          <span className="font-tech text-xs font-bold text-slate-300 tracking-widest">
            {String(currentSlide + 1).padStart(2, '0')} <span className="text-slate-600">/</span> {String(totalSlides).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Viewport Container */}
      <div className="flex-1 relative">
        {/* Presentation Mode: Slider */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-1000 cubic-bezier(0.19, 1, 0.22, 1)" style={{ transform: `translateY(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`h-full w-full relative transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${currentSlide === index ? 'opacity-100 scale-100' : 'opacity-20 scale-95 blur-[2px]'}`}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
