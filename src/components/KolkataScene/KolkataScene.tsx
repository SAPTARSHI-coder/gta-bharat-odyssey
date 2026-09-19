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
  const scrollToWonders = () => {
    document.getElementById('section-dream-meadow')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between py-24 px-6 md:px-12 select-none overflow-hidden">
      {/* Floating subtle glows */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <KolkataGlow x={20} y={15} delay={0} />
        <KolkataGlow x={82} y={22} delay={0.7} />
        <KolkataGlow x={45} y={12} delay={1.4} />
      </div>

      {/* Center Cinematic City Title ONLY - Zero Visual Obstruction */}
      <div className="relative z-20 my-auto text-center max-w-4xl mx-auto pointer-events-none px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="hud-element text-cyan-400 mb-2 tracking-[0.4em] font-bold text-xs sm:text-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
        >
          ★ MISSION 04: REBEL CITY SAFEHOUSE // INTERNATIONAL WANTED ★
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-cinematic text-7xl sm:text-9xl md:text-[11rem] leading-none select-none"
          style={{
            background: 'linear-gradient(135deg, #66aaff 0%, #ffffff 50%, #ffaa33 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 6px 30px rgba(0,0,0,0.95)) drop-shadow(0 0 50px rgba(100,160,255,0.7))',
          }}
        >
          KOLKATA
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
        <div className="bg-neutral-950/85 backdrop-blur-xl border-l-4 border-cyan-400 border-y border-r border-white/15 rounded-r-xl p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(0,245,255,0.15)]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-game text-[10px] tracking-widest text-cyan-400 font-bold uppercase">
              TACTICAL INTEL // VICTORIA MEMORIAL
            </span>
          </div>

          <p className="font-game text-xs sm:text-sm text-white font-medium leading-relaxed mb-2.5 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            "Yellow cabs fish-tailing across tram tracks, monsoon rain drumming on tin roofs, and three centuries of rebellion in every brick. Victoria Memorial sits like a colonial trophy conquered into a park. Howrah Bridge hasn't moved in eighty years. Your passport is cooked, the FIB has zero jurisdiction, and the chaiwallahs already know your alias. You're an urban legend."
          </p>

          <p className="font-game text-[11px] text-cyan-200/90 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,1)] border-t border-white/10 pt-2">
            The rift didn't stop in Bharat. Seismic shockwaves just blew open vaults across all Seven Wonders of the World. The heist just went intercontinental.
          </p>
        </div>
      </motion.div>

      {/* Bottom Action Controls */}
      <div className="relative z-30 flex flex-col items-center gap-2 mt-auto">
        <motion.button
          onClick={scrollToWonders}
          className="game-btn-purple px-10 py-4 text-base md:text-lg flex items-center gap-3 cursor-pointer shadow-[0_0_40px_rgba(179,71,255,0.85)]"
        >
          <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">
            SPACE
          </span>
          <span className="font-bold tracking-wider">DISCOVER THE 8TH WONDER [SCROLL DOWN] →</span>
        </motion.button>
        <div className="font-game text-[11px] text-white/40 tracking-widest">
          THE ETERNAL DREAM MEADOW · THE UNCOPIABLE WONDER · AWAITS
        </div>
      </div>
    </div>
  );
}

