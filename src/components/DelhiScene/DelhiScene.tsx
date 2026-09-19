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

      {/* Center Cinematic City Title ONLY - Zero Visual Obstruction */}
      <div className="relative z-20 my-auto text-center max-w-4xl mx-auto pointer-events-none px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="hud-element text-amber-400 mb-2 tracking-[0.4em] font-bold text-xs sm:text-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
        >
          ★ MISSION 03: CORRIDORS OF POWER // 4-STAR SECURITY ★
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-cinematic text-6xl sm:text-8xl md:text-[10rem] leading-none select-none"
          style={{
            background: 'linear-gradient(135deg, #ff9933 0%, #ffffff 50%, #138808 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 6px 30px rgba(0,0,0,0.95)) drop-shadow(0 0 50px rgba(255,153,51,0.6))',
          }}
        >
          NEW DELHI
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
              TACTICAL INTEL // KARTAVYA PATH
            </span>
          </div>

          <p className="font-game text-xs sm:text-sm text-white font-medium leading-relaxed mb-2.5 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            "Kartavya Path at 2:00 AM. Three miles of polished blacktop flanked by concrete barricades, high-powered floodlights, and elite paramilitary units. India Gate looms at the end like an immovable monolith. Don't touch the horn; the guys in tactical gear don't check ID before firing."
          </p>

          <p className="font-game text-[11px] text-amber-200/90 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,1)] border-t border-white/10 pt-2">
            Federal heat is spiking. The Ministry of Home Affairs flagged your entry. Put the pedal to the metal and burn rubber east to Kolkata.
          </p>
        </div>
      </motion.div>

      {/* Bottom Action Controls */}
      <div className="relative z-30 flex flex-col items-center gap-2 mt-auto">
        <motion.button
          onClick={scrollToKolkata}
          className="game-btn-orange px-10 py-4 text-base md:text-lg flex items-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(255,107,53,0.7)]"
        >
          <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">
            SPACE
          </span>
          <span className="font-bold tracking-wider">FULL THROTTLE EAST TO KOLKATA [SCROLL DOWN] →</span>
        </motion.button>
        <div className="font-game text-[11px] text-white/40 tracking-widest">
          NATIONAL HIGHWAY 19 // NEXT DESTINATION: VICTORIA MEMORIAL, KOLKATA
        </div>
      </div>
    </div>
  );
}

