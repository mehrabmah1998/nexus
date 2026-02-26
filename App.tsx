
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import { NoiseOverlay } from './components/UIElements';
import Auth from './components/Auth';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';

type ViewState = 'landing' | 'auth-login' | 'auth-signup' | 'onboarding' | 'dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const pageVariants = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const renderView = () => {
    if (currentView === 'auth-login' || currentView === 'auth-signup') {
      return (
        <motion.div key="auth" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full min-h-screen">
          <Auth 
            initialMode={currentView === 'auth-login' ? 'login' : 'signup'} 
            onLoginSuccess={() => setCurrentView('onboarding')} 
            onBack={() => setCurrentView('landing')} 
          />
        </motion.div>
      );
    }

    if (currentView === 'onboarding') {
      return (
        <motion.div key="onboarding" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full min-h-screen">
          <Onboarding onComplete={() => setCurrentView('dashboard')} />
        </motion.div>
      );
    }

    if (currentView === 'dashboard') {
      return (
        <motion.div key="dashboard" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full min-h-screen">
          <Dashboard onLogout={() => setCurrentView('landing')} />
        </motion.div>
      );
    }

    return (
      <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full min-h-screen">
        <div className="relative min-h-screen selection:bg-[#3b82f6] selection:text-white bg-transparent overflow-x-hidden">
          
          <div className="relative z-10">
            <Navbar onNavigate={(view) => setCurrentView(view)} />
            <main>
              <Hero onNavigate={(view) => setCurrentView(view)} />
              
              <div className="relative">
                 <Stats />
              </div>

              <div className="relative">
                <Features />
              </div>
              
              <Pricing />
            </main>
            <Footer />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#07070a] overflow-x-hidden">
      <NoiseOverlay />
      <AnimatePresence mode="wait">
        {renderView()}
      </AnimatePresence>
    </div>
  );
};

export default App;
