import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Particles } from '../shared/Particles';

export function Landing() {
  const { goToScene } = useGame();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black select-none">
      {/* Background Image: High-Resolution Generated Cover Art */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src="/assets/hero_cover_art.jpg"
            alt="Los Santos to Bharat"
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Cinematic Vignette & Gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.85) 90%, rgba(0,0,0,0.98) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
          }}
        />
      </div>

      <Particles count={25} color="#b347ff" />
      <Particles count={15} color="#ff9933" />

      {/* TOP HEADER: Badges matching the challenge brief */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-full px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 backdrop-blur-md bg-black/40"
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-game text-xs tracking-widest text-white/90 font-bold uppercase">
            UNLAYER COMMUNITY CHALLENGE
          </span>
        </div>

        {/* Feature Badges from Reference Art */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <div className="glass-panel px-3 py-1 flex items-center gap-1.5 border border-purple-500/40">
            <span className="text-purple-400 text-xs">📸</span>
            <span className="font-game text-[11px] text-purple-200">Built with React Image Editor</span>
          </div>
          <div className="glass-panel px-3 py-1 flex items-center gap-1.5 border border-cyan-500/40">
            <span className="text-cyan-400 text-xs">🎮</span>
            <span className="font-game text-[11px] text-cyan-200">Open Source by Unlayer</span>
          </div>
          <div className="glass-panel px-3 py-1 flex items-center gap-1.5 border border-amber-500/40">
            <span className="text-amber-400 text-xs">🏆</span>
            <span className="font-game text-[11px] text-amber-200 font-bold">$1,000 Prize Challenge</span>
          </div>
        </div>
      </motion.header>

      {/* CENTER HERO: Cinematic Title & Action */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hud-element text-xs md:text-sm tracking-[0.4em] text-cyan-400 mb-2 font-bold"
        >
          ◈ A CINEMATIC INTERACTIVE STORY EXPERIENCE ◈
        </motion.div>

        {/* Main Title Banner */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mb-2"
        >
          <h1
            className="font-cinematic text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-wider leading-none text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
            style={{
              textShadow: '0 0 40px rgba(255,107,53,0.5), 0 0 80px rgba(179,71,255,0.4)',
            }}
          >
            LOS SANTOS
          </h1>
          <div className="flex items-center justify-center gap-4 my-[-10px] md:my-[-20px]">
            <span className="h-[2px] w-12 md:w-28 bg-gradient-to-r from-transparent to-orange-500" />
            <span className="font-cinematic text-2xl md:text-4xl text-amber-400 tracking-widest">
              TO
            </span>
            <span className="h-[2px] w-12 md:w-28 bg-gradient-to-l from-transparent to-green-500" />
          </div>
          <h1
            className="font-cinematic text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-wider leading-none"
            style={{
              background: 'linear-gradient(135deg, #ff9933 0%, #ffffff 50%, #138808 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 45px rgba(255,153,51,0.6))',
            }}
          >
            BHARAT
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-game text-base sm:text-xl md:text-2xl text-white/90 tracking-[0.25em] font-semibold mb-3"
        >
          "SAME DREAMS. A DIFFERENT MAP."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-white/70 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-8 font-game leading-relaxed"
        >
          Create your custom protagonist. Journey through a mysterious dimensional portal
          from Los Santos Beach to Mumbai’s Taj Palace, Delhi’s India Gate, and Kolkata’s Victoria Memorial.
          Design and edit your final journey poster using Unlayer React Image Editor.
        </motion.p>

        {/* Primary Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => goToScene('character')}
            className="game-btn-purple text-base md:text-lg px-12 py-4 relative group shadow-[0_0_35px_rgba(179,71,255,0.6)] cursor-pointer"
          >
            <span className="relative z-10 font-bold tracking-widest">START STORY MODE</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>

          <button
            onClick={() => goToScene('editor')}
            className="game-btn-orange text-sm md:text-base px-8 py-4 cursor-pointer font-bold tracking-wider"
          >
            🎨 JUMP TO POSTER EDITOR
          </button>
        </motion.div>
      </div>

      {/* BOTTOM FOOTER: Story Flow Previews */}
      <motion.footer
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="relative z-20 w-full px-6 py-3 border-t border-white/10 backdrop-blur-md bg-black/60 flex flex-wrap items-center justify-between gap-4 text-xs font-game text-white/50"
      >
        <div className="flex items-center gap-6 overflow-x-auto py-1">
          <span className="text-white/80 font-bold">STORY ROUTE:</span>
          <span className="hover:text-purple-300 transition-colors">1. Los Santos Beach</span>
          <span>→</span>
          <span className="hover:text-purple-300 transition-colors">2. Cosmic Portal</span>
          <span>→</span>
          <span className="hover:text-orange-300 transition-colors">3. Mumbai (Taj Hotel)</span>
          <span>→</span>
          <span className="hover:text-orange-300 transition-colors">4. New Delhi (India Gate)</span>
          <span>→</span>
          <span className="hover:text-cyan-300 transition-colors">5. Kolkata (Victoria Memorial)</span>
          <span>→</span>
          <span className="text-amber-400 font-bold">6. Unlayer Poster Studio</span>
        </div>

        <div className="flex items-center gap-3 ml-auto text-white/40 text-[11px]">
          <span>#BuiltWithImageEditor</span>
          <span>•</span>
          <span>Unlayer React Image Editor</span>
        </div>
      </motion.footer>
    </div>
  );
}
