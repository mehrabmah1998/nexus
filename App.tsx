
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
    <div className="relative min-h-screen selection:bg-[#3b82f6] selection:text-white bg-[#07070a] overflow-x-hidden">
      <AnimatedBackground />
      <NoiseOverlay />
      
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          
          {/* Stats integrated directly into the flow without harsh cuts */}
          <div className="relative py-12">
             <Stats />
          </div>

          <div className="relative mt-20">
            {/* Soft gradient transition instead of skewed cut */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-transparent to-[#0a0a0f] pointer-events-none" />
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
