
import React, { useMemo } from 'react';

export const NoiseOverlay: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] noise mix-blend-overlay" />
);

export const AnimatedBackground: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 15 + 10, 
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#07070a]">
      {/* DOTS PATTERN - High precision rendering */}
      <div 
        className="absolute inset-0 z-[10] opacity-[0.3] mix-blend-overlay" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1.5px, transparent 0)`,
          backgroundSize: '40px 40px',
          transform: 'translateZ(0)',
        }} 
      />

      {/* Dynamic Grid Overlay - Subtle bleed to avoid edges */}
      <div 
        className="absolute -inset-1 opacity-[0.03] z-[1]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          transform: 'translateZ(0)',
        }} 
      />

      {/* LIGHT ORBS - Expanded size with edge-bleed to prevent clipping */}
      <div className="absolute -top-[10%] -left-[10%] w-[120vw] h-[120vw] rounded-full blur-[200px] opacity-[0.1] mix-blend-screen animate-nexus-orb-1 bg-blue-600 will-change-transform" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[110vw] h-[110vw] rounded-full blur-[180px] opacity-[0.08] mix-blend-screen animate-nexus-orb-2 bg-cyan-500 will-change-transform" />
      <div className="absolute top-1/2 left-1/2 w-[100vw] h-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[220px] opacity-[0.06] mix-blend-screen animate-nexus-orb-3 bg-indigo-700 will-change-transform" />

      {/* Floating Ambient Embers */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-blue-400/20 rounded-full blur-[1px] animate-drift will-change-transform"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.delay}s`,
          }}
        />
      ))}
      
      {/* Global Vignette - Reinforced to hide edge seams */}
      <div className="absolute inset-[-1px] z-[20] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,7,10,0.3)_60%,rgba(7,7,10,1)_100%)]" />

      <style>{`
        @keyframes nexus-orb-1 {
          0% { transform: translate3d(-5%, -5%, 0) scale(1); }
          50% { transform: translate3d(5%, 5%, 0) scale(1.1); }
          100% { transform: translate3d(-5%, -5%, 0) scale(1); }
        }

        @keyframes nexus-orb-2 {
          0% { transform: translate3d(5%, 5%, 0) scale(1); }
          50% { transform: translate3d(-5%, -5%, 0) scale(1.15); }
          100% { transform: translate3d(5%, 5%, 0) scale(1); }
        }

        @keyframes nexus-orb-3 {
          0% { transform: translate3d(-50%, -50%, 0) rotate(0deg); }
          100% { transform: translate3d(-50%, -50%, 0) rotate(360deg); }
        }

        @keyframes drift {
          0% { transform: translate3d(0, 0, 0); opacity: 0; }
          20% { opacity: 0.4; }
          80% { opacity: 0.4; }
          100% { transform: translate3d(40px, -110vh, 0); opacity: 0; }
        }
        
        .animate-nexus-orb-1 { animation: nexus-orb-1 20s infinite ease-in-out; }
        .animate-nexus-orb-2 { animation: nexus-orb-2 25s infinite ease-in-out; }
        .animate-nexus-orb-3 { animation: nexus-orb-3 40s infinite linear; }
        .animate-drift { animation: drift infinite linear; }
      `}</style>
    </div>
  );
};
