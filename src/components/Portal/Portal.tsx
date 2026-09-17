import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '../../utils/audio';

function PortalRing({ radius, color, duration, opacity }: {
  radius: number; color: string; duration: number; opacity: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full border-2 pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        borderColor: color,
        opacity,
        boxShadow: `0 0 25px ${color}, inset 0 0 25px ${color}`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{ rotate: [0, 360], scale: [1, 1.04, 1] }}
      transition={{ rotate: { duration, repeat: Infinity, ease: 'linear' }, scale: { duration: 2.2, repeat: Infinity } }}
    />
  );
}

export function Portal() {
  const [phase, setPhase] = useState<'idle' | 'warping'>('idle');

  const scrollToMumbai = () => {
    sounds.playPortalWarp();
    setPhase('warping');
    setTimeout(() => {
      document.getElementById('section-mumbai')?.scrollIntoView({ behavior: 'smooth' });
      setPhase('idle');
    }, 1200);
  };

  // Keyboard shortcut [E] or [Space] to enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'e' || e.key === 'E' || e.key === ' ') && phase === 'idle') {
        const portalEl = document.getElementById('section-portal');
        if (portalEl) {
          const rect = portalEl.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            scrollToMumbai();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase]);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between py-24 px-6 select-none overflow-hidden">
      {/* Narrative Header */}
      <div className="relative z-20 text-center max-w-2xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          className="hud-element text-purple-400 mb-2 font-bold tracking-[0.4em]"
        >
          ◈ CHAPTER 2: THE COSMIC RIFT ◈
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          className="font-cinematic text-5xl sm:text-7xl md:text-8xl text-white mb-2"
          style={{ textShadow: '0 0 40px #b347ff' }}
        >
          UNKNOWN DESTINATION
        </motion.h2>
        <p className="text-white/70 font-game text-sm md:text-base tracking-wider max-w-xl mx-auto">
          A fracture in the fabric of space. The street neon of Los Santos bends around the singularity.
        </p>
      </div>

      {/* Central Portal Vortex Interactive Target */}
      <div className="relative z-20 flex flex-col items-center my-6">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
          <PortalRing radius={190} color="rgba(179,71,255,0.25)" duration={22} opacity={0.3} />
          <PortalRing radius={165} color="rgba(0,245,255,0.4)" duration={16} opacity={0.5} />
          <PortalRing radius={140} color="#b347ff" duration={11} opacity={0.7} />
          <PortalRing radius={115} color="#00f5ff" duration={8} opacity={0.85} />

          {/* Central Pulsing Vortex Glow */}
          <motion.div
            className="absolute rounded-full flex items-center justify-center cursor-pointer"
            style={{
              width: 160,
              height: 160,
              background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(179,71,255,0.85) 35%, rgba(0,245,255,0.6) 70%, transparent 100%)',
              boxShadow: '0 0 60px #b347ff, 0 0 120px #00f5ff',
            }}
            animate={phase === 'warping' ? {
              scale: [1, 1.8, 1.4],
              boxShadow: '0 0 150px #b347ff, 0 0 350px #00f5ff, 0 0 500px #fff',
            } : {
              scale: [1, 1.08, 1],
            }}
            transition={{ duration: phase === 'warping' ? 0.8 : 2.5, repeat: phase === 'warping' ? 1 : Infinity }}
            onClick={scrollToMumbai}
          >
            <motion.div
              className="text-4xl text-white font-bold"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              🌀
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enter Button Action */}
      <div className="relative z-30 flex flex-col items-center gap-2 mt-auto">
        <motion.button
          onClick={scrollToMumbai}
          className="game-btn-purple text-base md:text-lg px-12 py-4 flex items-center gap-3 cursor-pointer shadow-[0_0_40px_rgba(179,71,255,0.9)]"
        >
          <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">
            E
          </span>
          <span className="font-bold tracking-wider">ENTER PORTAL → WARP TO MUMBAI</span>
        </motion.button>
        <div className="font-game text-xs text-cyan-300/70 tracking-widest">
          COORDINATES LOCKED: MUMBAI, BHARAT
        </div>
      </div>

      {/* Warp Flash Overlay */}
      <AnimatePresence>
        {phase === 'warping' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
