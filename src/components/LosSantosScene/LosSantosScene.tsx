import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';

export function LosSantosScene() {
  const { character } = useGame();
  const [stage, setStage] = useState<'explore' | 'portal_discovered'>('explore');

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Keyboard shortcut [E] or [Space] to interact
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E' || e.key === ' ') {
        if (stage === 'explore') {
          setStage('portal_discovered');
        } else if (stage === 'portal_discovered') {
          scrollToSection('section-portal');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage]);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between py-24 px-6 md:px-12 select-none">
      {/* Center Cinematic Story Narrative */}
      <div className="relative z-20 my-auto text-center max-w-3xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="hud-element text-xs md:text-sm tracking-[0.4em] text-amber-400 mb-3 font-bold"
        >
          ◈ CHAPTER 1: PACIFIC SHORES ◈
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cinematic text-5xl sm:text-7xl md:text-8xl text-white mb-4 leading-tight"
          style={{ textShadow: '0 5px 35px rgba(0,0,0,0.9), 0 0 50px rgba(255,107,53,0.5)' }}
        >
          {stage === 'portal_discovered' ? 'SOMETHING AIN\'T RIGHT' : 'DEL PERRO BEACH'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-game text-sm sm:text-base md:text-lg text-white/85 tracking-wider max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          {stage === 'portal_discovered'
            ? 'The air crackles with violet static. The ocean turns silent. A dimensional rift tears open between the dumpsters — wide enough to walk through.'
            : 'Sun drops behind Del Perro pier. Pacific waves catch the last gold light. You\'ve got heat on your tail and nowhere left to run — except forward.'}
        </motion.p>
      </div>

      {/* Glowing Interactive Portal Marker */}
      {stage === 'portal_discovered' && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="relative z-30 cursor-pointer mx-auto my-4"
          onClick={() => scrollToSection('section-portal')}
        >
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                boxShadow: [
                  '0 0 30px #b347ff, 0 0 60px #00f5ff',
                  '0 0 60px #ff2d87, 0 0 100px #b347ff',
                  '0 0 30px #b347ff, 0 0 60px #00f5ff',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400"
            >
              <span className="text-2xl animate-spin">🌀</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-3 glass-panel px-3.5 py-1 text-center border border-purple-400"
            >
              <div className="font-game text-xs text-white font-bold tracking-widest flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px]">E</span>
                <span>STEP INTO RIFT</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Bottom Interactive Action Controls */}
      <div className="relative z-30 flex flex-col items-center gap-3 mt-auto">
        <AnimatePresence mode="wait">
          {stage === 'explore' ? (
            <motion.button
              key="explore-btn"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              onClick={() => setStage('portal_discovered')}
              className="game-btn-orange px-8 py-3.5 text-sm md:text-base flex items-center gap-3 cursor-pointer shadow-xl"
            >
              <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/20 font-bold">E</span>
              <span className="font-bold tracking-wider">SWEEP THE COAST →</span>
            </motion.button>
          ) : (
            <motion.button
              key="portal-btn"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => scrollToSection('section-portal')}
              className="game-btn-purple px-10 py-4 text-base md:text-lg flex items-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(179,71,255,0.8)]"
            >
              <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">SPACE</span>
              <span className="font-bold tracking-wider">STEP INTO THE RIFT [SCROLL DOWN] →</span>
            </motion.button>
          )}
        </AnimatePresence>

        <div className="font-game text-[11px] text-white/50 tracking-widest">
          {character ? `OPERATIVE: ${character.name.toUpperCase()} · ${character.title}` : '[ UNREGISTERED OPERATIVE ]'}
        </div>
      </div>
    </div>
  );
}

