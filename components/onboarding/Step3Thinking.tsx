import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Step3ThinkingProps {
  onNext: () => void;
}

const Step3Thinking: React.FC<Step3ThinkingProps> = ({ onNext }) => {
  const onNextRef = useRef(onNext);
  
  useEffect(() => {
    onNextRef.current = onNext;
  }, [onNext]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onNextRef.current) onNextRef.current();
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center"
    >
      {/* Professional Animation: Neural Rings */}
      <div className="relative w-32 h-32 mb-12 mx-auto flex items-center justify-center">
        {/* Core Glow */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-8 bg-blue-500 rounded-full blur-xl"
        />
        <div className="absolute inset-10 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,1)] z-10" />
        
        {/* Orbiting rings */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-blue-500/30 rounded-full"
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
        
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border border-purple-500/30 rounded-full"
        >
          <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)] -translate-x-1/2 translate-y-1/2" />
        </motion.div>

        {/* Outer dashed ring */}
        <motion.div 
          animate={{ rotate: 180 }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 border border-dashed border-blue-500/20 rounded-full"
        />
      </div>

      <div className="text-blue-400 font-display text-xs tracking-widest mb-6 animate-pulse">NEURAL ENGINE V.3.4</div>
      <div className="text-2xl md:text-3xl font-display text-white mb-16 font-light">در حال پردازش الگوها...</div>
      
      <div className="flex flex-col gap-6 text-sm md:text-base font-display text-gray-500 items-start w-full max-w-md mx-auto">
        <motion.div initial={{opacity:0, x: -10}} animate={{opacity:1, x: 0}} transition={{delay: 0.5}}>{'>'} استخراج موجودیت‌ها از درخواست...</motion.div>
        <motion.div initial={{opacity:0, x: -10}} animate={{opacity:1, x: 0}} transition={{delay: 1.5}}>{'>'} طراحی ساختار پایگاه داده...</motion.div>
        <motion.div initial={{opacity:0, x: -10}} animate={{opacity:1, x: 0}} transition={{delay: 2.5}}>{'>'} ایجاد معماری فضای کاری...</motion.div>
        <motion.div initial={{opacity:0, x: -10}} animate={{opacity:1, x: 0}} transition={{delay: 3.5}} className="text-white">{'>'} ساختار آماده شد.</motion.div>
      </div>
    </motion.div>
  );
};

export default Step3Thinking;
