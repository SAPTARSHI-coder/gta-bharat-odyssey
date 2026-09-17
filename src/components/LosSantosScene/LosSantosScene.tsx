import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { SceneBackground } from '../shared/SceneBackground';

const STORY_STEPS = [
  {
    id: 'arrival',
    text: 'The city was supposed to be the destination.',
    subtext: "It wasn't.",
    objective: null,
    delay: 0,
  },
  {
    id: 'explore',
    text: 'The beach stretches endlessly.',
    subtext: 'The ocean knows something you don\'t.',
    objective: '[ EXPLORE THE BEACH ]',
    delay: 0,
  },
  {
    id: 'discovery',
    text: 'Something pulses beneath the surface.',
    subtext: 'A light. A doorway. A choice.',
    objective: null,
    delay: 0,
  },
];

// Ambient vehicle on road
function Vehicle({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute bottom-[8%] h-3"
      initial={{ x: -100 }}
      animate={{ x: '110vw' }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: 'linear' }}
      style={{ width: 50 }}
    >
      <div className="w-full h-3 rounded bg-white/20" />
      <div className="absolute -left-1 top-0 w-3 h-1 bg-yellow-300/60 rounded-full" />
      <div className="absolute -right-1 top-0 w-2 h-1 bg-red-500/60 rounded-full" />
    </motion.div>
  );
}

export function LosSantosScene() {
  const { goToScene, character } = useGame();
  const [step, setStep] = useState(0);
  const [showPortalHint, setShowPortalHint] = useState(false);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => {
    if (step === 0) {
      const t = setTimeout(() => setStep(1), 4000);
      return () => clearTimeout(t);
    }
    if (step === 2) {
      const t = setTimeout(() => setShowPortalHint(true), 2500);
      return () => clearTimeout(t);
    }
  }, [step]);

  function advance() {
    if (step < STORY_STEPS.length - 1) {
      setTextVisible(false);
      setTimeout(() => { setStep(s => s + 1); setTextVisible(true); }, 400);
    }
  }

  const current = STORY_STEPS[step];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* SVG scene background */}
      <SceneBackground scene="los-santos" />

      {/* Atmospheric overlay */}
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Vehicles */}
      <Vehicle delay={0} />
      <Vehicle delay={4} />

      {/* Animated ocean waves hint */}
      <div className="fixed bottom-[5%] left-0 right-0 z-5 pointer-events-none">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute h-px bg-white/10"
            style={{ bottom: `${i * 8}px`, left: 0, right: 0 }}
            animate={{ scaleX: [1, 1.02, 1], x: [0, -20, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Glowing portal near beach */}
      <AnimatePresence>
        {showPortalHint && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed z-20 cursor-pointer"
            style={{ bottom: '18%', right: '20%' }}
            onClick={() => goToScene('portal')}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(179,71,255,0.6) 40%, transparent 80%)',
                boxShadow: '0 0 40px #b347ff, 0 0 80px rgba(179,71,255,0.5)',
              }}
            >
              <span className="text-2xl">✨</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-game text-xs text-purple-300 tracking-widest"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              INVESTIGATE
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story text */}
      <div className="fixed z-30 inset-x-0 top-1/2 -translate-y-1/2 px-6 pointer-events-none">
        <AnimatePresence mode="wait">
          {textVisible && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div
                className="font-cinematic text-4xl md:text-6xl text-white mb-3 leading-tight"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(179,71,255,0.3)' }}
              >
                {current.text}
              </div>
              <div className="font-game text-sm md:text-base text-white/60 tracking-wider mb-6">
                {current.subtext}
              </div>
              {current.objective && (
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-game text-sm text-orange-400 tracking-widest"
                >
                  {current.objective}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interaction overlay */}
      {!showPortalHint && step < STORY_STEPS.length - 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={advance}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 glass-panel px-8 py-3 font-game text-sm text-white/70 tracking-widest hover:text-white transition-colors cursor-pointer"
        >
          CONTINUE →
        </motion.button>
      )}

      {/* Skip to portal */}
      {showPortalHint && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 game-btn-purple"
          onClick={() => goToScene('portal')}
        >
          APPROACH THE LIGHT →
        </motion.button>
      )}

      {/* Character reminder top center */}
      {character && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 glass-panel px-4 py-2 text-center">
          <div className="font-game text-xs text-orange-400">{character.name}</div>
          <div className="font-game text-xs text-white/40">{character.title}</div>
        </div>
      )}
    </div>
  );
}
