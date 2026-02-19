
import React, { useMemo } from 'react';

export const NoiseOverlay: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] noise mix-blend-overlay" />
);

export const AnimatedBackground: React.FC = () => {
  // Generate particles with subtle presence for ambient depth
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
      {/* 
          TEXTURE: DOTS PATTERN (Overlay Mode)
          In Overlay mode, white dots disappear against the dark (#07070a) background 
          but 'pop' and become visible when they overlap with the colored animated orbs.
      */}
      <div 
        className="absolute inset-0 z-[10] opacity-[0.6] mix-blend-overlay" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.8) 1.5px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} 
      />

      {/* Texture: Dynamic Grid Overlay (Behind orbs) */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-[1]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)'
        }} 
      />

      {/* 
          ORB SYSTEM: 3 Moving, Color-Shifting Shapes
          Using 'screen' blending for additive lighting effects.
          These act as the 'light source' that makes the Overlay dots visible.
      */}
      
      {/* Orb 1: Primary Nexus (Blue to Indigo) */}
      <div className="absolute top-1/4 left-1/4 w-[75vw] h-[75vw] rounded-full blur-[140px] opacity-[0.15] mix-blend-screen animate-nexus-orb-1 bg-blue-600" />
      
      {/* Orb 2: Secondary Flow (Cyan to Azure) */}
      <div className="absolute bottom-1/4 right-1/4 w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-[0.12] mix-blend-screen animate-nexus-orb-2 bg-cyan-500" />
      
      {/* Orb 3: Tertiary Ambient (Indigo to Deep Blue) */}
      <div className="absolute top-1/2 left-1/2 w-[65vw] h-[65vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px] opacity-[0.10] mix-blend-screen animate-nexus-orb-3 bg-indigo-700" />

      {/* Floating Ambient Embers */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-blue-400/10 rounded-full blur-[1px] animate-drift"
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
      
      {/* Global Vignette for Depth */}
      <div className="absolute inset-0 z-[20] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,7,10,0.4)_70%,rgba(7,7,10,0.95)_100%)]" />

      <style>{`
        /* ORB 1: Faster circular drift + Blue/Indigo hue shift */
        @keyframes nexus-orb-1 {
          0% { transform: translate(-15%, -15%) scale(1); background-color: #2563eb; }
          33% { transform: translate(20%, 10%) scale(1.15); background-color: #3b82f6; }
          66% { transform: translate(-10%, 20%) scale(0.9); background-color: #4f46e5; }
          100% { transform: translate(-15%, -15%) scale(1); background-color: #2563eb; }
        }

        /* ORB 2: Faster counter-flow drift + Cyan/Azure hue shift */
        @keyframes nexus-orb-2 {
          0% { transform: translate(15%, 15%) scale(1); background-color: #06b6d4; }
          50% { transform: translate(-25%, -10%) scale(1.2); background-color: #0ea5e9; }
          100% { transform: translate(15%, 15%) scale(1); background-color: #06b6d4; }
        }

        /* ORB 3: Faster central slow pulse + Indigo/Violet-Blue hue shift */
        @keyframes nexus-orb-3 {
          0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); background-color: #4338ca; }
          50% { transform: translate(-40%, -60%) scale(1.3) rotate(180deg); background-color: #2563eb; }
          100% { transform: translate(-50%, -50%) scale(1) rotate(360deg); background-color: #4338ca; }
        }

        @keyframes drift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-100vh) translateX(60px); opacity: 0; }
        }
        
        .animate-nexus-orb-1 { animation: nexus-orb-1 12s infinite ease-in-out; }
        .animate-nexus-orb-2 { animation: nexus-orb-2 16s infinite ease-in-out; }
        .animate-nexus-orb-3 { animation: nexus-orb-3 20s infinite linear; }
        .animate-drift { animation: drift infinite linear; }
      `}</style>
    </div>
  );
};

export const DiagonalDivider: React.FC = () => (
  <div className="absolute left-0 w-full h-32 bg-[#0a0a0f] -translate-y-16 -skew-y-2 z-10" />
);
