
import React, { useEffect, useRef, useState } from 'react';
import BlockArchitecture from './features/BlockArchitecture';
import SmartAgents from './features/SmartAgents';
import TeamCollaboration from './features/TeamCollaboration';
import ApiAccess from './features/ApiAccess';
import EnterpriseSecurity from './features/EnterpriseSecurity';
import { SectionBackground } from './UIElements';

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
    <section ref={sectionRef} className="py-32 lg:py-64 relative bg-transparent overflow-hidden">
      <SectionBackground />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-full mb-40 text-right">
          <div className={`inline-block px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            زیرساخت هوشمند Momentum
          </div>
          
          <h2 className={`font-display text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[1.1] mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <span className="block text-white mb-2">پیشرانِ</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#2563eb] bg-[length:200%_auto] animate-gradient-text pb-4">
              عاملیت هوشمند
            </span>
          </h2>
          
          <p className={`text-xl md:text-3xl text-gray-400 max-w-4xl ml-auto leading-[1.8] font-light transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            ما قدرت پردازش عصبی را به قلب فضای کاری شما آورده‌ایم. Momentum با استفاده از استدلال منطقی، مسیر پروژه‌های شما را بهینه‌سازی می‌کند.
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
        <div className={`mt-32 flex justify-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
           <div className="flex flex-wrap justify-center gap-10 lg:gap-20 items-center px-12 py-8 rounded-[2.5rem] bg-[#0a0a0f] border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
             {[
               { 
                 label: 'گواهی امنیتی ISO 27001', 
                 icon: (
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6-8 10-8 10z"/>
                   </svg>
                 )
               },
               { 
                 label: 'استاندارد جهانی SOC2', 
                 icon: (
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                     <rect width="18" height="18" x="3" y="3" rx="2"/>
                     <path d="m9 12 2 2 4-4"/>
                   </svg>
                 )
               },
               { 
                 label: 'پایداری سیستم ۹۹.۹۹٪', 
                 icon: (
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                   </svg>
                 )
               }
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-5 group cursor-default">
                 <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-gray-500 group-hover:text-blue-400 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 group-hover:scale-110 transition-all duration-500 shadow-sm">
                   {item.icon}
                 </div>
                 <span className="text-[13px] font-black text-gray-500 uppercase tracking-[0.15em] group-hover:text-gray-300 transition-colors duration-500">
                   {item.label}
                 </span>
               </div>
             ))}
           </div>
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
