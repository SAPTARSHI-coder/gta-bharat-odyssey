import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { SceneBackground } from '../shared/SceneBackground';
import { GTAMinimap } from '../HUD/GTAMinimap';
import { GTAMissionBox } from '../HUD/GTAMissionBox';

const DELHI_STORY = [
  { text: 'NEXT STOP: NEW DELHI', sub: 'The road never ends. The scale grows bigger.', label: null },
  { text: 'NEW DELHI', sub: 'The grand capital of Bharat. Power. History. Purpose.', label: '◈ CAPITAL CITY REACHED ◈' },
  { text: 'India Gate.', sub: 'Where every heroic Indian journey is remembered.', label: null },
];

function Firework({ x, y, delay }: { x: number; y: number; delay: number }) {
  const sparks = Array.from({ length: 14 }, (_, i) => i);
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, delay, repeat: Infinity, repeatDelay: 3 }}
    >
      {sparks.map(i => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ background: ['#ff9933', '#ff2d87', '#ffd700', '#ffffff', '#00f5ff'][i % 5] }}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{
            x: Math.cos((i / sparks.length) * Math.PI * 2) * 50,
            y: Math.sin((i / sparks.length) * Math.PI * 2) * 50,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 1.3, delay, repeat: Infinity, repeatDelay: 3 }}
        />
      ))}
    </motion.div>
  );
}

export function DelhiScene() {
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
        if (step < DELHI_STORY.length - 1) {
          setStep(s => s + 1);
        } else {
          goToScene('kolkata');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, goToScene]);

  const current = DELHI_STORY[step];

  return (
    <div className="relative min-h-screen overflow-hidden select-none">
      {/* High-Resolution Photo-realistic Delhi Scene Background */}
      <SceneBackground scene="delhi" zoomDirection="in" />

      {/* Fireworks in the twilight sky */}
      <div className="fixed inset-0 z-5 pointer-events-none">
        <Firework x={15} y={15} delay={0} />
        <Firework x={78} y={12} delay={0.8} />
        <Firework x={28} y={22} delay={1.6} />
        <Firework x={85} y={20} delay={0.4} />
        <Firework x={50} y={8} delay={1.2} />
      </div>

      {/* GTA Minimap Radar */}
      <GTAMinimap locationName="KARTAVYA PATH, DELHI" zoneType="monument" />

      {/* GTA Mission Box */}
      <GTAMissionBox
        title="Next Stop: New Delhi."
        subtitle="The journey continues through the capital avenue towards India Gate."
        badge="EXPLORATION OBJECTIVE"
      />

      {/* Center Story Text */}
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
            {current.label && (
              <div className="hud-element text-orange-400 mb-2 tracking-[0.4em] font-bold">
                {current.label}
              </div>
            )}

            {step === 1 ? (
              <h2
                className="font-cinematic text-7xl md:text-9xl leading-none mb-3"
                style={{
                  background: 'linear-gradient(135deg, #ff9933 0%, #ffffff 50%, #138808 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 40px rgba(255,153,51,0.6))',
                }}
              >
                NEW DELHI
              </h2>
            ) : (
              <div
                className="font-cinematic text-5xl md:text-7xl text-white mb-3 leading-tight"
                style={{ textShadow: '0 4px 25px rgba(0,0,0,0.9), 0 0 45px rgba(255,107,53,0.4)' }}
              >
                {current.text}
              </div>
            )}

            <div className="font-game text-sm md:text-base text-white/75 tracking-wider">
              {current.sub}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3">
        {step < DELHI_STORY.length - 1 ? (
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
            onClick={() => goToScene('kolkata')}
            className="game-btn-orange px-10 py-4 text-base md:text-lg flex items-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(255,107,53,0.7)]"
          >
            <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">
              SPACE
            </span>
            <span className="font-bold tracking-wider">JOURNEY TO KOLKATA →</span>
          </motion.button>
        )}

        <div className="font-game text-[11px] text-white/40 tracking-widest">
          {character ? `${character.name.toUpperCase()} · ${character.title}` : 'OPERATIVE'}
        </div>
      </div>

      {/* Flag strip */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="h-[2px] bg-[#ff9933]" />
        <div className="h-[2px] bg-white" />
        <div className="h-[2px] bg-[#138808]" />
      </div>
    </div>
  );
}
