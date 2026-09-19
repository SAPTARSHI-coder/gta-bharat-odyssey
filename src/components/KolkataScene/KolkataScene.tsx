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
    document.getElementById('section-wonders')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between py-24 px-6 md:px-12 select-none overflow-hidden">
      {/* Floating subtle glows */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <KolkataGlow x={20} y={15} delay={0} />
        <KolkataGlow x={82} y={22} delay={0.7} />
        <KolkataGlow x={45} y={12} delay={1.4} />
      </div>

      {/* Center Story Text in High-Contrast Frosted Dossier Card */}
      <div className="relative z-20 my-auto text-center max-w-3xl mx-auto pointer-events-none px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="bg-neutral-950/80 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_30px_rgba(0,245,255,0.2)] max-w-2xl mx-auto"
        >
          <div className="hud-element text-cyan-400 mb-2 tracking-[0.35em] font-bold text-xs sm:text-sm">
            ★ MISSION 04: REBEL CITY SAFEHOUSE // INTERNATIONAL WANTED ★
          </div>

          <h2
            className="font-cinematic text-6xl sm:text-8xl md:text-9xl leading-none mb-3"
            style={{
              background: 'linear-gradient(135deg, #66aaff 0%, #ffffff 50%, #ffaa33 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 25px rgba(0,0,0,1)) drop-shadow(0 0 35px rgba(100,160,255,0.7))',
            }}
          >
            KOLKATA
          </h2>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-4" />

          <p className="font-game text-base sm:text-lg md:text-xl text-white font-medium max-w-xl mx-auto mb-3 tracking-wide leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            "Yellow cabs fish-tailing across tram tracks, monsoon rain drumming on tin roofs, and three centuries of rebellion in every brick. Victoria Memorial sits like a colonial trophy conquered into a park. Howrah Bridge hasn't moved in eighty years. Your passport is cooked, the FIB has zero jurisdiction, and the chaiwallahs already know your alias. You're an urban legend."
          </p>

          <p className="font-game text-xs sm:text-sm text-cyan-200/90 font-medium max-w-lg mx-auto leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
            The rift didn't stop in Bharat. Seismic shockwaves just blew open vaults across all Seven Wonders of the World. The heist just went intercontinental.
          </p>
        </motion.div>
      </div>

      {/* Bottom Action Controls */}
      <div className="relative z-30 flex flex-col items-center gap-2 mt-auto">
        <motion.button
          onClick={scrollToWonders}
          className="game-btn-purple px-10 py-4 text-base md:text-lg flex items-center gap-3 cursor-pointer shadow-[0_0_40px_rgba(179,71,255,0.85)]"
        >
          <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">
            SPACE
          </span>
          <span className="font-bold tracking-wider">RAID THE 7 WONDERS HEIST BOARD [SCROLL DOWN] →</span>
        </motion.button>
        <div className="font-game text-[11px] text-white/40 tracking-widest">
          INTERPOL RED NOTICES ACTIVATED · 7 PLANETARY TARGETS UNLOCKED
        </div>
      </div>
    </div>
  );
}

