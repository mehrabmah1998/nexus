
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#0a0a0f]/80 border-b border-white/5">
      <div className="flex items-center gap-10">
        <div className="text-2xl font-display font-bold tracking-tighter text-[#3b82f6]">
          NEXUS
        </div>
        <div className="hidden md:flex gap-8">
          {['ویژگی‌ها', 'قیمت‌گذاری', 'مستندات', 'درباره ما'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-gray-400 hover:text-[#3b82f6] rtl-underline transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="hidden sm:block text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2">
          ورود
        </button>
        <button className="bg-[#3b82f6] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:translate-y-[-1px] transition-all active:translate-y-0 shadow-[0_4px_12px_rgba(59,130,246,0.15)] hover:shadow-[0_8px_20px_rgba(59,130,246,0.2)] border border-white/10">
          شروع کنید
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
