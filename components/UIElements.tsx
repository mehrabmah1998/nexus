
import React, { useMemo } from 'react';

export const NoiseOverlay: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] noise mix-blend-overlay" />
);

export const SectionBackground: React.FC<{
  fadeTop?: boolean;
  fadeBottom?: boolean;
}> = ({ 
  fadeTop = true,
  fadeBottom = true
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 15 + 10, 
      delay: Math.random() * 10,
    }));
  }, []);

  // Use fixed pixel values for the fade so it doesn't stretch too far on tall sections
  const maskImage = `linear-gradient(to bottom, ${fadeTop ? 'transparent 0%, black 150px' : 'black 0%, black 150px'}, black calc(100% - 150px), ${fadeBottom ? 'transparent 100%' : 'black 100%'})`;

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#07070a]"
      style={{
        maskImage,
        WebkitMaskImage: maskImage
      }}
    >
      {/* LIGHT ORBS - Strictly Blue Palette, slightly higher opacity so the grid catches the light */}
      <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-[0.3] mix-blend-screen animate-momentum-orb-1 bg-blue-600 will-change-transform" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-[0.25] mix-blend-screen animate-momentum-orb-2 bg-blue-500 will-change-transform" />
      <div className="absolute top-1/2 left-1/2 w-[80%] h-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] opacity-[0.2] mix-blend-screen animate-momentum-orb-3 bg-blue-700 will-change-transform" />

      {/* Overlay Grid - Explicitly set mixBlendMode. Blends with the bg-[#07070a] and the blue orbs */}
      <div 
        className="absolute inset-0 z-[11]" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          mixBlendMode: 'overlay',
        }} 
      />

      {/* Floating Ambient Embers */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-white/20 rounded-full blur-[1px] animate-drift will-change-transform z-[12]"
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
      
      {/* Global Vignette */}
      <div className="absolute inset-[-1px] z-[20] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,7,10,0.5)_70%,rgba(7,7,10,1)_100%)]" />

      <style>{`
        @keyframes momentum-orb-1 {
          0% { transform: translate3d(-10%, -10%, 0) scale(1); }
          33% { transform: translate3d(20%, 15%, 0) scale(1.2); }
          66% { transform: translate3d(-5%, 25%, 0) scale(0.9); }
          100% { transform: translate3d(-10%, -10%, 0) scale(1); }
        }

        @keyframes momentum-orb-2 {
          0% { transform: translate3d(10%, 10%, 0) scale(1); }
          33% { transform: translate3d(-20%, -15%, 0) scale(1.15); }
          66% { transform: translate3d(15%, -25%, 0) scale(0.85); }
          100% { transform: translate3d(10%, 10%, 0) scale(1); }
        }

        @keyframes momentum-orb-3 {
          0% { transform: translate3d(-50%, -50%, 0) rotate(0deg) scale(1); }
          33% { transform: translate3d(-40%, -60%, 0) rotate(120deg) scale(1.1); }
          66% { transform: translate3d(-60%, -40%, 0) rotate(240deg) scale(0.9); }
          100% { transform: translate3d(-50%, -50%, 0) rotate(360deg) scale(1); }
        }

        @keyframes drift {
          0% { transform: translate3d(0, 0, 0); opacity: 0; }
          20% { opacity: 0.4; }
          80% { opacity: 0.4; }
          100% { transform: translate3d(40px, -110vh, 0); opacity: 0; }
        }
        
        .animate-momentum-orb-1 { animation: momentum-orb-1 25s infinite cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-momentum-orb-2 { animation: momentum-orb-2 30s infinite cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-momentum-orb-3 { animation: momentum-orb-3 35s infinite cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-drift { animation: drift infinite linear; }
      `}</style>
    </div>
  );
};
