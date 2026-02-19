
import React, { useEffect, useRef, useState } from 'react';

const Stats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const stats = [
    { value: '۱۰,۰۰۰+', label: 'تیم فعال' },
    { value: '۵۰۰م+', label: 'بلوک ساخته شده' },
    { value: '۲۴/۷', label: 'دستیار هوشمند' },
    { value: '۹۹.۹٪', label: 'پایداری سیستم' },
  ];

  return (
    <div 
      ref={sectionRef}
      className="relative z-30 pb-20 px-6"
    >
      <div className={`max-w-7xl mx-auto backdrop-blur-3xl bg-white/[0.01] border border-white/5 rounded-[3rem] p-10 md:p-14 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-12">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`text-center md:text-right transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="text-3xl md:text-5xl font-display font-bold text-[#3b82f6] mb-3 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-[0.2em] opacity-80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
