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
      {/* Center Cinematic Story Narrative in High-Contrast Frosted Dossier Card */}
      <div className="relative z-20 my-auto text-center max-w-3xl mx-auto pointer-events-none px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="bg-neutral-950/80 backdrop-blur-2xl border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_30px_rgba(255,107,53,0.2)] max-w-2xl mx-auto"
        >
          <div className="hud-element text-xs md:text-sm tracking-[0.35em] text-amber-400 mb-2 font-bold">
            ★ MISSION 01: VINEWOOD HEAT // 2-STAR WANTED ★
          </div>

          <h2
            className="font-cinematic text-5xl sm:text-7xl md:text-8xl text-white mb-3 leading-tight"
            style={{ textShadow: '0 5px 35px rgba(0,0,0,1), 0 0 50px rgba(255,107,53,0.5)' }}
          >
            {stage === 'portal_discovered' ? 'THE PACIFIC JUST BROKE' : 'DEL PERRO PIER'}
          </h2>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4" />

          <p className="font-game text-sm sm:text-base md:text-lg text-white font-medium tracking-wider max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            {stage === 'portal_discovered'
              ? "Forget the LSPD. The alleyway dumpsters just vaporized into purple static. An electric rift is tearing through the concrete like tissue paper, smelling like ozone, burning rubber, and spicy street food from an entirely different hemisphere. Jump through or enjoy 25-to-life in Bolingbroke."
              : "Del Perro Beach at dusk. Smog hanging thick over the Pacific, police choppers spotlighting the coastline, and your Comet's engine is ticking on zero coolant. You've got two stars, twenty bucks, and nowhere left to run in Los Santos. Check the alley."}
          </p>
        </motion.div>
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

