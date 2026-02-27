import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Typewriter from './Typewriter';

interface Step1WelcomeProps {
  onNext: () => void;
}

const Step1Welcome: React.FC<Step1WelcomeProps> = ({ onNext }) => {
  const [showBtn, setShowBtn] = useState(false);
  
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center"
    >
      {/* Professional Animation: AI Core */}
      <div className="relative w-32 h-32 mb-16 mx-auto flex items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 border border-blue-500/30 rounded-full"
        />
        {/* Middle pulsing ring */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: 180 }} 
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border-t border-b border-blue-400/40 rounded-full"
        />
        {/* Core glow */}
        <motion.div 
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.8, 1, 0.8] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-8 bg-blue-500 rounded-full blur-xl"
        />
        {/* Solid core */}
        <div className="absolute inset-10 bg-white rounded-full shadow-[0_0_40px_rgba(255,255,255,1)] z-10" />
      </div>

      <Typewriter 
        text="سلام. من هسته هوش مصنوعی Momentum هستم. آماده‌اید فضای کاری شما را خلق کنیم؟" 
        className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white mb-16 max-w-3xl"
        onComplete={() => setShowBtn(true)}
      />
      <AnimatePresence>
        {showBtn && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onNext}
            className="bg-[#3b82f6] text-white hover:bg-blue-500 shadow-[0_8px_20px_rgba(59,130,246,0.2)] hover:shadow-[0_12px_25px_rgba(59,130,246,0.3)] px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            شروع فرآیند
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Step1Welcome;
