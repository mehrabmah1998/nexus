import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Typewriter from './Typewriter';
import { Mic, Send } from 'lucide-react';

interface Step2GoalProps {
  goal: string;
  setGoal: (v: string) => void;
  onNext: () => void;
}

const PRESETS = [
  "یک سیستم مدیریت تسک برای تیم طراحی",
  "داشبورد جامع مالی و حسابداری",
  "پورتال مدیریت منابع انسانی (HR)",
  "سیستم مدیریت ارتباط با مشتری (CRM)"
];

const Step2Goal: React.FC<Step2GoalProps> = ({ goal, setGoal, onNext }) => {
  const [showInput, setShowInput] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleListen = () => {
    if (isListening) {
      setIsListening(false);
      if ((window as any).listenInterval) clearInterval((window as any).listenInterval);
      return;
    }
    
    setIsListening(true);
    setGoal('');
    
    // Simulate speech recognition
    let dummyText = "یک پلتفرم مدیریت پروژه برای تیم مارکتینگ";
    let i = 0;
    
    if ((window as any).listenInterval) clearInterval((window as any).listenInterval);
    
    (window as any).listenInterval = setInterval(() => {
      setGoal(dummyText.slice(0, i + 1));
      i++;
      if (i >= dummyText.length) {
        clearInterval((window as any).listenInterval);
        setTimeout(() => setIsListening(false), 500);
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      if ((window as any).listenInterval) clearInterval((window as any).listenInterval);
    };
  }, []);

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center w-full"
    >
      {/* Professional Animation: AI Listening Wave */}
      <div className="relative w-full h-24 mb-12 flex items-center justify-center">
        <div className="flex items-center gap-3 relative z-10">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                height: isListening ? [24, 80, 24] : [16, 64, 16],
                backgroundColor: isListening ? ['rgba(168,85,247,0.4)', 'rgba(168,85,247,1)', 'rgba(168,85,247,0.4)'] : ['rgba(59,130,246,0.3)', 'rgba(59,130,246,1)', 'rgba(59,130,246,0.3)']
              }}
              transition={{ 
                duration: isListening ? 0.8 : 1.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: Math.abs(3 - i) * (isListening ? 0.1 : 0.2)
              }}
              className={`w-1.5 rounded-full ${isListening ? 'shadow-[0_0_20px_rgba(168,85,247,0.8)]' : 'shadow-[0_0_15px_rgba(59,130,246,0.8)]'}`}
            />
          ))}
        </div>
        {/* Background glow */}
        <div className={`absolute inset-0 blur-3xl rounded-full max-w-xs mx-auto transition-colors duration-500 ${isListening ? 'bg-purple-500/20' : 'bg-blue-500/10'}`} />
      </div>

      <Typewriter 
        text="چه چیزی می‌خواهید بسازید یا مدیریت کنید؟ به زبان ساده توضیح دهید." 
        className="text-2xl md:text-4xl font-light leading-relaxed text-white mb-16 max-w-3xl"
        onComplete={() => setShowInput(true)}
      />
      
      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl flex flex-col items-center"
          >
            {/* Input Area */}
            <div className="relative w-full group">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl transition-all duration-300 group-focus-within:bg-black/60 group-focus-within:border-blue-500/50">
                
                {/* Mic Button */}
                <button 
                  onClick={toggleListen}
                  className={`p-3.5 rounded-xl transition-all duration-300 flex items-center justify-center ${isListening ? 'bg-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                  title="صحبت کنید"
                >
                  <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
                </button>

                <input 
                  ref={inputRef}
                  type="text"
                  autoFocus
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && goal.trim() && onNext()}
                  className="flex-1 bg-transparent border-none outline-none text-xl px-6 text-white placeholder:text-gray-600 font-light"
                  placeholder="مثلاً: یک سیستم مدیریت تسک..."
                />

                {/* Send Button */}
                <button
                  onClick={() => goal.trim() && onNext()}
                  disabled={!goal.trim()}
                  className={`p-3.5 rounded-xl transition-all duration-300 flex items-center justify-center ${goal.trim() ? 'bg-[#3b82f6] text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:bg-blue-500 hover:scale-105' : 'bg-white/5 text-gray-600 cursor-not-allowed'}`}
                >
                  <Send className="w-5 h-5 -scale-x-100" />
                </button>

              </div>
            </div>

            {/* Presets */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-col items-center w-full"
            >
              <div className="text-xs text-gray-500 mb-4 font-mono tracking-widest uppercase">پیشنهادهای آماده</div>
              <div className="flex flex-wrap justify-center gap-3">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setGoal(preset);
                      inputRef.current?.focus();
                    }}
                    className="px-5 py-3 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md text-gray-300 text-sm hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Step2Goal;
