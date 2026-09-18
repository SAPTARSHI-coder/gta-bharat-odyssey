import React from 'react';
import { motion } from 'framer-motion';

function Firework({ x, y, delay }: { x: number; y: number; delay: number }) {
  const sparks = Array.from({ length: 12 }, (_, i) => i);
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
  const scrollToKolkata = () => {
    document.getElementById('section-kolkata')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between py-24 px-6 md:px-12 select-none overflow-hidden">
      {/* Fireworks in twilight sky */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <Firework x={15} y={15} delay={0} />
        <Firework x={78} y={12} delay={0.8} />
        <Firework x={28} y={22} delay={1.6} />
        <Firework x={85} y={20} delay={0.4} />
      </div>

      {/* Center Story Text */}
      <div className="relative z-20 my-auto text-center max-w-3xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="hud-element text-amber-400 mb-3 tracking-[0.4em] font-bold text-xs md:text-sm"
        >
          ◈ CHAPTER 4: THE CAPITAL ◈
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
            filter: 'drop-shadow(0 0 45px rgba(255,153,51,0.6))',
          }}
        >
          NEW DELHI
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-game text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-3 tracking-wide"
        >
          "The seat of power. Kartavya Path — the most guarded straight road in any open world.
          India Gate burns eternal at the far end."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-game text-xs sm:text-sm text-white/60 max-w-xl mx-auto leading-relaxed"
        >
          No heat here — just history, marble, and the echo of a billion ambitions still chasing daylight.
        </motion.p>
      </div>

      {/* Bottom Action Controls */}
      <div className="relative z-30 flex flex-col items-center gap-2 mt-auto">
        <motion.button
          onClick={scrollToKolkata}
          className="game-btn-orange px-10 py-4 text-base md:text-lg flex items-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(255,107,53,0.7)]"
        >
          <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">
            SPACE
          </span>
          <span className="font-bold tracking-wider">HEAD EAST TO KOLKATA [SCROLL DOWN] →</span>
        </motion.button>
        <div className="font-game text-[11px] text-white/40 tracking-widest">
          FINAL STOP: VICTORIA MEMORIAL & HOWRAH BRIDGE, KOLKATA
        </div>
      </div>
    </div>
  );
}

