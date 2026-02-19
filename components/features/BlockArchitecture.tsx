
import React from 'react';

const BlockArchitecture: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return (
    <div 
      className={`lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-[3rem] p-10 lg:p-16 bg-[#0a0a0f] border border-white/5 hover:border-blue-500/30 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
    >
      <div className="relative z-10 h-full flex flex-col text-right">
        <div className="max-w-md mb-auto">
          <div className="mb-12 p-5 rounded-3xl bg-blue-500/10 border border-blue-500/20 inline-block group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <path d="M14 14h7v7h-7z" fill="#3b82f6" fillOpacity="0.2" />
            </svg>
          </div>
          <span className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] block mb-4">زیرساخت عصبی</span>
          <h3 className="text-4xl lg:text-6xl font-display font-black text-white mb-8 leading-tight">ساختار منعطف و چندلایه</h3>
          <p className="text-gray-400 text-xl leading-relaxed font-light">
            در نکسوس، هر پروژه یک موجودیت زنده است. بلوک‌های داده را با آزادی کامل ترکیب کنید و ابزاری بسازید که دقیقاً با جریان ذهنی شما همخوانی داشته باشد.
          </p>
        </div>

        {/* Visual Decoration */}
        <div className="absolute left-[-5%] bottom-[-5%] w-2/3 h-2/3 pointer-events-none opacity-10 group-hover:opacity-30 transition-all duration-1000 hidden lg:block translate-x-[-20%] translate-y-[10%] group-hover:translate-x-0 group-hover:translate-y-0">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="180" stroke="url(#grad1)" strokeWidth="0.5" fill="none" strokeDasharray="10 10" className="animate-spin-slow" />
            <rect x="150" y="150" width="100" height="100" rx="20" fill="url(#grad1)" fillOpacity="0.1" stroke="url(#grad1)" strokeWidth="1" />
            <circle cx="150" cy="150" r="8" fill="#3b82f6" />
            <circle cx="250" cy="150" r="8" fill="#3b82f6" />
            <circle cx="150" cy="250" r="8" fill="#3b82f6" />
            <circle cx="250" cy="250" r="8" fill="#3b82f6" />
          </svg>
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-full h-full bg-blue-600/[0.02] group-hover:bg-blue-600/[0.05] transition-colors duration-1000" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </div>
  );
};

export default BlockArchitecture;
