
import React, { useState } from 'react';
import { SectionBackground } from './UIElements';

const Pricing: React.FC = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'رایگان',
      price: '۰',
      desc: 'برای پروژه‌های شخصی',
      features: ['تا ۵ فضای کاری', 'بلوک‌های نامحدود', 'هوش مصنوعی پایه'],
      cta: 'شروع رایگان'
    },
    {
      name: 'پلاس',
      price: annual ? '۸۰۰ هزار' : '۱ میلیون',
      desc: 'برای حرفه‌ای‌ها',
      features: ['فضای کاری نامحدود', 'دستیار AI پیشرفته', 'تاریخچه تغییرات ۳۰ روزه'],
      cta: 'خرید پلاس',
      highlight: true
    },
    {
      name: 'بیزنس',
      price: annual ? '۱.۵ میلیون' : '۲ میلیون',
      desc: 'برای تیم‌های در حال رشد',
      features: ['همکاری تا ۲۰ نفر', 'API اختصاصی', 'پنل مدیریت تیم'],
      cta: 'شروع دوره آزمایشی'
    }
  ];

  return (
    <section className="py-32 bg-transparent relative overflow-hidden">
      <SectionBackground />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl mb-8">پلن‌های منعطف</h2>
          
          <div className="inline-flex items-center bg-white/5 p-1 rounded-full border border-white/10">
            <button 
              onClick={() => setAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${!annual ? 'bg-[#3b82f6] text-white shadow-md' : 'text-gray-400 hover:text-gray-300'}`}
            >
              ماهانه
            </button>
            <button 
              onClick={() => setAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${annual ? 'bg-[#3b82f6] text-white shadow-md' : 'text-gray-400 hover:text-gray-300'}`}
            >
              سالانه (۲۰٪ تخفیف)
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 hover:translate-y-[-8px] backdrop-blur-2xl ${plan.highlight ? 'bg-[#0a0a0f]/60 border-[#3b82f6]/30 shadow-[0_30px_60px_rgba(0,0,0,0.4)]' : 'bg-[#0a0a0f]/40 border-white/5 hover:border-white/10 hover:bg-[#0a0a0f]/60'}`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 right-10 bg-[#3b82f6] text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg shadow-blue-500/20">
                  پیشنهادی
                </div>
              )}
              <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-display font-bold text-[#3b82f6]">{plan.price}</span>
                <span className="text-lg font-bold text-[#3b82f6]">تومان</span>
                <span className="text-gray-500 font-normal">/ ماه</span>
              </div>
              <p className="text-gray-400 mb-8 font-light leading-relaxed">{plan.desc}</p>
              
              <ul className="space-y-4 mb-10">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-300/80">
                    <span className="text-[#3b82f6] font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${
                plan.highlight 
                  ? 'bg-[#3b82f6] text-white hover:bg-[#2563eb] shadow-[0_8px_20px_rgba(59,130,246,0.15)] hover:shadow-[0_12px_25px_rgba(59,130,246,0.25)]' 
                  : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/5 hover:border-white/10'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
