import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionBackground } from './UIElements';

interface OnboardingProps {
  onComplete: () => void;
}

const Typewriter: React.FC<{ text: string; delay?: number; onComplete?: () => void; className?: string }> = ({ text, delay = 0, onComplete, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    setDisplayedText('');
    setIsTyping(false);

    timeout = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
          if (onComplete) onComplete();
        }
      }, 40);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return (
    <div className={`${className}`} dir="rtl">
      {displayedText}
      <span className={`inline-block w-3 h-[1em] ml-1 align-middle bg-current ${isTyping ? 'animate-pulse' : 'animate-pulse opacity-50'}`} />
    </div>
  );
};

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  
  // Step 1 state
  const [showStep1Btn, setShowStep1Btn] = useState(false);
  
  // Step 2 state
  const [showStep2Input, setShowStep2Input] = useState(false);
  
  // Step 4 state
  const [showScaffold, setShowScaffold] = useState(false);

  // Auto-advance logic for steps 3 and 5
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => setStep(4), 4500);
      return () => clearTimeout(timer);
    }
    if (step === 5) {
      const timer = setTimeout(() => onComplete(), 3500);
      return () => clearTimeout(timer);
    }
  }, [step, onComplete]);

  // Background color temperature shift based on step
  const getBgColor = () => {
    switch(step) {
      case 1: return 'bg-blue-900/10';
      case 2: return 'bg-indigo-900/10';
      case 3: return 'bg-purple-900/10';
      case 4: return 'bg-fuchsia-900/10';
      case 5: return 'bg-rose-900/10';
      default: return 'bg-blue-900/10';
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#07070a] overflow-hidden selection:bg-white/30 selection:text-white p-6" dir="rtl">
      {/* Backgrounds */}
      <SectionBackground fadeTop={false} fadeBottom={false} />
      
      {/* Color Temperature Overlay */}
      <div className={`absolute inset-0 z-[5] mix-blend-screen transition-colors duration-1000 ease-in-out ${getBgColor()}`} />

      {/* Minimal Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <div 
          className="h-full bg-white transition-all duration-1000 ease-out"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Welcome */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <Typewriter 
                text="سلام. من هسته هوش مصنوعی Momentum هستم. آماده‌اید فضای کاری شما را خلق کنیم؟" 
                className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white mb-16 max-w-3xl"
                onComplete={() => setShowStep1Btn(true)}
              />
              <AnimatePresence>
                {showStep1Btn && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setStep(2)}
                    className="text-sm font-display tracking-widest uppercase text-gray-400 hover:text-white transition-colors border border-white/20 hover:border-white/60 px-10 py-4 rounded-full"
                  >
                    [ شروع فرآیند ]
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STEP 2: Goal Input */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start w-full"
            >
              <Typewriter 
                text="چه چیزی می‌خواهید بسازید یا مدیریت کنید؟ به زبان ساده توضیح دهید." 
                className="text-2xl md:text-4xl font-light leading-relaxed text-white mb-16"
                onComplete={() => setShowStep2Input(true)}
              />
              <AnimatePresence>
                {showStep2Input && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full"
                  >
                    <input 
                      type="text"
                      autoFocus
                      value={goal}
                      onChange={e => setGoal(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && goal.trim() && setStep(3)}
                      className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none text-xl md:text-3xl py-4 text-white placeholder:text-gray-700 transition-colors font-light"
                      placeholder="مثلاً: یک سیستم مدیریت تسک برای تیم طراحی..."
                    />
                    <div className="mt-12 flex justify-end">
                      <button
                        onClick={() => goal.trim() && setStep(3)}
                        className={`text-sm font-display tracking-widest uppercase transition-all duration-300 px-10 py-4 rounded-full border ${goal.trim() ? 'text-black bg-white border-white hover:bg-gray-200 hover:scale-105' : 'text-gray-600 border-white/10 cursor-not-allowed'}`}
                      >
                        [ تایید و ادامه ]
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STEP 3: AI Thinking */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-blue-400 font-display text-xs tracking-widest mb-12 animate-pulse">NEURAL ENGINE V.3.4</div>
              <div className="text-2xl md:text-3xl font-display text-white mb-16 font-light">در حال پردازش الگوها...</div>
              
              <div className="flex flex-col gap-6 text-sm md:text-base font-display text-gray-500 items-start w-full max-w-md mx-auto">
                <motion.div initial={{opacity:0, x: -10}} animate={{opacity:1, x: 0}} transition={{delay: 0.5}}>{'>'} استخراج موجودیت‌ها از درخواست...</motion.div>
                <motion.div initial={{opacity:0, x: -10}} animate={{opacity:1, x: 0}} transition={{delay: 1.5}}>{'>'} طراحی ساختار پایگاه داده...</motion.div>
                <motion.div initial={{opacity:0, x: -10}} animate={{opacity:1, x: 0}} transition={{delay: 2.5}}>{'>'} ایجاد معماری فضای کاری...</motion.div>
                <motion.div initial={{opacity:0, x: -10}} animate={{opacity:1, x: 0}} transition={{delay: 3.5}} className="text-white">{'>'} ساختار آماده شد.</motion.div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Scaffold Preview */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col w-full"
            >
              <Typewriter 
                text="این ساختار پیشنهادی من برای فضای کاری شماست:" 
                className="text-xl md:text-3xl font-light text-white mb-12"
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
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent z-10"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
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
                      onClick={() => setStep(5)}
                      className="text-sm font-display tracking-widest uppercase text-black bg-white hover:bg-gray-200 transition-colors px-10 py-4 rounded-full hover:scale-105 duration-300"
                    >
                      [ تایید و ساخت فضای کاری ]
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STEP 5: Launch */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 mb-12 relative flex items-center justify-center">
                <div className="absolute inset-0 border-t-2 border-white/80 rounded-full animate-spin" style={{ animationDuration: '1s' }} />
                <div className="absolute inset-3 border-r-2 border-white/40 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                <div className="absolute inset-6 border-b-2 border-white/20 rounded-full animate-spin" style={{ animationDuration: '2s' }} />
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
              <Typewriter 
                text="در حال مونتاژ نهایی..." 
                className="text-2xl md:text-4xl font-display text-white mb-6 font-light"
              />
              <div className="text-gray-500 font-display text-sm tracking-widest">انتقال به داشبورد تا چند لحظه دیگر</div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
