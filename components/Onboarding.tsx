import React, { useState } from 'react';
import { AnimatedBackground, NoiseOverlay } from './UIElements';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    role: '',
    workspaceName: '',
    teamSize: '',
    goal: ''
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#07070a] overflow-hidden selection:bg-[#3b82f6] selection:text-white p-6" dir="rtl">
      <AnimatedBackground />
      <NoiseOverlay />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-12 flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-white/10 rounded-full z-0" />
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 h-1 bg-[#3b82f6] rounded-full z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
          
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                s < step ? 'bg-[#3b82f6] text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]' :
                s === step ? 'bg-[#3b82f6] text-white border-4 border-[#07070a] shadow-[0_0_0_2px_#3b82f6]' :
                'bg-[#1a1a24] text-gray-500 border border-white/10'
              }`}
            >
              {s < step ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              ) : s}
            </div>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] min-h-[400px] flex flex-col">
          
          {step === 1 && (
            <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-display font-black text-white mb-2">خوش آمدید! نقش شما چیست؟</h2>
              <p className="text-gray-400 mb-8">برای شخصی‌سازی تجربه شما در Momentum، لطفاً نقش خود را انتخاب کنید.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'designer', icon: '🎨', title: 'طراح', desc: 'UI/UX، گرافیک' },
                  { id: 'developer', icon: '💻', title: 'توسعه‌دهنده', desc: 'فرانت‌اند، بک‌اند' },
                  { id: 'manager', icon: '📊', title: 'مدیر محصول', desc: 'استراتژی، برنامه‌ریزی' },
                  { id: 'other', icon: '✨', title: 'سایر', desc: 'بازاریابی، فروش و...' }
                ].map(role => (
                  <button
                    key={role.id}
                    onClick={() => setData({...data, role: role.id})}
                    className={`p-5 rounded-2xl border text-right transition-all duration-300 ${
                      data.role === role.id 
                        ? 'bg-[#3b82f6]/10 border-[#3b82f6] shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-3xl mb-3">{role.icon}</div>
                    <div className="font-bold text-white mb-1">{role.title}</div>
                    <div className="text-xs text-gray-500">{role.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-display font-black text-white mb-2">فضای کاری خود را بسازید</h2>
              <p className="text-gray-400 mb-8">نامی برای فضای کاری خود انتخاب کنید و اندازه تیم را مشخص کنید.</p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300 ml-1">نام فضای کاری</label>
                  <input 
                    type="text" 
                    value={data.workspaceName}
                    onChange={(e) => setData({...data, workspaceName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/50 focus:bg-white/10 transition-all text-lg"
                    placeholder="مثال: تیم طراحی آلفا"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-300 ml-1">اندازه تیم</label>
                  <div className="flex flex-wrap gap-3">
                    {['فقط خودم', '۲ تا ۵ نفر', '۶ تا ۱۵ نفر', 'بیشتر از ۱۵ نفر'].map(size => (
                      <button
                        key={size}
                        onClick={() => setData({...data, teamSize: size})}
                        className={`px-5 py-3 rounded-xl border text-sm font-bold transition-all duration-300 ${
                          data.teamSize === size
                            ? 'bg-[#3b82f6] border-[#3b82f6] text-white shadow-lg'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-display font-black text-white mb-2">هدف اصلی شما چیست؟</h2>
              <p className="text-gray-400 mb-8">Momentum چگونه می‌تواند به شما کمک کند؟</p>
              
              <div className="space-y-3">
                {[
                  { id: 'tasks', title: 'مدیریت وظایف و پروژه‌ها', desc: 'پیگیری کارها و زمان‌بندی دقیق' },
                  { id: 'docs', title: 'مستندسازی هوشمند', desc: 'نوشتن و سازماندهی اسناد با کمک هوش مصنوعی' },
                  { id: 'collab', title: 'همکاری تیمی', desc: 'ارتباط بهتر و اشتراک‌گذاری منابع' },
                  { id: 'all', title: 'همه موارد', desc: 'یک فضای کاری یکپارچه برای تمام نیازها' }
                ].map(goal => (
                  <button
                    key={goal.id}
                    onClick={() => setData({...data, goal: goal.id})}
                    className={`w-full p-4 rounded-xl border text-right flex items-center gap-4 transition-all duration-300 ${
                      data.goal === goal.id 
                        ? 'bg-[#3b82f6]/10 border-[#3b82f6] shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      data.goal === goal.id ? 'border-[#3b82f6]' : 'border-gray-500'
                    }`}>
                      {data.goal === goal.id && <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />}
                    </div>
                    <div>
                      <div className="font-bold text-white">{goal.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{goal.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-10 flex items-center justify-between pt-6 border-t border-white/10">
            {step > 1 ? (
              <button 
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                مرحله قبل
              </button>
            ) : (
              <div /> // Empty div for flex spacing
            )}
            
            <button 
              onClick={handleNext}
              disabled={
                (step === 1 && !data.role) || 
                (step === 2 && (!data.workspaceName || !data.teamSize)) ||
                (step === 3 && !data.goal) ||
                isLoading
              }
              className="relative group overflow-hidden px-8 py-3 rounded-xl bg-[#3b82f6] text-white font-bold transition-all hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  در حال آماده‌سازی...
                </>
              ) : (
                <>
                  {step === 3 ? 'ورود به Momentum' : 'مرحله بعد'}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
