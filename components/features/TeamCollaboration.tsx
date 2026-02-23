
import React from 'react';

const TeamCollaboration: React.FC<{ isVisible: boolean; delay: number }> = ({ isVisible, delay }) => {
  return (
    <div 
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative overflow-hidden rounded-[2.5rem] p-10 bg-[#0a0a0f] border border-white/5 hover:border-blue-500/30 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="relative z-10 text-right">
        <div className="mb-8 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 inline-block transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] relative">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" className="relative z-10 transition-transform duration-500 group-hover:scale-110">
             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" className="transition-all duration-500 group-hover:stroke-blue-400" />
             <circle cx="9" cy="7" r="4" className="transition-all duration-500 group-hover:fill-blue-500/20 group-hover:stroke-blue-400" />
             <path d="M23 21v-2a4 4 0 0 0-3-3.87" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 group-hover:stroke-blue-400" />
             <path d="M16 3.13a4 4 0 0 1 0 7.75" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 group-hover:stroke-blue-400" />
          </svg>
          <div className="absolute inset-0 rounded-2xl border border-blue-400/0 group-hover:border-blue-400/50 group-hover:scale-110 transition-all duration-500 opacity-0 group-hover:opacity-100" />
        </div>
        <h4 className="text-2xl font-display font-black text-white mb-4">همکاری لحظه‌ای</h4>
        <p className="text-gray-500 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
          بدون مرز، بدون تاخیر. پروژه‌ها را به صورت تیمی و در محیطی کاملاً یکپارچه و امن به پیش ببرید.
        </p>
      </div>
      {/* Particle trail effect */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

export default TeamCollaboration;
