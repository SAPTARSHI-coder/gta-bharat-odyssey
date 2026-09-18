import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// 1. Water Ripple Effect with SVG Displacement
export function WaterRippleOverlay({ heightPercent = 25 }: { heightPercent?: number }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden z-3"
      style={{ height: `${heightPercent}%` }}
    >
      <svg className="w-0 h-0 absolute">
        <defs>
          <filter id="waterRipple" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.04" numOctaves="2" result="noise">
              <animate
                attributeName="baseFrequency"
                values="0.015 0.04; 0.012 0.07; 0.018 0.03; 0.015 0.04"
                dur="10s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Water Caustics / Light Glints */}
      <div
        className="w-full h-full opacity-25 mix-blend-screen"
        style={{
          filter: 'url(#waterRipple)',
          background: 'linear-gradient(180deg, rgba(255,200,100,0.15) 0%, rgba(0,200,255,0.05) 50%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Horizontal Wave Shimmer Lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent"
          style={{
            left: 0,
            right: 0,
            bottom: `${(i + 1) * 15}%`,
          }}
          animate={{
            x: [-(window.innerWidth * 0.1), window.innerWidth * 0.1],
            opacity: [0.2, 0.6, 0.2],
            scaleY: [1, 2, 1],
          }}
          transition={{
            duration: 4 + i * 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// 2. Flying Birds in Sky (Sunset silhouettes)
export function FlyingBirds({ count = 5 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-3">
      {Array.from({ length: count }).map((_, i) => {
        const startY = 12 + i * 5;
        const duration = 18 + i * 3;
        const delay = i * 2.5;
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: '-10vw', y: `${startY}vh`, opacity: 0 }}
            animate={{
              x: '110vw',
              y: [`${startY}vh`, `${startY - 3}vh`, `${startY + 2}vh`, `${startY}vh`],
              opacity: [0, 0.75, 0.75, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Wing flapping SVG bird */}
            <motion.svg
              width="22"
              height="10"
              viewBox="0 0 22 10"
              className="fill-black/80 drop-shadow-sm"
              animate={{ scaleY: [1, -0.6, 1] }}
              transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M 0 6 Q 6 0 11 5 Q 16 0 22 6 Q 16 4 11 8 Q 6 4 0 6 Z" />
            </motion.svg>
          </motion.div>
        );
      })}
    </div>
  );
}

// 3. Volumetric Sun God Rays & Lens Flares
export function GodRays({ origin = '70% 30%', color = 'rgba(255,180,80,0.12)' }: { origin?: string; color?: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-2 mix-blend-screen">
      {/* Expanding Soft Sun Glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: origin.split(' ')[0],
          top: origin.split(' ')[1],
          background: `radial-gradient(circle, ${color} 0%, rgba(255,120,40,0.06) 40%, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* God Ray Beams */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 45deg at ${origin}, transparent 0deg, ${color} 15deg, transparent 30deg, ${color} 45deg, transparent 65deg, ${color} 80deg, transparent 110deg)`,
        }}
        animate={{ rotate: [0, 4, -4, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// 4. Portal Electric Lightning & Plasma Inflow
export function PortalLightning() {
  const [bolts, setBolts] = useState<Array<{ id: number; path: string; color: string }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random lightning arc from edge to center (50%, 50%)
      const angle = Math.random() * Math.PI * 2;
      const rOuter = 220 + Math.random() * 80;
      const rInner = 80 + Math.random() * 40;

      const x1 = Math.cos(angle) * rOuter;
      const y1 = Math.sin(angle) * rOuter;
      const xMid = Math.cos(angle + (Math.random() - 0.5) * 0.4) * ((rOuter + rInner) / 2);
      const yMid = Math.sin(angle + (Math.random() - 0.5) * 0.4) * ((rOuter + rInner) / 2);
      const x2 = Math.cos(angle) * rInner;
      const y2 = Math.sin(angle) * rInner;

      const newBolt = {
        id: Date.now(),
        path: `M ${x1} ${y1} Q ${xMid} ${yMid} ${x2} ${y2}`,
        color: Math.random() > 0.5 ? '#00f5ff' : '#b347ff',
      };

      setBolts(prev => [...prev.slice(-3), newBolt]);
    }, 280);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-3">
      {/* Lightning SVG */}
      <svg className="w-[800px] h-[800px] overflow-visible" viewBox="-400 -400 800 800">
        {bolts.map(b => (
          <path
            key={b.id}
            d={b.path}
            fill="none"
            stroke={b.color}
            strokeWidth={Math.random() * 2.5 + 1.5}
            strokeLinecap="round"
            filter="drop-shadow(0 0 8px #00f5ff)"
            opacity={0.9}
          />
        ))}
      </svg>

      {/* Swirling Inflow Dust Particles */}
      <div className="absolute w-[400px] h-[400px] rounded-full animate-spin pointer-events-none" style={{ animationDuration: '8s' }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${50 + Math.cos((i / 16) * Math.PI * 2) * 45}%`,
              top: `${50 + Math.sin((i / 16) * Math.PI * 2) * 45}%`,
              background: i % 2 === 0 ? '#00f5ff' : '#b347ff',
              boxShadow: '0 0 10px currentColor',
            }}
            animate={{
              scale: [1, 0],
              opacity: [1, 0],
            }}
            transition={{
              duration: 1.6,
              delay: (i % 8) * 0.2,
              repeat: Infinity,
              ease: 'easeIn',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// 5. Delhi India Gate Eternal Flame & Rising Embers
export function AmarJawanFlame() {
  return (
    <div className="absolute left-1/2 bottom-[38%] -translate-x-1/2 pointer-events-none z-3 flex flex-col items-center">
      {/* Central Flame Glow */}
      <motion.div
        className="w-8 h-12 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at 50% 90%, #ffffff 0%, #ffee44 35%, #ff5500 70%, transparent 100%)',
          filter: 'drop-shadow(0 0 20px #ff6b35) drop-shadow(0 0 40px #ff9933)',
        }}
        animate={{
          scaleX: [1, 1.25, 0.9, 1.15, 1],
          scaleY: [1, 1.15, 1.3, 0.95, 1],
          y: [0, -3, 2, -2, 0],
        }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rising Embers / Sparks */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-amber-300"
          style={{
            boxShadow: '0 0 6px #ff7700',
            left: `${(Math.random() - 0.5) * 20}px`,
            bottom: '10px',
          }}
          animate={{
            y: [0, -70 - Math.random() * 40],
            x: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 30],
            opacity: [1, 0.8, 0],
            scale: [1, 1.5, 0],
          }}
          transition={{
            duration: 1.4 + Math.random() * 0.8,
            delay: i * 0.2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// 6. Car Headlight & Streetlamp Light Beams
export function HeadlightBeams({ beams }: { beams: Array<{ left: string; bottom: string; width: string; height: string; color?: string; angle?: number }> }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-3">
      {beams.map((b, i) => (
        <motion.div
          key={i}
          className="absolute origin-left rounded-full mix-blend-screen"
          style={{
            left: b.left,
            bottom: b.bottom,
            width: b.width,
            height: b.height,
            transform: `rotate(${b.angle || 0}deg)`,
            background: `linear-gradient(90deg, ${b.color || 'rgba(255,240,180,0.85)'} 0%, rgba(255,220,100,0.2) 60%, transparent 100%)`,
            filter: 'blur(3px)',
          }}
          animate={{
            opacity: [0.75, 1, 0.85, 1],
          }}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// 7. Kolkata River Fog & Mist Drift
export function RiverMist() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none overflow-hidden z-3 mix-blend-screen">
      <motion.div
        className="w-[200%] h-full flex"
        animate={{ x: [0, -window.innerWidth] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="w-1/2 h-full opacity-35"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(160,200,255,0.4) 0%, rgba(100,160,255,0.15) 50%, transparent 80%)',
            filter: 'blur(12px)',
          }}
        />
        <div
          className="w-1/2 h-full opacity-35"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(160,200,255,0.4) 0%, rgba(100,160,255,0.15) 50%, transparent 80%)',
            filter: 'blur(12px)',
          }}
        />
      </motion.div>
    </div>
  );
}
