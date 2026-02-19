
import React from 'react';

const EnterpriseSecurity: React.FC<{ isVisible: boolean; delay: number }> = ({ isVisible, delay }) => {
  return (
    <div 
      style={{ transitionDelay: `${delay}ms` }}
      className={`lg:col-span-2 group relative overflow-hidden rounded-[3rem] p-12 bg-[#0a0a0f] border border-white/5 hover:border-emerald-500/30 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-right">
        <div className="max-w-xl">
          <div className="mb-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 inline-block shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h4 className="text-3xl lg:text-4xl font-display font-black text-white mb-6">امنیت لایه سازمانی</h4>
          <p className="text-gray-400 text-lg leading-relaxed font-light">حفاظت از داده‌های شما اولویت بی چون و چرای ماست. رمزنگاری نظامی و استانداردهای جهانی برای آرامش خاطر شما.</p>
        </div>

        <div className="w-full md:w-64 h-16 bg-white/[0.02] rounded-3xl relative overflow-hidden border border-white/10 flex items-center justify-center group-hover:border-emerald-500/40 transition-colors">
           <div className="text-xs font-mono text-emerald-500 uppercase font-black tracking-[0.3em] z-10">وضعیت ایمن فعال</div>
           <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
           <div className="absolute top-0 left-0 h-full w-2 bg-emerald-500/50 shadow-[0_0_20px_#10b981] animate-scan-fast" />
        </div>
      </div>
      
      <style>{`
        @keyframes scan-fast {
          0% { transform: translateX(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(1200%); opacity: 0; }
        }
        .animate-scan-fast { animation: scan-fast 4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
};

export default EnterpriseSecurity;
