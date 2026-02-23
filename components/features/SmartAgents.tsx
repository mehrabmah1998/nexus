
import React from 'react';

const SmartAgents: React.FC<{ isVisible: boolean; delay: number }> = ({ isVisible, delay }) => {
  return (
    <div 
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative overflow-hidden rounded-[2.5rem] p-10 bg-[#0a0a0f] border border-white/5 hover:border-blue-500/30 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="relative z-10 text-right">
        <div className="mb-8 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 inline-block transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" className="transition-transform duration-500 group-hover:-translate-y-2" />
            <path d="M2 12l10 5 10-5" className="transition-transform duration-500" />
            <path d="M2 17l10 5 10-5" className="transition-transform duration-500 group-hover:translate-y-2" />
          </svg>
        </div>
        <h4 className="text-2xl font-display font-black text-white mb-4">عامل‌های هوشمند</h4>
        <p className="text-gray-500 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
          دستیارهای خودمختار که با هر کلیک شما هوشمندتر می‌شوند و وظایف پیچیده را با دقت انسانی انجام می‌دهند.
        </p>
      </div>
      <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-blue-500/5 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
    </div>
  );
};

export default SmartAgents;
