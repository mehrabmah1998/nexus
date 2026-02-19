
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: 'معماری بلوک‌محور',
      description: 'هر چیزی در نکسوس یک بلوک است. متن، دیتابیس، تصویر یا کد؛ همه را به سادگی جابجا کنید.',
      icon: '▩',
      color: 'bg-blue-600'
    },
    {
      title: 'عامل‌های هوشمند (AI Agents)',
      description: 'هوش مصنوعی فقط یک چت‌بات نیست؛ نکسوس کارهای تکراری شما را خودکار انجام می‌دهد.',
      icon: '◈',
      color: 'bg-[#3b82f6]'
    },
    {
      title: 'همکاری لحظه‌ای',
      description: 'با تیم خود در یک صفحه کار کنید. تغییرات در کسری از ثانیه برای همه اعمال می‌شود.',
      icon: '♾',
      color: 'bg-purple-500'
    },
    {
      title: 'دسترسی کامل API',
      description: 'نکسوس برای توسعه‌دهندگان ساخته شده است. تمام اجزا از طریق API در دسترس هستند.',
      icon: '∷',
      color: 'bg-orange-500'
    }
  ];

  return (
    <section className="bg-[#0a0a0f] py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl md:text-7xl mb-6">قدرت در <br />دستان شماست</h2>
            <p className="text-xl text-gray-500 leading-relaxed">
              ما ابزارهایی را ساخته‌ایم که به شما اجازه می‌دهد جریان کاری خود را دقیقاً همان‌طور که می‌خواهید مهندسی کنید.
            </p>
          </div>
          <div className="bg-[#3b82f6] text-white px-6 py-2 font-bold rotate-3 shadow-[4px_4px_0_rgba(255,255,255,0.1)]">
            نسل سوم فضای کاری
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {features.map((f, i) => (
            <div key={i} className="bg-[#0a0a0f] p-12 hover:bg-white/[0.02] transition-colors group relative overflow-hidden">
              <div className="text-5xl mb-8 group-hover:scale-110 transition-transform origin-right inline-block">
                {f.icon}
              </div>
              <h3 className="text-3xl font-display font-bold mb-4">{f.title}</h3>
              <p className="text-lg text-gray-500 leading-relaxed max-w-sm">
                {f.description}
              </p>
              <div className={`absolute bottom-0 right-0 w-2 h-0 group-hover:h-full transition-all duration-500 ${f.color}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;