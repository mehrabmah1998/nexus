
import React, { useEffect, useRef, useState } from 'react';

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

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: 'معماری بلوک‌محور',
      description: 'هر چیزی در نکسوس یک بلوک است. متن، دیتابیس، تصویر یا کد؛ همه را به سادگی جابجا کنید و ساختارهای پیچیده بسازید.',
      icon: '▩',
      color: 'from-blue-600 to-indigo-700',
      span: 'lg:col-span-2'
    },
    {
      title: 'عامل‌های هوشمند',
      description: 'هوش مصنوعی فقط یک چت‌بات نیست؛ نکسوس کارهای تکراری شما را خودکار انجام می‌دهد.',
      icon: '◈',
      color: 'from-purple-600 to-pink-700',
      span: 'lg:col-span-1'
    },
    {
      title: 'همکاری لحظه‌ای',
      description: 'با تیم خود در یک صفحه کار کنید. تغییرات در کسری از ثانیه برای همه اعمال می‌شود.',
      icon: '♾',
      color: 'from-cyan-500 to-blue-600',
      span: 'lg:col-span-1'
    },
    {
      title: 'دسترسی کامل API',
      description: 'نکسوس برای توسعه‌دهندگان ساخته شده است. تمام اجزا از طریق API قدرتمند ما در دسترس هستند.',
      icon: '∷',
      color: 'from-orange-500 to-red-600',
      span: 'lg:col-span-2'
    }
  ];

  return (
    <section ref={sectionRef} className="bg-[#0a0a0f] py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-2xl text-right">
            <h2 className={`font-display text-5xl md:text-7xl mb-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              قدرت در <br /><span className="text-white/40">دستان شماست</span>
            </h2>
            <p className={`text-xl text-gray-400 leading-relaxed font-light transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              ما ابزارهایی را ساخته‌ایم که به شما اجازه می‌دهد جریان کاری خود را دقیقاً همان‌طور که می‌خواهید مهندسی کنید.
            </p>
          </div>
          <div className={`px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-bold backdrop-blur-md transition-all duration-1000 delay-300 transform ${isVisible ? 'rotate-[-3deg] opacity-100' : 'rotate-0 opacity-0'}`}>
            نسل سوم فضای کاری
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`${f.span} group relative rounded-[2.5rem] p-8 md:p-12 overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-[0.98] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
              style={{ transitionDelay: `${i * 150}ms`, background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
            >
              {/* Background Glow */}
              <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${f.color}`} />
              
              <div className="relative z-10">
                <div className="text-6xl mb-10 group-hover:scale-110 transition-transform duration-500 origin-right inline-block">
                  {f.icon}
                </div>
                <h3 className="text-3xl font-display font-bold mb-6 group-hover:text-white transition-colors">{f.title}</h3>
                <p className="text-lg text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {f.description}
                </p>
              </div>

              {/* Interactive Corner Accent */}
              <div className={`absolute bottom-6 left-6 w-12 h-12 rounded-full border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500`}>
                <span className="text-white">←</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
