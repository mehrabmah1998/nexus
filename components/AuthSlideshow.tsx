import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const slides = [
  {
    id: 1,
    title: 'عاملیت هوشمند در خدمت شما',
    desc: 'دستیارهای خودمختار Momentum با هر کلیک شما هوشمندتر می‌شوند و وظایف پیچیده را با دقت انسانی انجام می‌دهند.',
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#3b82f6]">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
        <path d="M7 7h.01"/>
      </svg>
    )
  },
  {
    id: 2,
    title: 'همکاری لحظه‌ای بدون مرز',
    desc: 'تیم خود را در یک فضای کاری یکپارچه متصل کنید. تغییرات را در لحظه ببینید و با همکاران خود به صورت زنده تعامل داشته باشید.',
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#3b82f6]">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
  {
    id: 3,
    title: 'امنیت لایه سازمانی',
    desc: 'حفاظت از داده‌های شما اولویت بی چون و چرای ماست. رمزنگاری نظامی و استانداردهای جهانی برای آرامش خاطر شما.',
    icon: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#3b82f6]">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    )
  }
];

const slideVariants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.15,
      delayChildren: 0.1
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 1.05, 
    filter: 'blur(10px)',
    transition: { 
      duration: 0.4, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

const iconVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04
    }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { type: "spring", stiffness: 150, damping: 15 }
  }
};

const AnimatedText = ({ text, className, as = "div", style }: { text: string, className?: string, as?: any, style?: React.CSSProperties }) => {
  const words = text.split(" ");
  const MotionTag = motion[as as keyof typeof motion] || motion.div;
  
  return (
    <MotionTag 
      variants={textContainerVariants}
      className={`${className} flex flex-wrap justify-center gap-x-[0.25em] gap-y-1`} 
      dir="rtl"
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block" style={style}>
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
};

const SlideBackgrounds = ({ currentSlide }: { currentSlide: number }) => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#3b82f6] z-0 rounded-[2rem]">
      <AnimatePresence mode="wait">
        {currentSlide === 0 && (
          <motion.div
            key="bg-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[600px] h-[600px] bg-white/20 rounded-full blur-[100px]" 
            />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute w-[800px] h-[800px] opacity-30"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0 340deg, white 360deg)',
                borderRadius: '50%'
              }}
            />
          </motion.div>
        )}
        {currentSlide === 1 && (
          <motion.div
            key="bg-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
            <motion.div 
              animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div 
              animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl"
            />
          </motion.div>
        )}
        {currentSlide === 2 && (
          <motion.div
            key="bg-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 overflow-hidden flex items-center justify-center"
          >
            <motion.div 
              animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute border-[2px] border-white/20 rounded-full"
              style={{ width: '80%', height: '80%', aspectRatio: '1/1' }}
            />
            <motion.div 
              animate={{ scale: [1.05, 1, 1.05], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute border-[2px] border-white/20 rounded-full"
              style={{ width: '120%', height: '120%', aspectRatio: '1/1' }}
            />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,rgba(255,255,255,0.05)_4px,rgba(255,255,255,0.05)_8px)]" />
            <motion.div
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent blur-md"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Base gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/80 via-transparent to-transparent pointer-events-none rounded-[2rem]" />
    </div>
  );
};

const AuthSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden lg:flex w-1/2 p-4 relative z-10">
      <div className="w-full h-full rounded-[2rem] overflow-hidden relative flex flex-col justify-between p-12 shadow-2xl border border-white/10">
        
        <SlideBackgrounds currentSlide={currentSlide} />
        
        {/* Logo */}
        <div className="flex items-center gap-3 relative z-20">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-sm backdrop-blur-md">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2V8H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-display font-black tracking-tight text-white drop-shadow-md">Momentum</div>
        </div>

        {/* Slideshow Content */}
        <div className="relative flex-1 flex items-center justify-center mt-12 mb-12 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center text-center max-w-md"
            >
              <motion.div variants={iconVariants} className="w-40 h-40 mb-12 rounded-[2.5rem] bg-white flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.2)] relative z-30">
                <div className="relative z-40">
                  {slides[currentSlide].icon}
                </div>
              </motion.div>
              
              <AnimatedText 
                text={slides[currentSlide].title} 
                as="h2"
                className="text-4xl font-display font-black text-white mb-6 leading-tight drop-shadow-lg" 
                style={{ textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
              />
              
              <AnimatedText 
                text={slides[currentSlide].desc} 
                as="p"
                className="text-lg text-white/90 leading-relaxed font-light drop-shadow-md" 
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center justify-center gap-3 relative z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 shadow-sm"
              style={{ width: currentSlide === idx ? '32px' : '16px', backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              {currentSlide === idx && (
                <motion.div 
                  layoutId="activeSlide"
                  className="absolute inset-0 bg-white" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthSlideshow;
