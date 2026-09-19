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

// 1. Rio: Christ the Redeemer - Epic Tropical Storm & Branching Lightning Bolts
function RioLightningFX() {
  const [bolts, setBolts] = useState<Array<{ id: number; path: string; color: string }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const startX = 350 + (Math.random() - 0.5) * 200;
      const midX1 = startX + (Math.random() - 0.5) * 80;
      const midY1 = 150 + Math.random() * 50;
      const midX2 = midX1 + (Math.random() - 0.5) * 60;
      const midY2 = 300 + Math.random() * 60;
      const endX = 400 + (Math.random() - 0.5) * 80;

      const path = `M ${startX} 0 L ${midX1} ${midY1} L ${midX2} ${midY2} L ${endX} 480`;
      const newBolt = {
        id: Date.now(),
        path,
        color: Math.random() > 0.4 ? '#00f5ff' : '#ffffff',
      };
      setBolts([newBolt]);
      setTimeout(() => setBolts([]), 220);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Sky Flash */}
      <motion.div
        className="absolute inset-0 bg-cyan-100/25 pointer-events-none"
        animate={{ opacity: [0, 0, 0.6, 0, 0.9, 0, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.65, 0.67, 0.69, 0.72, 0.76, 1] }}
      />
      {/* Dynamic SVG Lightning Bolt */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="none">
        {bolts.map(b => (
          <path
            key={b.id}
            d={b.path}
            fill="none"
            stroke={b.color}
            strokeWidth={3.5}
            strokeLinecap="round"
            filter="drop-shadow(0 0 12px #00f5ff) drop-shadow(0 0 25px #b347ff)"
          />
        ))}
      </svg>
      {/* Heavy tropical storm rain streaks */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(115deg, transparent 40%, rgba(0,245,255,0.6) 41%, transparent 43%)',
          backgroundSize: '20px 20px',
        }}
      />
    </div>
  );
}

// 2. Agra: Taj Mahal - Celestial Moonlight Aura & Floating Diwali Lanterns & Stardust
function TajLanternsFX() {
  const lanterns = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: 10 + ((i * 17) % 80),
    delay: (i * 0.4) % 4,
    duration: 6 + ((i * 1.3) % 4),
    size: 7 + (i % 4) * 2,
  }));

  const stardust = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: (i * 13) % 100,
    y: 15 + ((i * 19) % 65),
    delay: (i * 0.3) % 3,
    size: 2 + (i % 3),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Soft Ethereal Lunar Moon Halo over dome */}
      <motion.div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,245,200,0.2) 0%, rgba(255,215,0,0.08) 45%, transparent 75%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating Diwali Lanterns */}
      {lanterns.map(l => (
        <motion.div
          key={l.id}
          className="absolute rounded-full"
          style={{
            left: `${l.x}%`,
            bottom: '-10%',
            width: l.size,
            height: l.size * 1.35,
            background: 'radial-gradient(circle at 50% 35%, #ffffff 0%, #ffd700 45%, #ff7700 85%, transparent 100%)',
            boxShadow: '0 0 14px #ff9933, 0 0 28px #ffd700',
          }}
          animate={{
            y: ['0vh', '-120vh'],
            x: [0, Math.sin(l.id) * 35, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Twinkling Celestial Stardust Motes */}
      {stardust.map(s => (
        <motion.div
          key={`star-${s.id}`}
          className="absolute rounded-full bg-amber-200"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            boxShadow: '0 0 8px #ffd700, 0 0 16px #ffffff',
          }}
          animate={{
            opacity: [0.1, 0.9, 0.1],
            scale: [0.7, 1.4, 0.7],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3 + (s.id % 3),
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// 3. Rome: Colosseum - Roaring Gladiator Torches, Sparks & Cinematic Arena Spotlights
function ColosseumEmbersFX() {
  const embers = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: 12 + ((i * 16) % 76),
    delay: (i * 0.25) % 2.5,
    duration: 2.8 + ((i * 0.6) % 2.5),
    size: 2 + (i % 3),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Sweeping Arena Searchlight Beams */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-32 h-[120vh] origin-bottom -rotate-45 pointer-events-none mix-blend-screen"
        style={{
          background: 'linear-gradient(0deg, rgba(255,180,80,0.3) 0%, rgba(255,100,50,0.1) 60%, transparent 100%)',
          filter: 'blur(8px)',
        }}
        animate={{ rotate: [-45, -15, -45] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-32 h-[120vh] origin-bottom rotate-45 pointer-events-none mix-blend-screen"
        style={{
          background: 'linear-gradient(0deg, rgba(255,180,80,0.3) 0%, rgba(255,100,50,0.1) 60%, transparent 100%)',
          filter: 'blur(8px)',
        }}
        animate={{ rotate: [45, 15, 45] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Fiery Arena Torches Glow */}
      <motion.div
        className="absolute inset-0 bg-red-950/20 mix-blend-color-dodge"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Updraft Embers & Sparks */}
      {embers.map(e => (
        <motion.div
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: `${e.x}%`,
            bottom: '10%',
            width: e.size,
            height: e.size,
            background: ['#ffffff', '#ffd700', '#ff5500', '#ff2200'][e.id % 4],
            boxShadow: '0 0 10px #ff5500, 0 0 20px #ffd700',
          }}
          animate={{
            y: [0, -320 - (e.id * 8)],
            x: [0, (e.id % 2 === 0 ? 1 : -1) * 35],
            opacity: [0, 1, 0],
            scale: [1, 0.3],
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

// 4. Yucatan: Chichen Itza - Mystical Pyramid Cosmic Light Beam & Floating Mayan Glyphs
function ChichenEnergyFX() {
  const glyphs = ['✦', '◆', '◈', '☼', '◬', '✧'];
  const orbs = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: 25 + ((i * 14) % 50),
    y: 30 + ((i * 16) % 50),
    delay: i * 0.25,
    glyph: glyphs[i % glyphs.length],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Cosmic Vertical Energy Beam shooting from Pyramid Apex to the Heavens */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-[65%] origin-bottom mix-blend-screen pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,245,255,0.8) 0%, rgba(57,255,20,0.6) 50%, transparent 100%)',
          filter: 'blur(6px)',
          boxShadow: '0 0 40px #00f5ff, 0 0 80px #39ff14',
        }}
        animate={{
          scaleX: [1, 1.4, 0.9, 1.2, 1],
          opacity: [0.65, 0.95, 0.65],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating Mystical Runes / Orbs */}
      {orbs.map(o => (
        <motion.div
          key={o.id}
          className="absolute font-mono text-emerald-300 font-bold select-none"
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            textShadow: '0 0 12px #39ff14, 0 0 25px #00f5ff',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.sin(o.id) * 20, 0],
            opacity: [0.2, 0.85, 0.2],
            scale: [0.8, 1.25, 0.8],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 4 + (o.id % 3),
            delay: o.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {o.glyph}
        </motion.div>
      ))}

      {/* Ethereal Jungle Spirit Fog */}
      <motion.div
        className="absolute inset-0 bg-emerald-600/10 mix-blend-screen"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// 5. Badaling Ridge: Great Wall - Dragon Ridge Mist, Swaying Red Lanterns & Watchtower Beacon Flames
function GreatWallMistFX() {
  const lanterns = [
    { x: '18%', y: '52%' },
    { x: '35%', y: '44%' },
    { x: '58%', y: '36%' },
    { x: '78%', y: '30%' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Rolling Dragon Mountain Mist */}
      <motion.div
        className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 45% 65%, rgba(200,220,255,0.4) 0%, transparent 60%)',
        }}
        animate={{ x: [-40, 40, -40], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Swaying Ancient Red Lantern Beacons on the Watchtowers */}
      {lanterns.map((l, i) => (
        <motion.div
          key={i}
          className="absolute flex flex-col items-center pointer-events-none"
          style={{ left: l.x, top: l.y }}
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 3.2 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-1 h-3 bg-amber-400/60" />
          <div
            className="w-4 h-6 rounded-md"
            style={{
              background: 'radial-gradient(circle at 50% 40%, #ffeedd 0%, #ff2222 65%, #990000 100%)',
              boxShadow: '0 0 16px #ff2222, 0 0 32px #ff7700',
            }}
          />
        </motion.div>
      ))}

      {/* Smoke & Ember Drift from Ridge Towers */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 pointer-events-none"
          style={{
            left: `${20 + (i * 20) % 60}%`,
            top: `${40 + (i * 7) % 20}%`,
            boxShadow: '0 0 8px #ff7700',
          }}
          animate={{
            y: [0, -100 - i * 10],
            x: [0, (i % 2 === 0 ? 1 : -1) * 30],
            opacity: [0, 0.8, 0],
            scale: [1, 2.5],
          }}
          transition={{
            duration: 3 + i * 0.4,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// 6. Cusco: Machu Picchu - Incan Sun God Solar Corona & Rolling Terrace Cloud Mist
function AndesGodRaysFX() {
  const runes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 15 + ((i * 17) % 70),
    y: 20 + ((i * 19) % 60),
    delay: (i * 0.3) % 3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Majestic Soft Sun Bloom over Andes Mountain Peaks */}
      <motion.div
        className="absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(255,225,120,0.35) 0%, rgba(255,180,50,0.12) 45%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating Golden Solar Dust Motes */}
      {runes.map(r => (
        <motion.div
          key={r.id}
          className="absolute w-2 h-2 rounded-full bg-amber-300 pointer-events-none"
          style={{
            left: `${r.x}%`,
            top: `${r.y}%`,
            boxShadow: '0 0 12px #ffd700, 0 0 24px #ffaa00',
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, Math.cos(r.id) * 20, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [0.7, 1.3, 0.7],
          }}
          transition={{
            duration: 4 + (r.id % 3),
            delay: r.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* High-altitude Andes Cloud Mist Rolling across Terraces */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[45%] pointer-events-none mix-blend-screen"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.18) 50%, rgba(200,240,255,0.25) 100%)',
          filter: 'blur(10px)',
        }}
        animate={{ y: [0, -15, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// 7. Ma'an: Petra Treasury - Siq Desert Sand Vortex & Ancient Torchfire with Glowing Vault Door
function PetraTorchFX() {
  const sandParticles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: (i * 7) % 100,
    y: 20 + ((i * 13) % 75),
    delay: (i * 0.15) % 2.5,
    size: 2 + (i % 3),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Mystical Golden Amber Pulse from the Treasury Vault Portal Door */}
      <motion.div
        className="absolute top-[48%] left-[49%] -translate-x-1/2 -translate-y-1/2 w-48 h-64 rounded-xl pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,180,60,0.55) 0%, rgba(255,80,20,0.25) 50%, transparent 80%)',
          filter: 'blur(8px)',
        }}
        animate={{
          scale: [0.95, 1.25, 0.95],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ancient Bedouin Torches along the Siq Cliff Base */}
      <motion.div
        className="absolute bottom-12 left-1/4 w-72 h-72 rounded-full pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(255,120,40,0.4) 0%, rgba(255,60,0,0.1) 50%, transparent 70%)',
          filter: 'blur(12px)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-12 right-1/4 w-72 h-72 rounded-full pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(255,120,40,0.4) 0%, rgba(255,60,0,0.1) 50%, transparent 70%)',
          filter: 'blur(12px)',
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.9, 0.6, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Swirling Desert Sand Vortex Particles */}
      {sandParticles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: ['#f59e0b', '#fbbf24', '#fef08a', '#d97706'][p.id % 4],
            boxShadow: '0 0 8px #f59e0b',
          }}
          animate={{
            x: [0, 80 + (p.id % 4) * 20],
            y: [0, -40 - (p.id % 3) * 15],
            opacity: [0, 0.85, 0],
            scale: [0.8, 1.5, 0.8],
          }}
          transition={{
            duration: 3 + (p.id % 3),
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
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
    <div className="relative min-h-screen w-full flex flex-col justify-between select-none overflow-hidden bg-black text-white pt-20 pb-6 px-4 md:px-12">
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
      <div className="relative z-20 w-full flex flex-wrap items-center justify-between gap-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span className="hud-element text-red-400 text-xs md:text-sm tracking-[0.35em] font-bold">
            ★ CHAPTER 08: INTERPOL RED NOTICES // 7 WONDERS ★
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass-panel px-3.5 py-1.5 border border-red-500/40 flex items-center gap-2 bg-black/70 backdrop-blur-md">
            <span className="font-game text-[10px] sm:text-[11px] text-white/70">GLOBAL BOUNTY POOL:</span>
            <span className="font-cinematic text-base sm:text-lg text-red-400" style={{ textShadow: '0 0 10px #ff4444' }}>
              ${totalBounty.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => setIsTheaterOpen(true)}
            className="glass-panel px-3 py-1.5 text-xs font-game border border-white/20 hover:border-amber-400 text-white/80 hover:text-white cursor-pointer transition-all flex items-center gap-1.5 bg-black/70 backdrop-blur-md"
            title="Open 4K Fullscreen Theater"
          >
            <span>⛶</span>
            <span className="hidden sm:inline">4K THEATER</span>
          </button>
        </div>
      </div>

      {/* CENTER STAGE: Left-Aligned GTA Dossier Briefing + Target Intel */}
      <div className="relative z-20 my-auto py-4 max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWonder.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-neutral-950/90 backdrop-blur-2xl p-5 sm:p-6 rounded-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.95)] space-y-3.5"
            style={{
              borderLeft: `4px solid ${currentWonder.color}`,
              boxShadow: `0 0 35px ${currentWonder.color}25, 0 20px 50px rgba(0,0,0,0.9)`,
            }}
          >
            {/* Header: Target Location, Flag & Quick Navigation Chevrons */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-2xl leading-none">{currentWonder.flag}</span>
                <span
                  className="font-game text-[11px] tracking-widest font-bold px-2.5 py-1 rounded"
                  style={{
                    background: 'rgba(0,0,0,0.95)',
                    color: currentWonder.color,
                    border: `1px solid ${currentWonder.color}80`,
                    boxShadow: `0 0 12px ${currentWonder.color}30`,
                  }}
                >
                  TARGET 0{currentIndex + 1} OF 07 · {currentWonder.district}
                </span>
                <span className="font-game text-xs font-bold text-white/80">{currentWonder.country}</span>
              </div>

              {/* In-Card Quick Target Chevrons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Target"
                  className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/25 border border-white/30 hover:border-amber-400 text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-all"
                  title="Previous Heist Target (←)"
                >
                  ‹
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Target"
                  className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/25 border border-white/30 hover:border-amber-400 text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-all"
                  title="Next Heist Target (→)"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Cinematic Wonder Title */}
            <h2
              className="font-cinematic text-4xl sm:text-5xl md:text-6xl text-white leading-tight tracking-wide"
              style={{
                textShadow: `0 4px 25px rgba(0,0,0,1), 0 0 35px ${currentWonder.color}80`,
              }}
            >
              {currentWonder.name}
            </h2>

            {/* Threat, Bounty & Status Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Stars */}
              <div className="glass-panel px-3 py-1 border border-white/25 flex items-center gap-1 bg-black/70">
                <span className="font-game text-[11px] text-white/80 font-bold mr-1">THREAT:</span>
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
                className="glass-panel px-3 py-1 border font-game text-xs font-bold tracking-wider bg-black/70"
                style={{
                  borderColor: `${currentWonder.color}80`,
                  color: currentWonder.status === 'CLEARED' ? '#4ade80' : '#ffd700',
                  textShadow: '0 0 8px currentColor',
                }}
              >
                {currentWonder.status === 'CLEARED' ? '✓ BOUNTY CLAIMED' : `BOUNTY: ${currentWonder.bounty}`}
              </div>

              {/* Status */}
              <div
                className={`font-game text-[11px] font-bold tracking-widest px-2.5 py-1 rounded ${
                  currentWonder.status === 'CLEARED'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 font-bold'
                    : 'bg-red-500/25 text-red-300 border border-red-500/60 font-bold'
                }`}
              >
                {currentWonder.status === 'CLEARED' ? '✓ CLEARED' : '⚡ ACTIVE TARGET'}
              </div>
            </div>

            {/* Mission Briefing Text */}
            <div className="border-l-2 pl-3.5 py-1.5 bg-white/5 rounded-r-lg" style={{ borderColor: currentWonder.color }}>
              <div className="font-game text-xs text-amber-400 font-bold tracking-widest uppercase mb-1">
                FIB SURVEILLANCE & MISSION INTEL:
              </div>
              <p className="font-game text-sm text-white font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                "{currentWonder.brief}"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handleCustomizeInEditor}
                className="game-btn-purple text-xs sm:text-sm px-6 py-2.5 flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(179,71,255,0.7)]"
              >
                <span className="px-1.5 py-0.5 rounded bg-black/40 font-mono text-[10px] border border-white/30 font-bold">
                  E
                </span>
                <span className="font-bold tracking-wider">
                  FORGE WANTED POSTER →
                </span>
              </button>

              <button
                onClick={() => setIsTheaterOpen(true)}
                className="glass-panel px-4 py-2.5 font-game text-xs text-white font-bold hover:text-cyan-300 border border-white/30 hover:border-cyan-400 cursor-pointer transition-colors bg-black/70"
              >
                4K HEIST INTEL 👁️
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM: Filmstrip Dial of all 7 Wonders */}
      <div className="relative z-20 w-full pt-2">
        {/* Filmstrip selector track with flanking chevrons */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 px-2 max-w-5xl mx-auto">
          <button
            onClick={handlePrev}
            aria-label="Previous Target"
            className="shrink-0 w-8 sm:w-10 h-14 sm:h-16 rounded-lg glass-panel border border-white/20 hover:border-amber-400 text-white/70 hover:text-white flex items-center justify-center text-xl font-bold cursor-pointer transition-all hover:scale-105 bg-black/70"
            title="Previous Heist Target"
          >
            ‹
          </button>

          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 px-1 no-scrollbar">
            {WONDERS.map((w, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={w.id}
                  onClick={() => handleSelectWonder(idx)}
                  className={`relative group shrink-0 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'w-24 sm:w-32 h-14 sm:h-16 scale-105'
                      : 'w-16 sm:w-20 h-12 sm:h-14 opacity-55 hover:opacity-100 hover:scale-100'
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

          <button
            onClick={handleNext}
            aria-label="Next Target"
            className="shrink-0 w-8 sm:w-10 h-14 sm:h-16 rounded-lg glass-panel border border-white/20 hover:border-amber-400 text-white/70 hover:text-white flex items-center justify-center text-xl font-bold cursor-pointer transition-all hover:scale-105 bg-black/70"
            title="Next Heist Target"
          >
            ›
          </button>
        </div>

        {/* Keyboard hint & Direct Next Chapter button */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-game text-white/80 pt-2 border-t border-white/15 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-white/15 border border-white/30 font-mono text-[10px] text-amber-400 font-bold">
              ← / →
            </span>
            <span className="text-white/90 font-medium">USE ARROW KEYS OR [1-7] TO CYCLE HEIST TARGETS</span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              document.getElementById('section-editor')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer flex items-center gap-1.5 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
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
