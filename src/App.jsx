import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PitchDeck from './components/PitchDeck';
import LandingPage from './components/landing/LandingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/deck" element={<PitchDeck />} />
      </Routes>
    </BrowserRouter>
  );
}
