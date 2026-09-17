import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Particles } from '../shared/Particles';

// Animated star field
function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    delay: Math.random() * 3,
  }));
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [s.opacity, s.opacity * 0.3, s.opacity] }}
          transition={{ duration: 2 + s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// Animated city silhouette for landing
function Cityscape() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 1440 900" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient id="landingSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00000a"/>
            <stop offset="40%" stopColor="#0a0015"/>
            <stop offset="70%" stopColor="#1a0035"/>
            <stop offset="85%" stopColor="#3d0066"/>
            <stop offset="92%" stopColor="#8b1060"/>
            <stop offset="97%" stopColor="#d44020"/>
            <stop offset="100%" stopColor="#ff8c35"/>
          </linearGradient>
          <radialGradient id="sunGlow" cx="75%" cy="95%" r="30%">
            <stop offset="0%" stopColor="#ffcc00" stopOpacity="0.5"/>
            <stop offset="40%" stopColor="#ff8c35" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="cityGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0020"/>
            <stop offset="100%" stopColor="#1a0040"/>
          </linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#landingSky)"/>
        <ellipse cx="1080" cy="810" rx="280" ry="120" fill="url(#sunGlow)"/>
        {/* Western city (Los Santos inspired) */}
        <g fill="url(#cityGrad)" opacity="0.95">
          <rect x="0" y="550" width="100" height="350"/>
          <rect x="30" y="490" width="50" height="410"/>
          <rect x="60" y="530" width="70" height="370"/>
          <rect x="110" y="510" width="80" height="390"/>
          <rect x="130" y="470" width="40" height="430"/>
          <rect x="180" y="540" width="60" height="360"/>
          <rect x="200" y="500" width="35" height="400"/>
          <rect x="240" y="560" width="75" height="340"/>
          <rect x="270" y="520" width="45" height="380"/>
          <rect x="320" y="580" width="65" height="320"/>
        </g>
        {/* Eastern city (India inspired - more ornate tops) */}
        <g fill="url(#cityGrad)" opacity="0.95">
          <rect x="1100" y="530" width="90" height="370"/>
          <rect x="1140" y="500" width="45" height="400"/>
          <polygon points="1162,500 1185,460 1208,500" fill="#1a0040"/>
          <rect x="1200" y="550" width="75" height="350"/>
          <rect x="1240" y="510" width="40" height="390"/>
          <rect x="1280" y="540" width="85" height="360"/>
          <rect x="1300" y="500" width="40" height="400"/>
          <polygon points="1310,500 1335,455 1360,500" fill="#1a0040"/>
          <rect x="1350" y="560" width="90" height="340"/>
          <rect x="1400" y="530" width="80" height="370"/>
          <rect x="1160" y="460" width="10" height="30" rx="5" fill="#b347ff" opacity="0.8"/>
          <rect x="1318" y="455" width="10" height="30" rx="5" fill="#ff9933" opacity="0.8"/>
        </g>
        {/* Neon building lights - left */}
        <rect x="35" y="510" width="4" height="40" fill="#ff2d87" opacity="0.9"/>
        <rect x="115" y="525" width="4" height="30" fill="#b347ff" opacity="0.9"/>
        <rect x="205" y="520" width="4" height="35" fill="#00f5ff" opacity="0.8"/>
        {/* Neon building lights - right */}
        <rect x="1145" y="520" width="4" height="30" fill="#ff9933" opacity="0.9"/>
        <rect x="1285" y="555" width="4" height="25" fill="#ff9933" opacity="0.8"/>
        <rect x="1405" y="545" width="4" height="30" fill="#ffd700" opacity="0.7"/>
        {/* Center divider - ocean/portal hint */}
        <rect x="580" y="700" width="280" height="200" fill="#0a0030" opacity="0.5"/>
        <ellipse cx="720" cy="700" rx="80" ry="30" fill="#b347ff" opacity="0.2"/>
      </svg>
    </div>
  );
}

export function Landing() {
  const { goToScene } = useGame();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Cityscape />
      <StarField />
      <Particles count={20} color="#b347ff" />

      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)',
        }}
      />

      {/* Center content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <AnimatePresence>
          {showContent && (
            <>
              {/* Pre-title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-game text-xs tracking-[0.5em] text-purple-400 mb-6 hud-element"
              >
                ◈ AN INTERACTIVE CINEMATIC EXPERIENCE ◈
              </motion.div>

              {/* Main title */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <h1
                  className="font-cinematic text-7xl md:text-9xl lg:text-[10rem] leading-none mb-0"
                  style={{
                    background: 'linear-gradient(135deg, #ff6b35 0%, #ff2d87 30%, #b347ff 60%, #00f5ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: 'none',
                    filter: 'drop-shadow(0 0 30px rgba(179,71,255,0.5))',
                  }}
                >
                  LOS SANTOS
                </h1>
              </motion.div>

              {/* Arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="font-cinematic text-5xl md:text-7xl text-purple-400 my-2"
                style={{ filter: 'drop-shadow(0 0 15px #b347ff)' }}
              >
                ↓
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <h1
                  className="font-cinematic text-7xl md:text-9xl lg:text-[10rem] leading-none mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #ff9933 0%, #ffffff 50%, #138808 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 30px rgba(255,153,51,0.4))',
                  }}
                >
                  BHARAT
                </h1>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="font-game text-lg md:text-2xl text-white/80 mb-4 tracking-widest"
                style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}
              >
                "Same dreams. A different map."
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="text-white/50 text-sm md:text-base max-w-lg mx-auto mb-12 leading-relaxed"
              >
                Create your character. Begin your journey on the coast of Los Santos,
                discover a mysterious portal, and cross into India.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="flex flex-col items-center gap-4"
              >
                <button
                  onClick={() => goToScene('character')}
                  className="game-btn-purple text-base md:text-lg px-12 py-4 relative group"
                >
                  <span className="relative z-10">BEGIN JOURNEY</span>
                  <motion.div
                    className="absolute inset-0 bg-purple-400/20"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </button>
                <div className="hud-element text-white/30 text-xs">
                  ◈ PRESS TO START ◈
                </div>
              </motion.div>

              {/* Bottom credit */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.2 }}
                className="mt-16 hud-element text-white/20 text-xs"
              >
                BUILT WITH UNLAYER REACT IMAGE EDITOR &nbsp;·&nbsp; #BuiltWithImageEditor
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
