import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TraceTreeFallback from './components/landing/TraceTreeFallback';

const LandingPage = lazy(() => import('./components/landing/LandingPage'));
const PitchDeck = lazy(() => import('./components/PitchDeck'));
const BrandShowcase = lazy(() => import('./brand/BrandShowcase'));
const TraceTree = lazy(() => import('./components/trace').then(m => ({ default: m.TraceTree })));
const WebGLErrorPage = lazy(() => import('./components/landing/WebGLErrorPage'));
const GlitchPlayground = lazy(() => import('./glitch-playground/GlitchPlayground'));

const PageFallback = () => (
  <div className="min-h-screen bg-[#020617] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/deck" element={<PitchDeck />} />
          <Route path="/brand" element={<BrandShowcase />} />
          <Route path="/trace" element={<TraceTree />} />
          <Route path="/webglerror" element={<WebGLErrorPage />} />
          <Route path="/glitch" element={<GlitchPlayground />} />
          <Route path="/trace-fallback" element={<TraceTreeFallback />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
