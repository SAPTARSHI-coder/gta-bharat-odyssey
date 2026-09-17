import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { SceneBackground } from '../shared/SceneBackground';

const DELHI_STORY = [
  { text: 'NEXT DESTINATION', sub: 'The road never ends.', label: null },
  { text: 'NEW DELHI', sub: 'The heart of Bharat. Power. History. Purpose.', label: '◈ ARRIVAL: NEW DELHI ◈' },
  { text: 'India Gate.', sub: 'Where every Indian story begins.', label: null },
];

// Fireworks
function Firework({ x, y, delay }: { x: number; y: number; delay: number }) {
  const sparks = Array.from({ length: 12 }, (_, i) => i);
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, delay, repeat: Infinity, repeatDelay: 3 }}
    >
      {sparks.map(i => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ background: ['#ff9933', '#ff2d87', '#ffd700', '#ffffff'][i % 4] }}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{
            x: Math.cos((i / sparks.length) * Math.PI * 2) * 40,
            y: Math.sin((i / sparks.length) * Math.PI * 2) * 40,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 1.2, delay, repeat: Infinity, repeatDelay: 3 }}
        />
      ))}
    </motion.div>
  );
}

export function DelhiScene() {
  const { goToScene, character } = useGame();
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    if (step === 1) setShowFireworks(true);
  }, [step]);

  useEffect(() => {
    if (step === 0) {
      const t = setTimeout(() => advance(), 3500);
      return () => clearTimeout(t);
    }
  }, [step]);

  function advance() {
    if (step < DELHI_STORY.length - 1) {
      setVisible(false);
      setTimeout(() => { setStep(s => s + 1); setVisible(true); }, 400);
    }
  }

  const current = DELHI_STORY[step];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <SceneBackground scene="delhi" />

      {/* Fireworks */}
      {showFireworks && (
        <>
          <Firework x={15} y={20} delay={0} />
          <Firework x={75} y={15} delay={0.8} />
          <Firework x={30} y={30} delay={1.6} />
          <Firework x={85} y={25} delay={0.4} />
          <Firework x={50} y={10} delay={1.2} />
        </>
      )}

      {/* Overlay */}
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center bottom, transparent 40%, rgba(0,0,0,0.75) 100%)' }}
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
              {current.label && (
                <div className="hud-element text-orange-400 mb-3 tracking-[0.5em]">{current.label}</div>
              )}

              {step === 1 ? (
                <h2
                  className="font-cinematic text-7xl md:text-[8rem] leading-none mb-3"
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
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(255,107,53,0.3)' }}
                >
                  {current.text}
                </div>
              )}

              <div className="font-game text-sm md:text-base text-white/60 tracking-wider">
                {current.sub}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {step < DELHI_STORY.length - 1 ? (
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3"
        >
          <div className="hud-element text-orange-400 text-xs tracking-widest">
            ◈ JOURNEY COMPLETE — CREATE YOUR POSTER ◈
          </div>
          <button
            onClick={() => goToScene('editor')}
            className="game-btn-purple px-10 py-4 text-lg"
          >
            CREATE JOURNEY POSTER →
          </button>
        </motion.div>
      )}

      {/* Flag strip */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="h-1 bg-[#ff9933]" />
        <div className="h-1 bg-white" />
        <div className="h-1 bg-[#138808]" />
      </div>
    </div>
  );
}
