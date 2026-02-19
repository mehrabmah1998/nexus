
import React, { useEffect, useRef, useState } from 'react';
import FeatureShowcase from './FeatureShowcase';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // For the Hero section, we want it to trigger immediately on load
    // with a slight delay for a more professional "reveal" feel.
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Keep the observer as a backup for scroll-triggering if needed,
    // though the initial trigger above is the primary fix.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.01 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Visual Side (Left in RTL) */}
          <div className={`flex-1 w-full order-2 lg:order-1 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-12 opacity-0 scale-95'}`}>
            <FeatureShowcase />
          </div>

          {/* Text Content (Right in RTL) */}
          <div className="flex-1 text-right order-1 lg:order-2">
            <div className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6] text-xs font-bold tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
                آینده مدیریت پروژه
              </span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.15] mb-8">
              <span className={`block transition-all duration-1000 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                فضای کاری که
              </span>
              <span className={`block text-[#3b82f6] transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                با شما فکر می‌کند
              </span>
            </h1>
            
            <p className={`text-lg md:text-xl text-gray-400 max-w-xl ml-auto leading-relaxed mb-12 font-light transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              نکسوس اولین پلتفرم ابری بلوک‌محور است که هوش مصنوعی در قلب آن قرار دارد. پروژه‌های خود را با عاملیت هوشمند پیش ببرید و بهره‌وری را به اوج برسانید.
            </p>
            
            <div className={`flex flex-wrap justify-start gap-5 transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {/* Refined Blue Button - Primary Action */}
              <button className="relative group overflow-hidden px-10 py-5 rounded-2xl bg-[#3b82f6] text-white font-bold text-lg transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0 shadow-[0_10px_30px_rgba(59,130,246,0.2)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)]">
                <span className="relative z-10">ساخت فضای کاری رایگان</span>
                <div className="absolute inset-0 z-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
              </button>
              
              {/* Refined Unified Glass Button (Watch Demo) */}
              <button className="px-10 py-5 rounded-2xl font-bold text-lg border border-white/10 text-white/80 hover:text-white bg-white/5 backdrop-blur-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-4 group">
                مشاهده دمو
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="opacity-50 group-hover:opacity-100 group-hover:translate-x-[-6px] transition-all duration-300"
                >
                  <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
        .group-hover\\:animate-shine {
          animation: shine 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
