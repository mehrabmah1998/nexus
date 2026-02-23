
import React from 'react';

const ApiAccess: React.FC<{ isVisible: boolean; delay: number }> = ({ isVisible, delay }) => {
  return (
    <div 
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative overflow-hidden rounded-[2.5rem] p-10 bg-[#0a0a0f] border border-white/5 hover:border-blue-500/30 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="relative z-10 text-right">
         <div className="mb-8 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 inline-block relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" className="relative z-10">
            <polyline points="16 18 22 12 16 6" className="transform transition-transform duration-500 group-hover:translate-x-1" />
            <polyline points="8 6 2 12 8 18" className="transform transition-transform duration-500 group-hover:-translate-x-1" />
            <line x1="12" y1="4" x2="12" y2="20" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" strokeDasharray="4 4" />
          </svg>
        </div>
        <h4 className="text-2xl font-display font-black text-white mb-4">دسترسی کامل API</h4>
        <div className="mt-6 space-y-2 opacity-30 group-hover:opacity-100 transition-all duration-700 transform group-hover:translate-x-[-10px]">
           <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-blue-500 w-1/3 group-hover:w-full transition-all duration-[2000ms]" />
           </div>
           <div className="h-1.5 w-2/3 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ApiAccess;
