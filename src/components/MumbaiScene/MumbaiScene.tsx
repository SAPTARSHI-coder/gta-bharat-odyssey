import React from 'react';
import { motion } from 'framer-motion';

function Lanterns() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + (i * 7) % 80}%`,
            bottom: '-20px',
          }}
          animate={{
            y: [0, -800],
            x: [0, (i % 2 === 0 ? 30 : -30)],
            opacity: [0, 0.85, 0.85, 0],
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
  const scrollToDelhi = () => {
    document.getElementById('section-delhi')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between py-24 px-6 md:px-12 select-none overflow-hidden">
      <Lanterns />

      {/* Center Cinematic Story Text */}
      <div className="relative z-20 my-auto text-center max-w-3xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="hud-element text-orange-400 mb-3 tracking-[0.4em] font-bold text-xs md:text-sm"
        >
          ◈ CHAPTER 3: ARRIVAL IN BHARAT ◈
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-cinematic text-6xl sm:text-8xl md:text-9xl leading-none mb-4"
          style={{
            background: 'linear-gradient(135deg, #ff9933 0%, #ffffff 50%, #138808 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 40px rgba(255,153,51,0.6))',
          }}
        >
          MUMBAI
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-game text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-3 tracking-wide"
        >
          "Maximum City. Gateway of India stands at the harbor.
          Taj Mahal Palace lights up the Arabian Sea like it always has — unfazed by any dimension."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-game text-xs sm:text-sm text-white/60 max-w-xl mx-auto leading-relaxed"
        >
          From Pacific Coast to the financial capital of Bharat. Same hustle. A billion more players.
        </motion.p>
      </div>

      {/* Bottom Action Controls */}
      <div className="relative z-30 flex flex-col items-center gap-2 mt-auto">
        <motion.button
          onClick={scrollToDelhi}
          className="game-btn-orange px-10 py-4 text-base md:text-lg flex items-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(255,107,53,0.7)]"
        >
          <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">
            SPACE
          </span>
          <span className="font-bold tracking-wider">DRIVE NORTH TO NEW DELHI [SCROLL DOWN] →</span>
        </motion.button>
        <div className="font-game text-[11px] text-white/40 tracking-widest">
          NEXT WAYPOINT: KARTAVYA PATH & INDIA GATE, DELHI
        </div>
      </div>
    </div>
  );
}

