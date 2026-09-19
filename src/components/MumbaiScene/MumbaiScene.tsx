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

      {/* Center Cinematic City Title ONLY - Zero Visual Obstruction */}
      <div className="relative z-20 my-auto text-center max-w-4xl mx-auto pointer-events-none px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="hud-element text-amber-400 mb-2 tracking-[0.4em] font-bold text-xs sm:text-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
        >
          ★ MISSION 02: MAXIMUM CITY // ZERO RULES ★
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-cinematic text-7xl sm:text-9xl md:text-[11rem] leading-none select-none"
          style={{
            background: 'linear-gradient(135deg, #ff9933 0%, #ffffff 50%, #138808 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 6px 30px rgba(0,0,0,0.95)) drop-shadow(0 0 50px rgba(255,153,51,0.6))',
          }}
        >
          MUMBAI
        </motion.h2>
      </div>

      {/* Top-Right Cinematic Tactical Intel Card */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="absolute top-24 sm:top-28 right-4 sm:right-10 md:right-16 max-w-xs sm:max-w-sm z-30 pointer-events-none"
      >
        <div className="bg-neutral-950/85 backdrop-blur-xl border-l-4 border-amber-400 border-y border-r border-white/15 rounded-r-xl p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(255,153,51,0.15)]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-game text-[10px] tracking-widest text-amber-400 font-bold uppercase">
              TACTICAL INTEL // COLABA PIER
            </span>
          </div>

          <p className="font-game text-xs sm:text-sm text-white font-medium leading-relaxed mb-2.5 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            "Touchdown on Colaba Pier. Arabian Sea air hitting your lungs like a shot of cheap tequila. Behind you: the Taj Mahal Palace glowing in pure gold. In front of you: twenty-one million hustlers and zero traffic laws. Del Perro Beach was preschool. This is the big leagues."
          </p>

          <p className="font-game text-[11px] text-amber-200/90 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,1)] border-t border-white/10 pt-2">
            LSPD lost your signal eight thousand miles back. But the local syndicates already clocked your drop. Hotwire a ride before someone hotwires you.
          </p>
        </div>
      </motion.div>

      {/* Bottom Action Controls */}
      <div className="relative z-30 flex flex-col items-center gap-2 mt-auto">
        <motion.button
          onClick={scrollToDelhi}
          className="game-btn-orange px-10 py-4 text-base md:text-lg flex items-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(255,107,53,0.7)]"
        >
          <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">
            SPACE
          </span>
          <span className="font-bold tracking-wider">JACK A RIDE → DRIVE NORTH TO NEW DELHI [SCROLL DOWN] →</span>
        </motion.button>
        <div className="font-game text-[11px] text-white/40 tracking-widest">
          HIGHWAY 48 NORTH // NEXT CHECKPOINT: KARTAVYA PATH, DELHI
        </div>
      </div>
    </div>
  );
}

