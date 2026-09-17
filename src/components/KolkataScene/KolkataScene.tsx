import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { SceneBackground } from '../shared/SceneBackground';

const KOLKATA_STORY = [
  { text: 'The last stop.', sub: 'Where India remembers its own story.', label: null },
  { text: 'KOLKATA', sub: 'City of Joy. City of Poets. City of Revolution.', label: '◈ ARRIVAL: KOLKATA ◈' },
  { text: 'Victoria Memorial.', sub: 'History reimagined. A journey complete.', label: null },
];

function BoatOnRiver({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ bottom: '6%', zIndex: 15 }}
      initial={{ x: -120 }}
      animate={{ x: '110vw' }}
      transition={{ duration: 30 + delay * 5, delay, repeat: Infinity, ease: 'linear' }}
    >
      <svg width="70" height="28" viewBox="0 0 70 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5,20 Q35,10 65,20 L60,26 Q35,28 10,26 Z" fill="#0d1020" opacity="0.9"/>
        <rect x="28" y="8" width="2" height="14" fill="#0d1020" opacity="0.8"/>
        <path d="M30,8 L44,14 L30,18 Z" fill="#0e1224" opacity="0.7"/>
        <rect x="28" y="24" width="14" height="3" rx="1" fill="#ffee88" opacity="0.4"/>
      </svg>
    </motion.div>
  );
}

// Floating text fragments (Bengali poetry hint)
function FloatingPoetry() {
  const lines = ['আনন্দলোকে', 'মঙ্গলালোকে', 'Joy', 'City of Light'];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute text-xs font-game text-blue-300/20 tracking-wider"
          style={{
            left: `${10 + i * 22}%`,
            top: `${15 + i * 18}%`,
          }}
          animate={{ opacity: [0, 0.4, 0], y: [0, -40] }}
          transition={{ duration: 6, delay: i * 2.5, repeat: Infinity }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}

export function KolkataScene() {
  const { goToScene } = useGame();
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
    if (step < KOLKATA_STORY.length - 1) {
      setVisible(false);
      setTimeout(() => { setStep(s => s + 1); setVisible(true); }, 400);
    }
  }

  const current = KOLKATA_STORY[step];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <SceneBackground scene="kolkata" />
      <FloatingPoetry />

      {/* Boats on the Hooghly */}
      <BoatOnRiver delay={0} />
      <BoatOnRiver delay={12} />

      {/* Moon shimmer effect */}
      <motion.div
        className="fixed z-5 pointer-events-none rounded-full"
        style={{
          width: 180, height: 180,
          top: '5%', right: '15%',
          background: 'radial-gradient(circle, rgba(170,187,255,0.06) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Subtle blue vignette */}
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,5,20,0.75) 100%)' }}
      />

      {/* Arrival flash */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="fixed inset-0 bg-blue-100 z-50 pointer-events-none"
      />

      {/* Fireworks (toned blue/white for Kolkata) */}
      {showFireworks && (
        <div className="fixed inset-0 z-5 pointer-events-none overflow-hidden">
          {[0,1,2,3,4].map(i => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${15 + i * 18}%`, top: `${10 + (i%3)*10}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, delay: i * 0.6, repeat: Infinity, repeatDelay: 4 }}
            >
              {[0,1,2,3,4,5,6,7].map(j => (
                <motion.div
                  key={j}
                  className="absolute w-1 h-1 rounded-full"
                  style={{ background: ['#aabbff','#ffffff','#88ccff','#eeeeff'][j % 4] }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((j/8)*Math.PI*2)*45,
                    y: Math.sin((j/8)*Math.PI*2)*45,
                    opacity: 0,
                  }}
                  transition={{ duration: 1.5, delay: i * 0.6, repeat: Infinity, repeatDelay: 4 }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      )}

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
                <div className="hud-element text-blue-400 mb-3 tracking-[0.5em]">{current.label}</div>
              )}
              {step === 1 ? (
                <h2
                  className="font-cinematic text-7xl md:text-[8rem] leading-none mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #aabbff 0%, #ffffff 50%, #66aaff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 30px rgba(100,150,255,0.6))',
                  }}
                >
                  KOLKATA
                </h2>
              ) : (
                <div
                  className="font-cinematic text-5xl md:text-7xl text-white mb-3 leading-tight"
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(100,150,255,0.4)' }}
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
      {step < KOLKATA_STORY.length - 1 ? (
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
          <div className="hud-element text-blue-300 text-xs tracking-widest">
            ◈ ALL 3 CITIES VISITED — CREATE YOUR POSTER ◈
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
