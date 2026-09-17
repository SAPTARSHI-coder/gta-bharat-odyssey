import React from 'react';
import { motion } from 'framer-motion';

function KolkataGlow({ x, y, delay }: { x: number; y: number; delay: number }) {
  const sparks = Array.from({ length: 8 }, (_, i) => i);
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 3.5 }}
    >
      {sparks.map(i => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ background: ['#66aaff', '#ffffff', '#ffd700', '#ff9933'][i % 4] }}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{
            x: Math.cos((i / sparks.length) * Math.PI * 2) * 40,
            y: Math.sin((i / sparks.length) * Math.PI * 2) * 40,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 1.5, delay, repeat: Infinity, repeatDelay: 3.5 }}
        />
      ))}
    </motion.div>
  );
}

export function KolkataScene() {
  const scrollToEditor = () => {
    document.getElementById('section-editor')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between py-24 px-6 md:px-12 select-none overflow-hidden">
      {/* Floating subtle glows */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <KolkataGlow x={20} y={15} delay={0} />
        <KolkataGlow x={82} y={22} delay={0.7} />
        <KolkataGlow x={45} y={12} delay={1.4} />
      </div>

      {/* Center Story Text */}
      <div className="relative z-20 my-auto text-center max-w-3xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="hud-element text-cyan-400 mb-3 tracking-[0.4em] font-bold text-xs md:text-sm"
        >
          ◈ CHAPTER 5: THE CITY OF JOY ◈
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-cinematic text-6xl sm:text-8xl md:text-9xl leading-none mb-4"
          style={{
            background: 'linear-gradient(135deg, #66aaff 0%, #ffffff 50%, #ffaa33 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 45px rgba(100,160,255,0.7))',
          }}
        >
          KOLKATA
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-game text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-3 tracking-wide"
        >
          "Victoria Memorial reflects gracefully upon the lake. The illuminated Howrah Bridge spans the historic Hooghly River."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-game text-xs sm:text-sm text-white/60 max-w-xl mx-auto leading-relaxed"
        >
          City of Joy, poets, and revolutions. Your expedition through Bharat has reached its final historic chapter.
          Now enter the studio to immortalize your journey poster.
        </motion.p>
      </div>

      {/* Bottom Action Controls */}
      <div className="relative z-30 flex flex-col items-center gap-2 mt-auto">
        <motion.button
          onClick={scrollToEditor}
          className="game-btn-purple px-10 py-4 text-base md:text-lg flex items-center gap-3 cursor-pointer shadow-[0_0_40px_rgba(179,71,255,0.85)]"
        >
          <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">
            SPACE
          </span>
          <span className="font-bold tracking-wider">CREATE JOURNEY POSTER IN UNLAYER →</span>
        </motion.button>
        <div className="font-game text-[11px] text-white/40 tracking-widest">
          NEXT: @UNLAYER/REACT-IMAGE-EDITOR STUDIO
        </div>
      </div>
    </div>
  );
}
