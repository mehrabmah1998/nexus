
import React, { useState } from 'react';

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
      price: annual ? '۸' : '۱۰',
      desc: 'برای حرفه‌ای‌ها',
      features: ['فضای کاری نامحدود', 'دستیار AI پیشرفته', 'تاریخچه تغییرات ۳۰ روزه'],
      cta: 'خرید پلاس',
      highlight: true
    },
    {
      name: 'بیزنس',
      price: annual ? '۱۵' : '۲۰',
      desc: 'برای تیم‌های در حال رشد',
      features: ['همکاری تا ۲۰ نفر', 'API اختصاصی', 'پنل مدیریت تیم'],
      cta: 'شروع دوره آزمایشی'
    }
  ];

  return (
    <section className="py-32 bg-[#0c0c14] relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl mb-8">پلن‌های منعطف</h2>
          
          <div className="inline-flex items-center bg-white/5 p-1 rounded-full border border-white/10">
            <button 
              onClick={() => setAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${!annual ? 'bg-[#3b82f6] text-white' : 'text-gray-400'}`}
            >
              ماهانه
            </button>
            <button 
              onClick={() => setAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${annual ? 'bg-[#3b82f6] text-white' : 'text-gray-400'}`}
            >
              سالانه (۲۰٪ تخفیف)
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative p-10 rounded-3xl border transition-all hover:-translate-y-2 ${plan.highlight ? 'bg-white/5 border-[#3b82f6]/50 shadow-[0_20px_50px_rgba(59,130,246,0.1)]' : 'bg-transparent border-white/10'}`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 right-10 bg-[#3b82f6] text-white px-4 py-1 rounded-full text-xs font-bold">
                  پیشنهادی
                </div>
              )}
              <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-display font-bold text-[#3b82f6]">${plan.price}</span>
                <span className="text-gray-500 font-normal">/ ماه</span>
              </div>
              <p className="text-gray-400 mb-8 font-light">{plan.desc}</p>
              
              <ul className="space-y-4 mb-10">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="text-[#3b82f6]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.highlight ? 'bg-[#3b82f6] text-white hover:scale-105 shadow-lg shadow-blue-500/20' : 'bg-white/10 text-white hover:bg-white/20'}`}>
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
