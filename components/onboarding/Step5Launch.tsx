import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Typewriter from './Typewriter';

interface Step5LaunchProps {
  onComplete: () => void;
}

const Step5Launch: React.FC<Step5LaunchProps> = ({ onComplete }) => {
  const onCompleteRef = useRef(onComplete);
  
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      key="step5"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center"
    >
      {/* Professional Animation: Multi-layered Spinner / Portal */}
      <div className="w-40 h-40 mb-16 relative flex items-center justify-center">
        {/* Core pulse */}
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-10 bg-white rounded-full blur-2xl"
        />
        
        {/* Spinning rings */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t-4 border-l-4 border-blue-500/80 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]" 
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.2, 1] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border-r-4 border-b-4 border-purple-500/60 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.6)]" 
        />
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.3, 1] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 border-t-2 border-b-2 border-blue-300/40 rounded-full" 
        />
        
        {/* Center dot */}
        <div className="w-6 h-6 bg-white rounded-full animate-pulse shadow-[0_0_30px_rgba(255,255,255,1)] z-10" />
      </div>
      
      <Typewriter 
        text="در حال مونتاژ نهایی..." 
        className="text-2xl md:text-4xl font-display text-white mb-6 font-light"
      />
      <div className="text-gray-500 font-display text-sm tracking-widest animate-pulse">انتقال به داشبورد تا چند لحظه دیگر</div>
    </motion.div>
  );
};

export default Step5Launch;
