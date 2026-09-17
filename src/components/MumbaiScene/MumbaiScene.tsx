import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { SceneBackground } from '../shared/SceneBackground';

const MUMBAI_STORY = [
  { text: 'Different city.', sub: 'Same ambition.', objective: null },
  { text: 'MUMBAI', sub: 'Gateway of Bharat. City of Dreams.', objective: null },
  { text: 'Welcome to Bharat.', sub: 'The journey continues...', objective: '[ EXPLORE THE CITY ]' },
];

// Floating lanterns
function Lanterns() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + (i * 7) % 80}%`,
            bottom: '-20px',
          }}
          animate={{
            y: [0, -(window.innerHeight + 100)],
            x: [0, (i % 2 === 0 ? 30 : -30)],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 12 + (i % 4) * 2,
            delay: i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="w-5 h-7 rounded-t-full rounded-b-sm"
            style={{
              background: `radial-gradient(ellipse, ${['#ff9933','#ff6b35','#ffd700','#ff2d87'][i % 4]} 60%, transparent 100%)`,
              boxShadow: `0 0 15px ${['#ff9933','#ff6b35','#ffd700','#ff2d87'][i % 4]}`,
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
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (step === 0) {
      const t = setTimeout(() => advance(), 4000);
      return () => clearTimeout(t);
    }
  }, [step]);

  function advance() {
    if (step < MUMBAI_STORY.length - 1) {
      setVisible(false);
      setTimeout(() => { setStep(s => s + 1); setVisible(true); }, 400);
    }
  }

  const current = MUMBAI_STORY[step];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <SceneBackground scene="mumbai" />
      <Lanterns />

      {/* Overlay */}
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }}
      />

      {/* Arrival flash */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="fixed inset-0 bg-white z-50 pointer-events-none"
      />

      {/* Story text */}
      <div className="fixed z-30 inset-x-0 top-1/2 -translate-y-1/2 px-6">
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              {step === 1 ? (
                <>
                  <div className="hud-element text-orange-400 mb-3 tracking-[0.5em]">◈ LOCATION IDENTIFIED ◈</div>
                  <h2
                    className="font-cinematic text-7xl md:text-[8rem] leading-none mb-3"
                    style={{
                      background: 'linear-gradient(135deg, #ff9933 0%, #ffffff 50%, #138808 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 30px rgba(255,153,51,0.5))',
                    }}
                  >
                    MUMBAI
                  </h2>
                  <p className="text-white/60 font-game text-sm tracking-wider">{current.sub}</p>
                </>
              ) : (
                <>
                  <div
                    className="font-cinematic text-5xl md:text-7xl text-white mb-3 leading-tight"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(255,153,51,0.3)' }}
                  >
                    {current.text}
                  </div>
                  <div className="font-game text-sm md:text-base text-white/60 tracking-wider mb-6">
                    {current.sub}
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
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {step < MUMBAI_STORY.length - 1 ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={advance}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 glass-panel px-8 py-3 font-game text-sm text-white/70 tracking-widest hover:text-white transition-colors"
        >
          CONTINUE →
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => goToScene('delhi')}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 game-btn-orange px-10 py-4"
        >
          JOURNEY TO DELHI →
        </motion.button>
      )}

      {/* Flag ribbon at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex flex-col">
        <div className="h-1 bg-[#ff9933]" />
        <div className="h-1 bg-white" />
        <div className="h-1 bg-[#138808]" />
      </div>
    </div>
  );
}
