import React, { useState, useEffect } from 'react';
import { slidesPart1 } from '../slides/SlidesPart1';
import { slidesPart2 } from '../slides/SlidesPart2';

const slides = [...slidesPart1, ...slidesPart2];

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = slides.length;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

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
