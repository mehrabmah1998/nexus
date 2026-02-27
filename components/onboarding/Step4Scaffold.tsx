import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Typewriter from './Typewriter';

interface Step4ScaffoldProps {
  onNext: () => void;
}

const Step4Scaffold: React.FC<Step4ScaffoldProps> = ({ onNext }) => {
  const [showScaffold, setShowScaffold] = useState(false);
  
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col w-full"
    >
      {/* Professional Animation: Blueprint / Structural Assembly */}
      <div className="relative w-32 h-32 mb-8 flex items-center justify-center mx-auto">
        {/* Background ambient glow */}
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl"
        />
        
        {/* Blueprint Grid Lines */}
        <div className="absolute inset-4 border border-blue-500/20 rounded-lg overflow-hidden">
          <motion.div 
            animate={{ top: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-blue-400/50 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
          />
          <motion.div 
            animate={{ left: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-[1px] bg-blue-400/50 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
          />
        </div>

        {/* Assembling UI Blocks */}
        <div className="relative w-16 h-16 z-10">
          {/* Top Header Block */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-10, 0, 0, -10] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
            className="absolute top-0 left-0 right-0 h-3 bg-blue-500/30 border border-blue-400/50 rounded-sm"
          />
          {/* Sidebar Block */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, -10] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.8, 1], delay: 0.2 }}
            className="absolute top-4 bottom-0 left-0 w-4 bg-blue-500/20 border border-blue-400/40 rounded-sm"
          />
          {/* Main Content Blocks */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.8, 1], delay: 0.4 }}
            className="absolute top-4 right-0 w-10 h-6 bg-blue-400/20 border border-blue-300/40 rounded-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 0.8, 1], delay: 0.6 }}
            className="absolute bottom-0 right-0 w-10 h-4 bg-blue-400/20 border border-blue-300/40 rounded-sm"
          />
        </div>
      </div>

      <Typewriter 
        text="این ساختار پیشنهادی من برای فضای کاری شماست:" 
        className="text-xl md:text-3xl font-light text-white mb-12 text-center"
        onComplete={() => setShowScaffold(true)}
      />
      
      <AnimatePresence>
        {showScaffold && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full border border-white/10 rounded-2xl bg-black/40 backdrop-blur-2xl overflow-hidden flex flex-col md:flex-row h-[450px] shadow-2xl"
          >
            {/* Sidebar */}
            <div className="w-full md:w-64 border-l border-white/5 p-6 flex flex-col gap-4 bg-white/[0.01]">
              <div className="h-5 w-32 bg-white/20 rounded mb-6" />
              <div className="h-3 w-full bg-white/10 rounded" />
              <div className="h-3 w-3/4 bg-white/10 rounded" />
              <div className="h-3 w-5/6 bg-white/10 rounded" />
              <div className="h-3 w-2/3 bg-white/10 rounded" />
              <div className="mt-auto h-10 w-full border border-white/10 hover:bg-white/5 transition-colors rounded-lg flex items-center justify-center text-xs text-gray-400 font-display cursor-pointer">+ بلوک جدید</div>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-8 flex flex-col gap-6 relative overflow-hidden">
              {/* Animated scanning line */}
              <motion.div 
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent z-10 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              />
              
              <div className="h-8 w-1/3 bg-white/20 rounded mb-6" />
              <div className="grid grid-cols-3 gap-6">
                <div className="h-28 border border-white/5 rounded-xl bg-white/[0.02] relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10" />
                  <div className="absolute bottom-4 right-4 left-4 h-2 bg-white/5 rounded" />
                </div>
                <div className="h-28 border border-white/5 rounded-xl bg-white/[0.02] relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10" />
                  <div className="absolute bottom-4 right-4 left-4 h-2 bg-white/5 rounded" />
                </div>
                <div className="h-28 border border-white/5 rounded-xl bg-white/[0.02] relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10" />
                  <div className="absolute bottom-4 right-4 left-4 h-2 bg-white/5 rounded" />
                </div>
              </div>
              <div className="flex-1 border border-white/5 rounded-xl bg-white/[0.02] mt-2 relative overflow-hidden">
                 <div className="absolute top-6 right-6 w-1/4 h-4 bg-white/10 rounded" />
                 <div className="absolute top-16 right-6 left-6 h-px bg-white/5" />
                 <div className="absolute top-24 right-6 w-3/4 h-2 bg-white/5 rounded" />
                 <div className="absolute top-32 right-6 w-1/2 h-2 bg-white/5 rounded" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScaffold && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={onNext}
              className="bg-[#3b82f6] text-white hover:bg-blue-500 shadow-[0_8px_20px_rgba(59,130,246,0.2)] hover:shadow-[0_12px_25px_rgba(59,130,246,0.3)] px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              تایید و ساخت فضای کاری
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Step4Scaffold;
