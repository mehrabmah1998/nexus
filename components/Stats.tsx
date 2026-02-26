
import React, { useEffect, useRef, useState } from 'react';
import { SectionBackground } from './UIElements';

const Stats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stats are often visible right after Hero or on larger screens immediately.
    // Triggering it if it's even slightly in view.
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

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '۹۹.۹٪', label: 'پایداری سیستم', detail: 'SLA تضمین شده' },
    { value: '۲۴/۷', label: 'دستیار هوشمند', detail: 'همیشه در دسترس' },
    { value: '۵۰۰م+', label: 'بلوک ساخته شده', detail: 'تولید محتوا با AI' },
    { value: '۱۰,۰۰۰+', label: 'تیم فعال', detail: 'در سراسر جهان' },
  ];

  return (
    <div 
      ref={sectionRef}
      className="relative z-30 px-6 py-10 overflow-hidden"
    >
      <SectionBackground />
      <div className={`max-w-7xl mx-auto rounded-[3.5rem] p-[1px] bg-gradient-to-b from-white/10 to-transparent transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} relative z-10`}>
        <div className="bg-[#0a0a0f]/40 backdrop-blur-2xl rounded-[3.5rem] px-10 py-16 md:py-20 relative overflow-hidden">
          
          {/* Ambient light sweep effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute -inset-x-full top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transition-transform duration-[3000ms] ease-in-out ${isVisible ? 'translate-x-[200%]' : ''}`} />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 relative z-10">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center lg:items-start transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter">
                    {stat.value}
                  </span>
                </div>
                
                <div className="space-y-1 text-center lg:text-right">
                  <div className="text-sm md:text-base font-bold text-blue-400 uppercase tracking-wide">
                    {stat.label}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-500 font-medium opacity-60">
                    {stat.detail}
                  </div>
                </div>

                {/* Vertical Divider for Desktop */}
                {idx < stats.length - 1 && (
                  <div className="hidden lg:block absolute left-[-1rem] top-1/2 -translate-y-1/2 w-px h-12 bg-white/5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
