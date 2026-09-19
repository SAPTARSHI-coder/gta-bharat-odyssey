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
      if (e.key === 'e' || e.key === 'E' || e.key === ' ' || e.key === 'Enter') {
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
      {/* Center Cinematic City Title ONLY - Zero Visual Obstruction */}
      <div className="relative z-20 my-auto text-center max-w-4xl mx-auto pointer-events-none px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="hud-element text-xs md:text-sm tracking-[0.4em] text-amber-400 mb-2 font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
        >
          ★ MISSION 01: VINEWOOD HEAT // 2-STAR WANTED ★
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cinematic text-6xl sm:text-8xl md:text-[9rem] text-white leading-none select-none"
          style={{ textShadow: '0 6px 30px rgba(0,0,0,1), 0 0 50px rgba(255,107,53,0.5)' }}
        >
          {stage === 'portal_discovered' ? 'THE PACIFIC JUST BROKE' : 'DEL PERRO PIER'}
        </motion.h2>
      </div>

      {/* Top-Right Cinematic Tactical Intel Card */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="absolute top-24 sm:top-28 right-4 sm:right-10 md:right-16 max-w-xs sm:max-w-sm z-30 pointer-events-none"
      >
        <div className="bg-neutral-950/85 backdrop-blur-xl border-l-4 border-amber-400 border-y border-r border-white/15 rounded-r-xl p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(255,107,53,0.15)]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-game text-[10px] tracking-widest text-amber-400 font-bold uppercase">
              TACTICAL INTEL // PACIFIC COAST
            </span>
          </div>

          <p className="font-game text-xs sm:text-sm text-white font-medium tracking-wide leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            {stage === 'portal_discovered'
              ? "Forget the LSPD. The alleyway dumpsters just vaporized into purple static. An electric rift is tearing through the concrete like tissue paper, smelling like ozone, burning rubber, and spicy street food from an entirely different hemisphere. Jump through or enjoy 25-to-life in Bolingbroke."
              : "Del Perro Beach at dusk. Smog hanging thick over the Pacific, police choppers spotlighting the coastline, and your Comet's engine is ticking on zero coolant. You've got two stars, twenty bucks, and nowhere left to run in Los Santos. Check the alley."}
          </p>
        </div>
      </motion.div>

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
                <span>PULL THE TRIGGER // ENTER RIFT</span>
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
              <span className="font-bold tracking-wider">SCOUT THE ALLEYWAY [SHAKE THE HEAT] →</span>
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
              <span className="font-bold tracking-wider">DITCH SAN ANDREAS → DIVE INTO THE RIFT →</span>
            </motion.button>
          )}
        </AnimatePresence>

        <div className="font-game text-[11px] text-white/50 tracking-widest">
          {character ? `WANTED SUSPECT: ${character.name.toUpperCase()} · ${character.title} · BOUNTY ACTIVE` : '[ SUSPECT UNIDENTIFIED ]'}
        </div>
      </div>
    </div>
  );
}

