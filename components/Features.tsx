
import React, { useEffect, useRef, useState } from 'react';
import BlockArchitecture from './features/BlockArchitecture';
import SmartAgents from './features/SmartAgents';
import TeamCollaboration from './features/TeamCollaboration';
import ApiAccess from './features/ApiAccess';
import EnterpriseSecurity from './features/EnterpriseSecurity';

const Features: React.FC = () => {
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-32 lg:py-64 relative bg-black overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-gradient-to-b from-[#07070a] via-transparent to-transparent z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-full mb-40 text-right">
          <div className={`inline-block px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            زیرساخت هوشمند نکسوس
          </div>
          
          <h2 className={`font-display text-5xl md:text-8xl lg:text-[9.5rem] leading-[1.25] mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <span className="block text-white mb-8">پـیـشـرانِ</span>
            <span className="block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#2563eb] bg-[length:200%_auto] animate-gradient-text pb-6">
              عـامـلـیـت هـوشـمـنـد
            </span>
          </h2>
          
          <p className={`text-2xl md:text-3xl text-gray-500 max-w-4xl ml-auto leading-relaxed font-light transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            ما قدرت پردازش عصبی را به قلب فضای کاری شما آورده‌ایم. نکسوس با استفاده از استدلال منطقی، مسیر پروژه‌های شما را بهینه‌سازی می‌کند.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <BlockArchitecture isVisible={isVisible} />
          <SmartAgents isVisible={isVisible} delay={200} />
          <TeamCollaboration isVisible={isVisible} delay={400} />
          <ApiAccess isVisible={isVisible} delay={600} />
          <EnterpriseSecurity isVisible={isVisible} delay={800} />
        </div>

        {/* Section Footer / Certifications */}
        <div className={`mt-32 flex flex-wrap justify-center gap-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
           {[
             { label: 'گواهی امنیتی ISO 27001', icon: '🛡️' },
             { label: 'استاندارد جهانی SOC2', icon: '✅' },
             { label: 'پایداری سیستم ۹۹.۹۹٪', icon: '⚡' }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-4 group">
               <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-125">{item.icon}</span>
               <span className="text-xs font-black text-gray-600 uppercase tracking-[0.2em] group-hover:text-gray-400 transition-colors">
                 {item.label}
               </span>
             </div>
           ))}
        </div>
      </div>

      <style>{`
        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-gradient-text { animation: gradient-text 10s ease infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>
    </section>
  );
};

export default Features;
