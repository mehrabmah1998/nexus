
import React, { useState, useEffect } from 'react';

const FeatureShowcase: React.FC = () => {
  const [stage, setStage] = useState(0); // 0, 1, 2

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative group w-full max-w-[640px] mx-auto">
      {/* Main OS Container */}
      <div className={`relative bg-[#0d0d12] rounded-[2.5rem] p-1 border transition-all duration-1000 ${
        stage === 2 ? 'border-blue-500/30' : 'border-white/10'
      } shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden`}>
        
        <div className="bg-[#12121a] rounded-[2.2rem] overflow-hidden relative">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] opacity-60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-60" />
            </div>
            <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full bg-blue-500 animate-pulse ${stage === 0 ? 'opacity-100' : 'opacity-30'}`} />
               <div className="px-3 py-1 bg-white/5 rounded-md text-[9px] text-gray-500 font-mono tracking-widest uppercase">MOMENTUM_OS_v2.0</div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="p-8 h-[360px] lg:h-[420px] flex flex-col gap-6 relative">
            
            {/* Top Branding Section */}
            <div className={`flex gap-4 transition-all duration-700 ${stage === 0 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-50'}`}>
              <div className="w-12 h-12 rounded-2xl bg-[#3b82f6] flex items-center justify-center text-white text-xl font-black shadow-[0_0_20px_rgba(59,130,246,0.3)]">N</div>
              <div className="flex-1 space-y-3 pt-2">
                <div className={`h-2 transition-all duration-1000 bg-white/10 rounded-full ${stage === 0 ? 'w-1/3' : 'w-1/4'}`} />
                <div className={`h-2 transition-all duration-1000 bg-white/5 rounded-full ${stage === 0 ? 'w-1/2' : 'w-1/3'}`} />
              </div>
            </div>
            
            {/* Central Stage: Neural Processing */}
            <div className="flex-1 rounded-3xl border border-dashed border-white/10 p-6 flex flex-col justify-center items-center gap-6 relative overflow-hidden bg-white/[0.01]">
              
              {/* Animated Rings for Stage 0 */}
              <div className="relative w-24 h-24">
                <div className={`absolute inset-0 rounded-full border-2 border-dashed border-[#3b82f6]/20 transition-transform duration-[4000ms] linear ${stage === 0 ? 'rotate-180 scale-125' : 'rotate-0 scale-100'}`} />
                <div className={`absolute inset-0 rounded-full border-4 border-[#3b82f6]/10 border-t-[#3b82f6] animate-spin-slow`} />
                <div className={`absolute inset-4 rounded-full border border-white/10 transition-all duration-1000 ${stage === 0 ? 'bg-[#3b82f6]/10 scale-110' : 'bg-transparent scale-100'}`} />
              </div>

              <div className="text-center z-10">
                <div className="text-sm font-display text-gray-300 mb-1 font-bold">
                  {stage === 0 && 'در حال تحلیل الگوهای هوشمند...'}
                  {stage === 1 && 'همگام‌سازی فعالیت‌های تیم'}
                  {stage === 2 && 'بهینه‌سازی با موفقیت انجام شد'}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-light">
                  {stage === 0 && 'Neural Engine v.3.4'}
                  {stage === 1 && 'Collaborative Flow Active'}
                  {stage === 2 && 'Resource Efficiency +42%'}
                </div>
              </div>

              {/* Background Pulse Effect */}
              <div className={`absolute inset-0 bg-blue-500/5 transition-opacity duration-1000 ${stage === 2 ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* Bottom Processing Grid (Stage 1 Focus) */}
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map(i => (
                <div 
                  key={i} 
                  className={`h-12 rounded-xl border transition-all duration-700 ${
                    stage === 1 
                      ? `bg-[#3b82f6]/10 border-[#3b82f6]/30 translate-y-[-4px]` 
                      : 'bg-white/5 border-white/5 translate-y-0'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className={`h-1 w-2/3 mx-auto mt-4 rounded-full bg-white/10 overflow-hidden`}>
                    <div 
                      className={`h-full bg-[#3b82f6] transition-all duration-[2000ms] ease-out ${stage === 1 ? 'w-full' : 'w-0'}`} 
                      style={{ transitionDelay: `${i * 200}ms` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Insight Card (Stage 2 Focus) */}
      <div className={`absolute -top-10 -right-8 glass p-5 rounded-3xl shadow-2xl transition-all duration-1000 transform z-30 ${
        stage === 2 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#3b82f6] rounded-2xl flex items-center justify-center text-white font-black shadow-[0_10px_30px_rgba(59,130,246,0.4)]">AI</div>
          <div className="text-right">
            <div className="text-sm font-bold text-white mb-0.5">پروژه بهینه‌سازی شد</div>
            <div className="text-[10px] text-blue-400 font-bold bg-blue-400/10 px-2 py-0.5 rounded-full inline-block">صرفه‌جویی در ۱۲ ساعت زمان</div>
          </div>
        </div>
      </div>

      {/* Floating Team Progress (Stage 1 Focus) */}
      <div className={`absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-2xl transition-all duration-1000 transform z-30 ${
        stage === 1 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
      }`}>
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-12">
            <span className="text-xs font-bold text-gray-400">پیشرفت تیم</span>
            <span className="text-sm font-black text-[#3b82f6]">۸۴٪</span>
          </div>
          <div className="w-48 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className={`h-full bg-gradient-to-l from-[#3b82f6] to-cyan-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-[3000ms] cubic-bezier(0.16, 1, 0.3, 1) ${
              stage === 1 ? 'w-[84%]' : 'w-0'
            }`} />
          </div>
          <div className="flex -space-x-2 space-x-reverse">
             {[0,1,2,3].map(i => (
               <div key={i} className={`w-7 h-7 rounded-full border-2 border-[#12121a] bg-gradient-to-br ${['from-blue-500 to-indigo-600', 'from-purple-500 to-pink-500', 'from-emerald-400 to-cyan-500', 'from-orange-400 to-red-500'][i]} transition-transform duration-500 ${stage === 1 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`} style={{ transitionDelay: `${i * 100}ms` }} />
             ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .glass {
          background: rgba(20, 20, 30, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default FeatureShowcase;
