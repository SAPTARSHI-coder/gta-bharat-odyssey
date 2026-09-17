import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { SceneBackground } from '../shared/SceneBackground';
import { GTAMinimap } from '../HUD/GTAMinimap';
import { GTAMissionBox } from '../HUD/GTAMissionBox';

const MUMBAI_STORY = [
  { text: 'A Different Coast.', sub: 'Same ambition. But a billion more heartbeats.', objective: null },
  { text: 'MUMBAI', sub: 'City of Dreams. Taj Mahal Palace & Gateway of India.', objective: null },
  { text: 'Gateway of Bharat.', sub: 'From the Pacific waves to the Arabian Sea.', objective: '[ EXPLORE THE CITY ]' },
];

function Lanterns() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${8 + (i * 7) % 84}%`,
            bottom: '-20px',
          }}
          animate={{
            y: [0, -(window.innerHeight + 120)],
            x: [0, (i % 2 === 0 ? 35 : -35)],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: 12 + (i % 4) * 2,
            delay: i * 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="w-5 h-7 rounded-t-full rounded-b-sm"
            style={{
              background: `radial-gradient(ellipse, ${['#ff9933','#ff6b35','#ffd700','#ff2d87'][i % 4]} 60%, transparent 100%)`,
              boxShadow: `0 0 16px ${['#ff9933','#ff6b35','#ffd700','#ff2d87'][i % 4]}`,
            }}
          />
          <div className="w-px h-3 bg-orange-400/40 mx-auto" />
        </motion.div>
      ))}
    </div>
  );
}

export function MumbaiScene() {
  const { goToScene, character } = useGame();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 0) {
      const t = setTimeout(() => setStep(1), 3800);
      return () => clearTimeout(t);
    }
  }, [step]);

  // Keyboard shortcut [E] or [Space] to advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E' || e.key === ' ') {
        if (step < MUMBAI_STORY.length - 1) {
          setStep(s => s + 1);
        } else {
          goToScene('delhi');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, goToScene]);

  const current = MUMBAI_STORY[step];

  return (
    <div className="relative min-h-screen overflow-hidden select-none">
      {/* High-Resolution Photo-realistic Mumbai Scene Background */}
      <SceneBackground scene="mumbai" zoomDirection="pan-right" />
      <Lanterns />

      {/* GTA Minimap Radar */}
      <GTAMinimap locationName="COLABA HARBOR, MUMBAI" zoneType="beach" />

      {/* GTA Mission Box */}
      <GTAMissionBox
        title="Welcome to Mumbai."
        subtitle="New city, new opportunities. Meet your contact across the bay."
        badge="ARRIVAL CHAPTER"
      />

      {/* Arrival White Flash */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="fixed inset-0 bg-amber-100 z-50 pointer-events-none"
      />

      {/* Center Cinematic Story Text */}
      <div className="fixed z-30 inset-x-0 top-1/2 -translate-y-1/2 px-6 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            {step === 1 ? (
              <>
                <div className="hud-element text-orange-400 mb-2 tracking-[0.4em] font-bold">
                  ◈ LOCATION CONFIRMED: BHARAT ◈
                </div>
                <h2
                  className="font-cinematic text-7xl md:text-9xl leading-none mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #ff9933 0%, #ffffff 50%, #138808 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 35px rgba(255,153,51,0.6))',
                  }}
                >
                  MUMBAI
                </h2>
                <p className="text-white/80 font-game text-sm md:text-base tracking-wider">
                  {current.sub}
                </p>
              </>
            ) : (
              <>
                <div
                  className="font-cinematic text-5xl md:text-7xl text-white mb-3 leading-tight"
                  style={{ textShadow: '0 4px 25px rgba(0,0,0,0.9), 0 0 45px rgba(255,153,51,0.4)' }}
                >
                  {current.text}
                </div>
                <div className="font-game text-sm md:text-base text-white/75 tracking-wider mb-4">
                  {current.sub}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3">
        {step < MUMBAI_STORY.length - 1 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            className="glass-panel px-8 py-3 font-game text-xs md:text-sm text-white/90 tracking-widest hover:text-white transition-colors cursor-pointer border border-white/20"
          >
            CONTINUE STORY [SPACE] →
          </button>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => goToScene('delhi')}
            className="game-btn-orange px-10 py-4 text-base md:text-lg flex items-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(255,107,53,0.7)]"
          >
            <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">
              SPACE
            </span>
            <span className="font-bold tracking-wider">JOURNEY TO NEW DELHI →</span>
          </motion.button>
        )}

        <div className="font-game text-[11px] text-white/40 tracking-widest">
          {character ? `${character.name.toUpperCase()} · ${character.title}` : 'OPERATIVE'}
        </div>
      </div>

      {/* Tricolor Ribbon at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex flex-col">
        <div className="h-[2px] bg-[#ff9933]" />
        <div className="h-[2px] bg-white" />
        <div className="h-[2px] bg-[#138808]" />
      </div>
    </div>
  );
}
