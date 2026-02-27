import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AuthSlideshow from './AuthSlideshow';
import { SectionBackground } from './UIElements';

interface AuthProps {
  onLoginSuccess: (mode: 'login' | 'signup') => void;
  onBack: () => void;
  initialMode?: 'login' | 'signup';
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess, onBack, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(mode);
    }, 1500);
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }
  };

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length >= 8) score += 1;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 1;
    if (/\d/.test(pass)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(password);
  
  const getStrengthColor = () => {
    if (strength === 0) return 'bg-white/10';
    if (strength === 1) return 'bg-red-500';
    if (strength === 2) return 'bg-yellow-500';
    if (strength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength === 0) return '';
    if (strength === 1) return 'ضعیف';
    if (strength === 2) return 'متوسط';
    if (strength === 3) return 'خوب';
    return 'قوی';
  };

  const getStrengthTextColor = () => {
    if (strength === 1) return 'text-red-500';
    if (strength === 2) return 'text-yellow-500';
    if (strength === 3) return 'text-blue-500';
    if (strength === 4) return 'text-green-500';
    return 'text-gray-500';
  };

  return (
    <div className="relative min-h-screen flex bg-transparent overflow-hidden selection:bg-[#3b82f6] selection:text-white" dir="rtl">
      <SectionBackground fadeTop={false} fadeBottom={false} />
      
      {/* Right Side - Auth Form (First in DOM for RTL) */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 2V8H20" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-display font-black tracking-tight text-white">Momentum</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 py-12 relative">
          
          <button 
            onClick={onBack}
            className="absolute top-8 right-8 z-50 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <span className="font-bold text-sm">بازگشت</span>
          </button>

          <div className="w-full max-w-[420px] mx-auto mt-12">
            <div className="mb-10 text-right">
              <h1 className="text-4xl font-display font-black text-white mb-3">
                {mode === 'login' ? 'خوش آمدید!' : 'ساخت حساب جدید'}
              </h1>
              <p className="text-gray-400 font-light">
                {mode === 'login' ? 'برای ادامه به حساب کاربری خود وارد شوید.' : 'برای شروع، اطلاعات زیر را تکمیل کنید.'}
              </p>
            </div>

            {/* Tabs */}
            <div className="relative flex p-1.5 bg-white/[0.03] border border-white/5 rounded-2xl mb-10">
              <button 
                onClick={() => setMode('login')}
                className={`relative z-10 flex-1 py-3 text-sm font-bold rounded-xl transition-colors ${mode === 'login' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <span className="relative z-20">ورود</span>
                <AnimatePresence>
                  {mode === 'login' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 bg-white/10 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.2)] border border-white/10 z-10"
                    />
                  )}
                </AnimatePresence>
              </button>
              <button 
                onClick={() => setMode('signup')}
                className={`relative z-10 flex-1 py-3 text-sm font-bold rounded-xl transition-colors ${mode === 'signup' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <span className="relative z-20">ثبت‌نام</span>
                <AnimatePresence>
                  {mode === 'signup' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 bg-white/10 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.2)] border border-white/10 z-10"
                    />
                  )}
                </AnimatePresence>
              </button>
            </div>

            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.form 
                  key={mode}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={handleSubmit} 
                  className="flex flex-col gap-6 w-full"
                >
                  {mode === 'signup' && (
                    <div className="flex flex-col gap-2.5">
                      <label className="text-sm font-bold text-gray-300 ml-1">نام و نام خانوادگی</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/50 focus:bg-white/[0.05] transition-all shadow-inner"
                        placeholder="علی محمدی"
                      />
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2.5">
                    <label className="text-sm font-bold text-gray-300 ml-1">ایمیل</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/50 focus:bg-white/[0.05] transition-all text-left shadow-inner"
                      placeholder="name@company.com"
                      dir="ltr"
                    />
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-sm font-bold text-gray-300">رمز عبور</label>
                      {mode === 'login' && (
                        <a href="#" className="text-xs font-bold text-[#3b82f6] hover:text-blue-400 transition-colors">فراموشی رمز؟</a>
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/50 focus:bg-white/[0.05] transition-all text-left shadow-inner pr-12"
                        placeholder="••••••••"
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                    
                    {mode === 'signup' && (
                      <div className="mt-2 flex flex-col gap-2">
                        <div className="flex gap-1.5 w-full h-1.5">
                          {[1, 2, 3, 4].map((level) => (
                            <div 
                              key={level} 
                              className={`flex-1 rounded-full transition-all duration-300 ${
                                password.length === 0 ? 'bg-white/10' : 
                                strength >= level ? getStrengthColor() : 'bg-white/10'
                              }`} 
                            />
                          ))}
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-light">حداقل ۸ کاراکتر، شامل حروف و اعداد</span>
                          {password.length > 0 && (
                            <span className={`font-bold transition-colors ${getStrengthTextColor()}`}>
                              {getStrengthText()}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full relative group overflow-hidden rounded-2xl bg-[#3b82f6] text-white font-bold text-base py-4 mt-6 transition-all hover:translate-y-[-2px] active:translate-y-0 shadow-[0_10px_30px_rgba(59,130,246,0.2)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <div className="absolute inset-0 z-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                    
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          در حال پردازش...
                        </>
                      ) : (
                        mode === 'login' ? 'ورود به حساب' : 'ایجاد حساب کاربری'
                      )}
                    </span>
                  </button>
                </motion.form>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">یا ادامه با</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="mt-8 flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-3 py-3.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-2xl transition-all text-sm font-bold text-gray-300 hover:text-white group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                گوگل
              </button>
              <button className="flex-1 flex items-center justify-center gap-3 py-3.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-2xl transition-all text-sm font-bold text-gray-300 hover:text-white group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                گیت‌هاب
              </button>
            </div>
            
            <p className="mt-10 text-center text-xs text-gray-500 font-light leading-relaxed">
              با ورود یا ثبت‌نام، شما <a href="#" className="text-blue-400 hover:underline">شرایط استفاده</a> و <a href="#" className="text-blue-400 hover:underline">حریم خصوصی</a> Momentum را می‌پذیرید.
            </p>
          </div>
        </div>
      </div>

      {/* Left Side - Slideshow (Second in DOM for RTL) */}
      <AuthSlideshow />

    </div>
  );
};

export default Auth;
