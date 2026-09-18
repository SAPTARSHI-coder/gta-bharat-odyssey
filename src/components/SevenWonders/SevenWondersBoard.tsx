import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { sounds } from '../../utils/audio';

export interface Wonder {
  id: string;
  name: string;
  district: string;
  country: string;
  flag: string;
  bounty: string;
  stars: number;
  brief: string;
  status: 'CLEARED' | 'ACTIVE';
  image: string;
  color: string;
  accent: string;
}

export const WONDERS: Wonder[] = [
  {
    id: 'great-wall',
    name: 'GREAT WALL OF CHINA',
    district: 'BADALING RIDGE DISTRICT',
    country: 'BEIJING, CHINA',
    flag: '🇨🇳',
    bounty: '$280,000',
    stars: 5,
    brief: 'Thirteen-thousand miles of ancient fortification. The Triads hold every watchtower. Helicopter extraction on the eastern ridge. Get in. Get the data. Get out.',
    status: 'ACTIVE',
    image: '/assets/great_wall_gta.jpg',
    color: '#ff9933',
    accent: '#ffa84a',
  },
  {
    id: 'christ-redeemer',
    name: 'CHRIST THE REDEEMER',
    district: 'CORCOVADO SUMMIT, RIO',
    country: 'RIO DE JANEIRO, BRAZIL',
    flag: '🇧🇷',
    bounty: '$195,000',
    stars: 4,
    brief: 'Lightning-struck granite peak over Guanabara Bay. The cartel bullion is secured inside the pedestal vault. Heavy tropical storm rolling in. Perfect cover.',
    status: 'ACTIVE',
    image: '/assets/christ_redeemer_gta.jpg',
    color: '#b347ff',
    accent: '#00f5ff',
  },
  {
    id: 'colosseum',
    name: 'THE ROMAN COLOSSEUM',
    district: 'GLADIATOR ARENA DISTRICT',
    country: 'ROME, ITALY',
    flag: '🇮🇹',
    bounty: '$320,000',
    stars: 5,
    brief: 'Two-thousand-year-old gladiator arena. Modern syndicate supercar auction underway in the subterranean hypogeum. Tonight you leave with the prize.',
    status: 'ACTIVE',
    image: '/assets/colosseum_gta.jpg',
    color: '#ff2d87',
    accent: '#ff8844',
  },
  {
    id: 'chichen-itza',
    name: 'CHICHEN ITZA PYRAMID',
    district: 'KUKULCAN JUNGLE PLAZA',
    country: 'YUCATAN, MEXICO',
    flag: '🇲🇽',
    bounty: '$160,000',
    stars: 3,
    brief: '365 stone steps ascending into the night. An electromagnetic frequency pulses from the top chamber through ancient carvings. The locals call it magic; the cartel calls it leverage.',
    status: 'ACTIVE',
    image: '/assets/chichen_itza_gta.jpg',
    color: '#00f5ff',
    accent: '#39ff14',
  },
  {
    id: 'taj-mahal',
    name: 'TAJ MAHAL ETERNAL',
    district: 'YAMUNA HARBOR & REFLECTING POOL',
    country: 'AGRA, INDIA',
    flag: '🇮🇳',
    bounty: '$240,000',
    stars: 5,
    brief: 'The cosmic rift sent shockwaves right down the Grand Trunk Road. White marble reflecting under thousands of floating Diwali lanterns. Vault located beneath the pool.',
    status: 'CLEARED',
    image: '/assets/taj_mahal_gta.jpg',
    color: '#ffd700',
    accent: '#ff9933',
  },
  {
    id: 'machu-picchu',
    name: 'MACHU PICCHU CITADEL',
    district: 'LOST INCA TERRACES, ANDES',
    country: 'CUSCO, PERU',
    flag: '🇵🇪',
    bounty: '$145,000',
    stars: 3,
    brief: 'Eight-thousand feet above sea level. No paved roads. Swirling cloud cover keeps satellite surveillance blind. The original Incan sun discs are still in the temple.',
    status: 'ACTIVE',
    image: '/assets/machu_picchu_gta.jpg',
    color: '#4ade80',
    accent: '#facc15',
  },
  {
    id: 'petra',
    name: 'PETRA TREASURY',
    district: 'AL-KHAZNEH SIQ CANYON',
    country: 'MA\'AN, JORDAN',
    flag: '🇯🇴',
    bounty: '$210,000',
    stars: 4,
    brief: 'Rose-red city carved directly into sandstone cliffs. Half as old as time, twice as fortified. Bedouin torchlight lines the Siq gorge. The vault door is forty feet up.',
    status: 'ACTIVE',
    image: '/assets/petra_gta.jpg',
    color: '#fb923c',
    accent: '#f43f5e',
  },
];

/* =========================================================================
   ATMOSPHERIC LIVING FX LAYERS
   ========================================================================= */

// 1. Rio: Lightning flashes & rain
function RioLightningFX() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Random lightning flash */}
      <motion.div
        className="absolute inset-0 bg-cyan-200/20"
        animate={{ opacity: [0, 0, 0.4, 0, 0.8, 0, 0, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.6, 0.62, 0.64, 0.68, 0.72, 0.8, 1] }}
      />
      {/* Rain streaks */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'linear-gradient(115deg, transparent 40%, rgba(0,245,255,0.4) 41%, transparent 42%)',
          backgroundSize: '25px 25px',
        }}
      />
    </div>
  );
}

// 2. Agra: Floating Diwali lanterns
function TajLanternsFX() {
  const lanterns = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: 10 + ((i * 17) % 80),
    delay: (i * 0.4) % 4,
    duration: 6 + ((i * 1.3) % 4),
    size: 6 + (i % 5) * 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {lanterns.map(l => (
        <motion.div
          key={l.id}
          className="absolute rounded-full"
          style={{
            left: `${l.x}%`,
            bottom: '-10%',
            width: l.size,
            height: l.size * 1.3,
            background: 'radial-gradient(circle, #fff 0%, #ff9933 60%, transparent 100%)',
            boxShadow: '0 0 12px #ff9933, 0 0 25px #ffd700',
          }}
          animate={{
            y: ['0vh', '-120vh'],
            x: [0, Math.sin(l.id) * 35, 0],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// 3. Rome: Torch embers & sparks
function ColosseumEmbersFX() {
  const embers = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: 15 + ((i * 19) % 70),
    delay: (i * 0.3) % 3,
    duration: 3 + ((i * 0.7) % 3),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {embers.map(e => (
        <motion.div
          key={e.id}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${e.x}%`,
            bottom: '15%',
            background: ['#ff4400', '#ff9900', '#ffd700'][e.id % 3],
            boxShadow: '0 0 8px #ff4400',
          }}
          animate={{
            y: [0, -250 - (e.id * 10)],
            x: [0, (e.id % 2 === 0 ? 1 : -1) * 30],
            opacity: [0, 1, 0],
            scale: [1, 0.2],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// 4. Yucatan: Emerald energy runes & fireflies
function ChichenEnergyFX() {
  const fireflies = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: 20 + ((i * 15) % 65),
    y: 35 + ((i * 12) % 50),
    delay: i * 0.2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Mysterious pulsing green fog */}
      <motion.div
        className="absolute inset-0 bg-emerald-500/10"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {fireflies.map(f => (
        <motion.div
          key={f.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            background: '#39ff14',
            boxShadow: '0 0 15px #39ff14, 0 0 30px #00f5ff',
          }}
          animate={{
            x: [0, Math.cos(f.id) * 40, 0],
            y: [0, Math.sin(f.id) * 30, 0],
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 3 + (f.id % 3),
            delay: f.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// 5. Great Wall: Mountain fog roll
function GreatWallMistFX() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 40% 70%, rgba(255,255,255,0.4) 0%, transparent 60%)',
        }}
        animate={{ x: [-30, 30, -30], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// 6. Machu Picchu: Sun god rays
function AndesGodRaysFX() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <motion.div
        className="absolute -top-10 left-1/3 w-96 h-[800px] origin-top rotate-[-15deg] opacity-20"
        style={{
          background: 'linear-gradient(180deg, rgba(255,215,0,0.6) 0%, rgba(255,255,255,0.2) 40%, transparent 80%)',
        }}
        animate={{ opacity: [0.1, 0.3, 0.1], rotate: [-15, -12, -15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// 7. Petra: Desert torch flare
function PetraTorchFX() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <motion.div
        className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #ff6b35 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function WonderAtmosphere({ id }: { id: string }) {
  switch (id) {
    case 'christ-redeemer': return <RioLightningFX />;
    case 'taj-mahal':       return <TajLanternsFX />;
    case 'colosseum':        return <ColosseumEmbersFX />;
    case 'chichen-itza':    return <ChichenEnergyFX />;
    case 'great-wall':      return <GreatWallMistFX />;
    case 'machu-picchu':    return <AndesGodRaysFX />;
    case 'petra':           return <PetraTorchFX />;
    default:                return null;
  }
}

/* =========================================================================
   MAIN COMPONENT: SEVEN WONDERS FULL-SCREEN CINEMATIC SHOWCASE
   ========================================================================= */

export function SevenWondersBoard() {
  const { setSelectedTemplateId } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTheaterOpen, setIsTheaterOpen] = useState(false);

  const currentWonder = WONDERS[currentIndex];

  const handleNext = useCallback(() => {
    sounds.playClick();
    setCurrentIndex(prev => (prev + 1) % WONDERS.length);
  }, []);

  const handlePrev = useCallback(() => {
    sounds.playClick();
    setCurrentIndex(prev => (prev - 1 + WONDERS.length) % WONDERS.length);
  }, []);

  const handleSelectWonder = (index: number) => {
    sounds.playClick();
    setCurrentIndex(index);
  };

  const handleCustomizeInEditor = () => {
    sounds.playClick();
    setSelectedTemplateId(currentWonder.id);
    const editorSec = document.getElementById('section-editor');
    if (editorSec) {
      editorSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard navigation: Left/Right arrows, keys 1-7
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only react if within or near section-wonders
      const section = document.getElementById('section-wonders');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView && !isTheaterOpen) return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape' && isTheaterOpen) {
        setIsTheaterOpen(false);
      } else {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= WONDERS.length) {
          handleSelectWonder(num - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isTheaterOpen]);

  const totalBounty = WONDERS.filter(w => w.status !== 'CLEARED').reduce((sum, w) => {
    return sum + parseInt(w.bounty.replace(/[$,]/g, ''), 10);
  }, 0);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between select-none overflow-hidden bg-black text-white py-16 px-4 md:px-10">
      {/* FULL BLEED BACKGROUND: Cross-fading 16:9 4K Artwork */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWonder.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Cinematic Continuous Slow Drift */}
            <motion.img
              src={currentWonder.image}
              alt={currentWonder.name}
              animate={{
                scale: [1, 1.05, 1],
                x: [0, -10, 0],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Vignette Gradients & Letterbox */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.92) 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 35% 50%, transparent 20%, rgba(0,0,0,0.85) 100%)',
          }}
        />

        {/* Dynamic Wonder Atmospheric FX Layer */}
        <WonderAtmosphere id={currentWonder.id} />
      </div>

      {/* TOP BAR: Chapter Badge + Global Bounty Ticker + Theater Toggle */}
      <div className="relative z-20 w-full flex flex-wrap items-center justify-between gap-4 pt-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span className="hud-element text-red-400 text-xs md:text-sm tracking-[0.4em] font-bold">
            ★ CHAPTER 08: INTERPOL RED NOTICES // 7 WONDERS ★
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass-panel px-4 py-1.5 border border-red-500/40 flex items-center gap-2">
            <span className="font-game text-[11px] text-white/70">GLOBAL BOUNTY POOL:</span>
            <span className="font-cinematic text-lg text-red-400" style={{ textShadow: '0 0 10px #ff4444' }}>
              ${totalBounty.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => setIsTheaterOpen(true)}
            className="glass-panel px-3 py-1.5 text-xs font-game border border-white/20 hover:border-amber-400 text-white/80 hover:text-white cursor-pointer transition-all flex items-center gap-1.5"
            title="Open 4K Fullscreen Theater"
          >
            <span>⛶</span>
            <span className="hidden sm:inline">4K THEATER</span>
          </button>
        </div>
      </div>

      {/* CENTER STAGE: Left-Aligned GTA Dossier Briefing + Target Intel */}
      <div className="relative z-20 my-auto py-8 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWonder.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-4"
          >
            {/* Target Location / Flag */}
            <div className="flex items-center gap-2.5">
              <span className="text-2xl leading-none">{currentWonder.flag}</span>
              <span
                className="font-game text-xs tracking-widest font-bold px-2.5 py-1 rounded"
                style={{
                  background: 'rgba(0,0,0,0.85)',
                  color: currentWonder.color,
                  border: `1px solid ${currentWonder.color}50`,
                  boxShadow: `0 0 12px ${currentWonder.color}30`,
                }}
              >
                TARGET {currentIndex + 1} OF 7 · {currentWonder.district}
              </span>
              <span className="font-game text-xs text-white/50">{currentWonder.country}</span>
            </div>

            {/* Giant Cinematic Wonder Name */}
            <h2
              className="font-cinematic text-5xl sm:text-7xl md:text-8xl text-white leading-none tracking-wide"
              style={{
                textShadow: `0 5px 30px rgba(0,0,0,0.9), 0 0 40px ${currentWonder.color}70`,
              }}
            >
              {currentWonder.name}
            </h2>

            {/* Bounty & Status Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Stars */}
              <div className="glass-panel px-3 py-1.5 border border-white/20 flex items-center gap-1">
                <span className="font-game text-[10px] text-white/40 mr-1">THREAT:</span>
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className="text-xs"
                    style={{
                      color: i < currentWonder.stars ? '#ffd700' : 'rgba(255,255,255,0.2)',
                      textShadow: i < currentWonder.stars ? '0 0 6px #ffd700' : 'none',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Bounty */}
              <div
                className="glass-panel px-4 py-1.5 border font-game text-sm font-bold tracking-wider"
                style={{
                  borderColor: `${currentWonder.color}60`,
                  color: currentWonder.status === 'CLEARED' ? '#4ade80' : '#ffd700',
                  textShadow: '0 0 10px currentColor',
                }}
              >
                {currentWonder.status === 'CLEARED' ? '✓ BOUNTY CLAIMED' : `BOUNTY: ${currentWonder.bounty}`}
              </div>

              {/* Status */}
              <div
                className={`font-game text-xs font-bold tracking-widest px-3 py-1.5 rounded ${
                  currentWonder.status === 'CLEARED'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                    : 'bg-red-500/20 text-red-400 border border-red-500/50'
                }`}
              >
                {currentWonder.status === 'CLEARED' ? '✓ CLEARED' : '⚡ ACTIVE TARGET'}
              </div>
            </div>

            {/* Mission Briefing Text */}
            <div
              className="glass-panel p-4 border-l-4 max-w-xl backdrop-blur-md bg-black/75"
              style={{ borderColor: currentWonder.color }}
            >
              <div className="font-game text-[10px] text-white/50 tracking-widest uppercase mb-1">
                FIB SURVEILLANCE & MISSION INTEL:
              </div>
              <p className="font-game text-sm sm:text-base text-white/90 leading-relaxed">
                "{currentWonder.brief}"
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleCustomizeInEditor}
                className="game-btn-purple text-sm sm:text-base px-8 py-3.5 flex items-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(179,71,255,0.8)]"
              >
                <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">
                  E
                </span>
                <span className="font-bold tracking-wider">
                  FORGE WANTED POSTER FOR THIS TARGET →
                </span>
              </button>

              <button
                onClick={() => setIsTheaterOpen(true)}
                className="glass-panel px-5 py-3.5 font-game text-xs text-white/80 hover:text-white border border-white/20 hover:border-cyan-400 cursor-pointer transition-colors"
              >
                4K HEIST INTEL [FULLSCREEN] 👁️
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Screen Edge Left/Right Arrows for Rapid Navigation */}
      <button
        onClick={handlePrev}
        aria-label="Previous Wonder"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass-panel border border-white/20 hover:border-amber-400 text-white/70 hover:text-white flex items-center justify-center text-2xl font-bold cursor-pointer transition-all hover:scale-110 active:scale-95"
      >
        ‹
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Wonder"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass-panel border border-white/20 hover:border-amber-400 text-white/70 hover:text-white flex items-center justify-center text-2xl font-bold cursor-pointer transition-all hover:scale-110 active:scale-95"
      >
        ›
      </button>

      {/* BOTTOM: Filmstrip Dial of all 7 Wonders */}
      <div className="relative z-20 w-full pt-4">
        {/* Filmstrip selector track */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-2 px-4 no-scrollbar">
          {WONDERS.map((w, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={w.id}
                onClick={() => handleSelectWonder(idx)}
                className={`relative group shrink-0 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'w-24 sm:w-32 h-16 sm:h-20 scale-105'
                    : 'w-16 sm:w-20 h-14 sm:h-16 opacity-55 hover:opacity-100 hover:scale-100'
                }`}
                style={{
                  border: isSelected ? `2px solid ${w.color}` : '1px solid rgba(255,255,255,0.2)',
                  boxShadow: isSelected ? `0 0 20px ${w.color}80, inset 0 0 10px ${w.color}40` : 'none',
                }}
              >
                <img
                  src={w.image}
                  alt={w.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-1 left-1.5 right-1.5 flex items-center justify-between text-[10px] font-game">
                  <span className="text-xs">{w.flag}</span>
                  <span
                    className="font-bold truncate"
                    style={{ color: isSelected ? w.color : '#fff' }}
                  >
                    0{idx + 1}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Keyboard hint & Direct Next Chapter button */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-game text-white/40 pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 font-mono text-[10px]">
              ← / →
            </span>
            <span>USE ARROW KEYS OR [1-7] TO CYCLE HEIST TARGETS</span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              document.getElementById('section-editor')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-amber-400 font-bold transition-colors cursor-pointer flex items-center gap-1.5 text-white/70"
          >
            <span>ADVANCE TO CRIME LAB (14 HEIST TEMPLATES)</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* FULLSCREEN 4K THEATER LIGHTBOX MODAL */}
      <AnimatePresence>
        {isTheaterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col justify-between p-6 select-none"
            onClick={() => setIsTheaterOpen(false)}
          >
            {/* Top Close / Info Header */}
            <div className="flex items-center justify-between z-10" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentWonder.flag}</span>
                <div>
                  <div className="font-cinematic text-3xl text-white tracking-wider">
                    {currentWonder.name}
                  </div>
                  <div className="font-game text-xs text-white/50">
                    {currentWonder.district} · {currentWonder.country}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={currentWonder.image}
                  download={`${currentWonder.id}_gta_concept.jpg`}
                  className="game-btn-orange text-xs px-4 py-2 font-bold cursor-pointer"
                  onClick={e => e.stopPropagation()}
                >
                  ⬇ DOWNLOAD FULL ART
                </a>

                <button
                  onClick={() => setIsTheaterOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/30 text-white flex items-center justify-center font-bold text-lg cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Central Master 16:9 Uncompressed Frame */}
            <div
              className="relative my-auto max-w-6xl w-full mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/20"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={currentWonder.image}
                alt={currentWonder.name}
                className="w-full max-h-[75vh] object-contain mx-auto bg-black"
              />
              <WonderAtmosphere id={currentWonder.id} />
            </div>

            {/* Bottom Controls inside Theater */}
            <div className="flex items-center justify-between z-10 text-xs font-game text-white/60" onClick={e => e.stopPropagation()}>
              <button
                onClick={handlePrev}
                className="hover:text-white transition-colors cursor-pointer px-3 py-1.5 glass-panel border border-white/20"
              >
                ‹ PREVIOUS TARGET
              </button>

              <button
                onClick={() => {
                  setIsTheaterOpen(false);
                  handleCustomizeInEditor();
                }}
                className="game-btn-purple text-xs px-6 py-2 font-bold cursor-pointer"
              >
                🎨 EDIT THIS IN UNLAYER POSTER STUDIO
              </button>

              <button
                onClick={handleNext}
                className="hover:text-white transition-colors cursor-pointer px-3 py-1.5 glass-panel border border-white/20"
              >
                NEXT TARGET ›
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
