
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import { NoiseOverlay, AnimatedBackground } from './components/UIElements';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen selection:bg-[#3b82f6] selection:text-white bg-[#07070a]">
      <AnimatedBackground />
      <NoiseOverlay />
      
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-32 bg-[#07070a] -translate-y-16 -skew-y-2 z-10" />
            <Features />
          </div>
          <Pricing />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;