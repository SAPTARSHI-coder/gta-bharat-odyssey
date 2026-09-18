import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '../../utils/audio';

interface Wonder {
  id: string;
  name: string;
  district: string;
  country: string;
  flag: string;
  bounty: string;
  stars: number;
  brief: string;
  status: 'CLEARED' | 'ACTIVE' | 'LOCKED';
  image: string;
  color: string;
}

const WONDERS: Wonder[] = [
  {
    id: 'great-wall',
    name: 'GREAT WALL',
    district: 'BADALING RIDGE DISTRICT',
    country: 'BEIJING, CHINA',
    flag: '🇨🇳',
    bounty: '$280,000',
    stars: 5,
    brief: 'Thirteen-thousand miles of ancient fortification. The Triads own every watchtower. Get in. Get the data. Get out.',
    status: 'ACTIVE',
    image: '/assets/great_wall_gta.jpg',
    color: '#ff9933',
  },
  {
    id: 'christ',
    name: 'CHRIST THE REDEEMER',
    district: 'CORCOVADO SUMMIT, RIO',
    country: 'RIO DE JANEIRO, BRAZIL',
    flag: '🇧🇷',
    bounty: '$195,000',
    stars: 4,
    brief: 'Lightning-struck mountain. The cartel stash is inside the base. Storm\'s rolling in. So are you.',
    status: 'ACTIVE',
    image: '/assets/christ_redeemer_gta.jpg',
    color: '#b347ff',
  },
  {
    id: 'colosseum',
    name: 'THE COLOSSEUM',
    district: 'ARENA DISTRICT, ROME',
    country: 'ROME, ITALY',
    flag: '🇮🇹',
    bounty: '$320,000',
    stars: 5,
    brief: '2,000-year-old gladiator pit. The mob uses it for underground auctions. Tonight you\'re the main event.',
    status: 'ACTIVE',
    image: '/assets/colosseum_gta.jpg',
    color: '#ff2d87',
  },
  {
    id: 'chichen-itza',
    name: 'CHICHEN ITZA',
    district: 'KUKULCAN PLAZA, YUCATAN',
    country: 'YUCATAN, MEXICO',
    flag: '🇲🇽',
    bounty: '$160,000',
    stars: 3,
    brief: 'Mayan pyramid with 365 steps and an ancient power source the cartel wants to weaponize. This is above your pay grade. Do it anyway.',
    status: 'ACTIVE',
    image: '/assets/chichen_itza_gta.jpg',
    color: '#00f5ff',
  },
  {
    id: 'taj-mahal',
    name: 'TAJ MAHAL',
    district: 'ETERNAL SHRINE, AGRA',
    country: 'AGRA, INDIA',
    flag: '🇮🇳',
    bounty: '$240,000',
    stars: 5,
    brief: 'You were just in Delhi. The rift sent you right past it. Marble. Gold. And a vault beneath the reflecting pool nobody knows about.',
    status: 'CLEARED',
    image: '/assets/taj_mahal_gta.jpg',
    color: '#ff9933',
  },
  {
    id: 'machu-picchu',
    name: 'MACHU PICCHU',
    district: 'LOST CITY, ANDES',
    country: 'CUSCO, PERU',
    flag: '🇵🇪',
    bounty: '$145,000',
    stars: 3,
    brief: 'Cloud city. No roads in. No roads out. The Inca gold they "discovered" is yours if you can get to 2,430 meters before they do.',
    status: 'ACTIVE',
    image: '/assets/machu_picchu_gta.jpg',
    color: '#4ade80',
  },
  {
    id: 'petra',
    name: 'PETRA',
    district: 'RED ROCK CITY, JORDAN',
    country: 'MA\'AN, JORDAN',
    flag: '🇯🇴',
    bounty: '$210,000',
    stars: 4,
    brief: 'Rose-red city carved into sandstone. Half as old as time, twice as dangerous. The Sheikh\'s vault is through the Siq. You have one hour.',
    status: 'ACTIVE',
    image: '/assets/petra_gta.jpg',
    color: '#fb923c',
  },
];

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className="text-xs"
          style={{ color: i < stars ? '#ffd700' : 'rgba(255,255,255,0.15)', textShadow: i < stars ? '0 0 6px #ffd700' : 'none' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function WonderCard({ wonder, index, onSelect }: { wonder: Wonder; index: number; onSelect: (w: Wonder) => void }) {
  const isCleared = wonder.status === 'CLEARED';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ scale: 1.03, y: -4 }}
      onClick={() => { sounds.playClick(); onSelect(wonder); }}
      className="relative group cursor-pointer overflow-hidden rounded-lg"
      style={{
        border: `1px solid ${isCleared ? 'rgba(74,222,128,0.4)' : wonder.color + '40'}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.6), 0 0 0 0px ${wonder.color}`,
        transition: 'box-shadow 0.2s',
      }}
    >
      {/* Background Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={wonder.image}
          alt={wonder.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ filter: isCleared ? 'grayscale(50%) brightness(0.6)' : 'brightness(0.75)' }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.95) 100%)`,
          }}
        />

        {/* Top badges */}
        <div className="absolute top-2 left-2 right-2 flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-base leading-none">{wonder.flag}</span>
            <span
              className="font-game text-[10px] tracking-widest font-bold px-1.5 py-0.5 rounded"
              style={{
                background: 'rgba(0,0,0,0.8)',
                color: wonder.color,
                border: `1px solid ${wonder.color}40`,
              }}
            >
              {wonder.country}
            </span>
          </div>

          {/* Status badge */}
          <div
            className={`font-game text-[10px] font-bold tracking-widest px-2 py-1 rounded flex items-center gap-1 ${
              isCleared
                ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                : 'bg-red-500/20 border border-red-500/50 text-red-400'
            }`}
          >
            {isCleared ? '✓ CLEARED' : '⚡ ACTIVE'}
          </div>
        </div>

        {/* CLEARED overlay */}
        {isCleared && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="font-cinematic text-4xl text-emerald-400 opacity-60 rotate-[-20deg] select-none"
              style={{ textShadow: '0 0 20px #4ade80', border: '3px solid #4ade8060', padding: '4px 12px' }}
            >
              CLEARED
            </div>
          </div>
        )}

        {/* Name at bottom of image */}
        <div className="absolute bottom-2 left-3 right-3">
          <div
            className="font-cinematic text-xl text-white leading-tight"
            style={{ textShadow: `0 0 15px ${wonder.color}` }}
          >
            {wonder.name}
          </div>
          <div className="font-game text-[10px] text-white/50 tracking-wider">{wonder.district}</div>
        </div>
      </div>

      {/* Card Body */}
      <div className="bg-black/90 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <StarRating stars={wonder.stars} />
          <div className="font-game text-xs font-bold" style={{ color: isCleared ? '#4ade80' : '#ffd700', textShadow: '0 0 8px currentColor' }}>
            {isCleared ? '✓ BOUNTY CLAIMED' : `BOUNTY: ${wonder.bounty}`}
          </div>
        </div>

        <p className="font-game text-[11px] text-white/60 leading-relaxed line-clamp-2">
          {wonder.brief}
        </p>

        <div
          className="w-full font-game text-[11px] font-bold tracking-widest py-1.5 text-center rounded transition-all opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, ${wonder.color}20, ${wonder.color}40)`,
            color: wonder.color,
            border: `1px solid ${wonder.color}50`,
          }}
        >
          {isCleared ? '▶ VIEW MISSION FILE' : '▶ OPEN DOSSIER'}
        </div>
      </div>
    </motion.div>
  );
}

function MissionModal({ wonder, onClose }: { wonder: Wonder; onClose: () => void }) {
  const scrollToEditor = () => {
    sounds.playClick();
    document.getElementById('section-editor')?.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-lg w-full overflow-hidden rounded-xl"
        style={{
          border: `2px solid ${wonder.color}60`,
          boxShadow: `0 0 60px ${wonder.color}40, 0 25px 60px rgba(0,0,0,0.9)`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header image */}
        <div className="relative h-52 overflow-hidden">
          <img src={wonder.image} alt={wonder.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-white text-sm font-bold cursor-pointer transition-colors"
          >
            ✕
          </button>
          <div className="absolute bottom-3 left-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{wonder.flag}</span>
              <StarRating stars={wonder.stars} />
            </div>
            <div className="font-cinematic text-3xl text-white" style={{ textShadow: `0 0 20px ${wonder.color}` }}>
              {wonder.name}
            </div>
            <div className="font-game text-xs text-white/50 tracking-widest">{wonder.district} · {wonder.country}</div>
          </div>
        </div>

        {/* Modal body */}
        <div className="bg-black p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className={`font-game text-xs font-bold tracking-widest px-3 py-1.5 rounded ${wonder.status === 'CLEARED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'}`}>
              {wonder.status === 'CLEARED' ? '✓ MISSION CLEARED' : '⚡ MISSION ACTIVE'}
            </div>
            <div className="font-game text-sm font-bold" style={{ color: '#ffd700' }}>
              BOUNTY: {wonder.bounty}
            </div>
          </div>

          <div className="border-l-2 pl-3" style={{ borderColor: wonder.color }}>
            <div className="font-game text-[11px] text-white/40 mb-1 tracking-widest">MISSION BRIEF</div>
            <p className="font-game text-sm text-white/80 leading-relaxed">
              "{wonder.brief}"
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={scrollToEditor}
              className="flex-1 py-3 font-game text-sm font-bold tracking-widest rounded cursor-pointer transition-all"
              style={{
                background: `linear-gradient(135deg, ${wonder.color}30, ${wonder.color}20)`,
                border: `1px solid ${wonder.color}60`,
                color: wonder.color,
              }}
            >
              🎨 DESIGN POSTER FOR THIS WONDER
            </button>
          </div>
          <p className="font-game text-[10px] text-white/30 text-center tracking-widest">
            Use Unlayer React Image Editor to customize your wanted poster for this location
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SevenWondersBoard() {
  const [selectedWonder, setSelectedWonder] = useState<Wonder | null>(null);

  const scrollToEditor = () => {
    sounds.playClick();
    document.getElementById('section-editor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const totalBounty = WONDERS.filter(w => w.status !== 'CLEARED').reduce((sum, w) => {
    return sum + parseInt(w.bounty.replace(/[$,]/g, ''), 10);
  }, 0);

  return (
    <div className="relative min-h-screen w-full flex flex-col py-20 px-4 md:px-8 select-none overflow-hidden">
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(179,71,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(179,71,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="hud-element text-red-400 mb-2 tracking-[0.4em] font-bold"
        >
          ◈ THE RIFT BLEW OPEN THE ENTIRE MAP ◈
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1 }}
          className="font-cinematic text-5xl sm:text-7xl md:text-8xl text-white mb-3 leading-tight"
          style={{ textShadow: '0 0 40px rgba(255,45,135,0.6)' }}
        >
          SEVEN WONDERS
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.2 }}
          className="font-cinematic text-2xl md:text-3xl mb-4"
          style={{
            background: 'linear-gradient(135deg, #ff2d87, #b347ff, #00f5ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          GLOBAL HEIST BOARD
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.3 }}
          className="font-game text-sm text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          Your rift didn't just punch a hole to Bharat — it blew open every locked door on the planet.
          Seven landmarks. Seven bounties. One operative. All seven wonders are now available as poster templates in the studio.
        </motion.p>

        {/* Total active bounty ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-3 mt-4 glass-panel px-5 py-2.5 border border-red-500/30"
        >
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="font-game text-xs text-white/60">TOTAL ACTIVE BOUNTIES:</span>
          <span className="font-cinematic text-lg text-red-400" style={{ textShadow: '0 0 12px #ff4444' }}>
            ${totalBounty.toLocaleString()}
          </span>
          <span className="font-game text-xs text-red-400/60">OUTSTANDING</span>
        </motion.div>
      </div>

      {/* 7 Wonder Cards Grid */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
        {WONDERS.map((wonder, i) => (
          <WonderCard key={wonder.id} wonder={wonder} index={i} onSelect={setSelectedWonder} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="relative z-10 flex flex-col items-center gap-3 mt-auto"
      >
        <motion.button
          onClick={scrollToEditor}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="game-btn-purple px-12 py-4 text-base md:text-lg flex items-center gap-3 cursor-pointer shadow-[0_0_40px_rgba(179,71,255,0.85)]"
        >
          <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">SPACE</span>
          <span className="font-bold tracking-wider">ENTER POSTER STUDIO — ALL 7 WONDERS UNLOCKED →</span>
        </motion.button>
        <div className="font-game text-[11px] text-white/30 tracking-widest">
          ◆ 14 TOTAL TEMPLATES IN UNLAYER REACT IMAGE EDITOR · PICK YOUR LEGEND ◆
        </div>
      </motion.div>

      {/* Mission Dossier Modal */}
      <AnimatePresence>
        {selectedWonder && (
          <MissionModal wonder={selectedWonder} onClose={() => setSelectedWonder(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
