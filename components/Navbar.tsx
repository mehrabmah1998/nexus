
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (view: 'landing' | 'auth-login' | 'auth-signup' | 'onboarding' | 'dashboard') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-6 pointer-events-none">
      <nav 
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
        className={`
          pointer-events-auto
          flex items-center justify-between 
          w-full max-w-7xl 
          transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)
          border
          ${scrolled 
            ? 'rounded-[1.75rem] bg-white/[0.04] backdrop-blur-[32px] saturate-150 border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] py-2.5 px-3' 
            : 'rounded-2xl bg-white/0 backdrop-blur-0 border-transparent py-5 px-0 shadow-none'
          }
        `}
      >
        {/* RIGHT SIDE: Brand / Logo - Aligned to grid edge */}
        <div className="flex items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavigate('landing')}>
            {/* Premium DOC Icon Container */}
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-[#3b82f6]/10 group-hover:border-[#3b82f6]/40 group-hover:scale-110 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
                    stroke="#3b82f6" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="group-hover:stroke-white transition-colors duration-300"
                  />
                  <path d="M14 2V8H20" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors duration-300"/>
                  <path d="M16 13H8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  <path d="M16 17H8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  <path d="M10 9H8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-xl bg-[#3b82f6]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Farsi Name */}
            <div className="text-xl font-display font-black tracking-tight text-white transition-all duration-300 group-hover:text-[#3b82f6]">
              Momentum
            </div>
          </div>
        </div>

        {/* CENTER: Links */}
        <div className="hidden lg:flex items-center gap-10">
          {['ویژگی‌ها', 'قیمت‌گذاری', 'مستندات', 'درباره ما'].map((item) => (
            <a
              key={item}
              href="#"
              className="group relative text-[13px] font-bold text-gray-400/80 hover:text-white transition-all duration-300 tracking-tight"
            >
              {item}
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#3b82f6] opacity-0 group-hover:opacity-100 transition-all duration-400 scale-0 group-hover:scale-100 shadow-[0_0_10px_#3b82f6]" />
            </a>
          ))}
        </div>

        {/* LEFT SIDE: Action Buttons - Aligned to grid edge */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate('auth-login')}
            className="hidden sm:block text-[13px] font-bold text-gray-400 hover:text-white transition-all px-5 py-2.5 hover:bg-white/5 rounded-xl"
          >
            ورود
          </button>

          <button 
            onClick={() => onNavigate('auth-signup')}
            className="relative group overflow-hidden px-7 py-3 rounded-2xl bg-[#3b82f6] text-white font-bold text-sm transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0 shadow-[0_10px_30px_rgba(59,130,246,0.2)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)]"
          >
            <span className="relative z-10">شروع کنید</span>
            <div className="absolute inset-0 z-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
