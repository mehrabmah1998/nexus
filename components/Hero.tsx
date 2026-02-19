import React, { useEffect, useRef, useState } from 'react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Visual Side (Left in RTL) */}
          <div className={`flex-1 w-full order-2 lg:order-1 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-12 opacity-0 scale-95'}`}>
            <div className="relative group">
              {/* Main Mockup Frame */}
              <div className="relative bg-[#0d0d12] rounded-[2.5rem] p-1 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden">
                <div className="bg-[#12121a] rounded-[2.2rem] overflow-hidden">
                  {/* Mockup Toolbar */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="px-3 py-1 bg-white/5 rounded-md text-[9px] text-gray-500 font-mono">NEXUS_OS_v2.0</div>
                  </div>
                  
                  {/* Mockup Content */}
                  <div className="p-8 h-[320px] lg:h-[400px] flex flex-col gap-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6] text-xl font-bold">N</div>
                      <div className="flex-1 space-y-3 pt-2">
                        <div className="h-2 w-1/4 bg-white/10 rounded-full" />
                        <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                      </div>
                    </div>
                    
                    <div className="flex-1 rounded-2xl border border-dashed border-white/10 p-6 flex flex-col justify-center items-center gap-4">
                      <div className="w-16 h-16 rounded-full border-4 border-[#3b82f6]/20 border-t-[#3b82f6] animate-spin-slow" />
                      <div className="text-sm font-display text-gray-400">در حال همگام‌سازی عامل‌های هوشمند...</div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="h-10 rounded-lg bg-white/5 border border-white/5" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Element 1 */}
              <div className="absolute -top-6 -right-6 glass p-5 rounded-3xl shadow-2xl animate-float-slow hidden md:block z-30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#3b82f6] rounded-xl flex items-center justify-center text-white font-bold">AI</div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">پروژه بهینه‌سازی شد</div>
                    <div className="text-[10px] text-gray-500 font-normal">صرفه‌جویی در ۱۲ ساعت زمان</div>
                  </div>
                </div>
              </div>

              {/* Floating Element 2 */}
              <div className="absolute -bottom-8 -left-8 glass p-6 rounded-3xl shadow-2xl animate-float-delayed hidden md:block z-30">
                <div className="space-y-3">
                  <div className="flex justify-between items-center gap-10">
                    <span className="text-xs font-bold text-gray-400">پیشرفت تیم</span>
                    <span className="text-xs font-bold text-[#3b82f6]">۸۴٪</span>
                  </div>
                  <div className="w-40 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[84%] bg-[#3b82f6] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  </div>
                </div>
              </div>
            </div>
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
              <button className="relative group overflow-hidden px-10 py-5 rounded-2xl bg-[#3b82f6] text-white font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_15px_30px_rgba(59,130,246,0.2)] hover:shadow-[0_25px_50px_rgba(59,130,246,0.4)] border border-white/10">
                <span className="relative z-10">ساخت فضای کاری رایگان</span>
                {/* Refined Shine Sweep Effect */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine transition-none" />
                {/* Internal Glow Bloom */}
                <div className="absolute inset-0 z-0 bg-blue-400/0 group-hover:bg-blue-400/10 transition-colors duration-500" />
              </button>
              
              <button className="px-10 py-5 rounded-2xl font-bold text-lg border-2 border-white/10 text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 flex items-center gap-3 group relative overflow-hidden">
                مشاهده دمو
                <span className="text-xl group-hover:translate-x-[-6px] transition-transform duration-300">←</span>
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.02); }
        }
        @keyframes shine {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite 1s;
        }
        .group-hover\\:animate-shine {
          animation: shine 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;