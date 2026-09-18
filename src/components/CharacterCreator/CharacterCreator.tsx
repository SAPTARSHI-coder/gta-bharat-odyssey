import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Character, CharacterStats } from '../../types';
import { sounds } from '../../utils/audio';

export interface CharacterArchetype {
  id: 'urban' | 'tech' | 'street' | 'corporate';
  name: string;
  role: string;
  image: string;
  height: string;
  bounty: string;
  threat: string;
  color: string;
  accent: string;
  specialty: string;
  origin: string;
  defaultBio: string;
}

export const ARCHETYPES: Record<'urban' | 'tech' | 'street' | 'corporate', CharacterArchetype> = {
  urban: {
    id: 'urban',
    name: 'VINEWOOD HUSTLER',
    role: 'Del Perro Street Racer & Syndicate Wheelman',
    image: '/assets/char_hustler.jpg',
    height: "6'1\"",
    bounty: '$75,000',
    threat: '★★★★☆',
    color: '#ff9933',
    accent: '#ffd700',
    specialty: 'High-speed evasive driving, counterfeit vehicle titles, nitrous tuning',
    origin: 'South Central & Vinewood Hills, Los Santos',
    defaultBio: 'Wanted for grand theft auto and reckless evasion on Vespucci Blvd. Known to ditch cruisers on the Pacific Coast Hwy without scratching his paint.',
  },
  tech: {
    id: 'tech',
    name: 'DARKNET INFILTRATOR',
    role: 'Zero-Day Exploit Specialist & Cyber Operative',
    image: '/assets/char_hacker.jpg',
    height: "5'11\"",
    bounty: '$120,000',
    threat: '★★★★★',
    color: '#00f5ff',
    accent: '#b347ff',
    specialty: 'ATM skimming, bank security bypass, EMP pulses, drone surveillance',
    origin: 'Black-Budget Silicon Syndicate, San Fierro',
    defaultBio: 'Ex-defense contractor turned rogue cypherpunk. Erased his own birth certificate, emptied Maze Bank offshore reserves, and wired the loot into cold wallets.',
  },
  street: {
    id: 'street',
    name: 'STREET ENFORCER',
    role: 'South Central Heavy Muscle & Vault Breacher',
    image: '/assets/char_enforcer.jpg',
    height: "6'4\"",
    bounty: '$150,000',
    threat: '★★★★★',
    color: '#ff2d87',
    accent: '#ff6b35',
    specialty: 'Thermal lance breaching, armed crowd intimidation, close-quarters combat',
    origin: 'Strawberry & Davis District, Los Santos',
    defaultBio: 'Two-time Bolingbroke escapee. Built like a brick safehouse with gold chains and zero remorse. The only weapon he trusts is whatever hits hardest.',
  },
  corporate: {
    id: 'corporate',
    name: 'CORPORATE EMBEZZLER',
    role: 'Maze Bank Shadow Executive & International Launderer',
    image: '/assets/char_exec.jpg',
    height: "6'0\"",
    bounty: '$190,000',
    threat: '★★★★☆',
    color: '#ffd700',
    accent: '#4ade80',
    specialty: 'Shell company laundering, international wire routing, federal judge bribery',
    origin: 'Downtown Los Santos Financial Core',
    defaultBio: 'High-stakes boardroom predator. Never held a crowbar when a signature can siphon millions through Caymans shell accounts. Smooth, ruthless, untouchable.',
  },
};

const APPEARANCES = ['urban', 'tech', 'street', 'corporate'] as const;
const OUTFITS = ['jacket', 'hoodie', 'suit', 'casual'] as const;
const BACKGROUNDS = ['streets', 'tech', 'art', 'hustle'] as const;

const TITLES: Record<string, string> = {
  'tech-tech-jacket': 'CYBER OPERATIVE',
  'tech-tech-hoodie': 'TECH NOMAD',
  'urban-street-jacket': 'STREET LEGEND',
  'corporate-suit-tech': 'SHADOW EXEC',
  'street-hustle-casual': 'HUSTLER',
  'art-art-casual': 'VISIONARY',
};

function getTitle(appearance: string, background: string, outfit: string): string {
  const key = `${appearance}-${background}-${outfit}`;
  return TITLES[key] || 'LONE WOLF';
}

function getAvatar(appearance: string): string {
  const avatars: Record<string, string> = {
    urban: '🕶️', tech: '💻', street: '🎭', corporate: '⚡',
  };
  return avatars[appearance] || '🌟';
}

const DEFAULT_STATS: CharacterStats = { driving: 70, street: 65, tech: 80, style: 75, luck: 60 };

function StatSlider({ label, value, onChange, color }: {
  label: string; value: number; onChange: (v: number) => void; color: string;
}) {
  return (
    <div className="mb-3.5">
      <div className="flex justify-between items-center mb-1">
        <span className="hud-element text-white/70 text-[11px]">{label}</span>
        <span className="font-game text-xs font-bold" style={{ color }}>{value}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 stat-bar h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}, #ff6b35)` }}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-3.5 rounded-sm cursor-pointer transition-all"
              style={{
                background: i < Math.round(value / 10) ? color : 'rgba(255,255,255,0.1)',
                boxShadow: i < Math.round(value / 10) ? `0 0 4px ${color}` : 'none',
              }}
              onClick={() => onChange((i + 1) * 10)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CharacterCreator() {
  const { goToScene, setCharacter } = useGame();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [appearance, setAppearance] = useState<typeof APPEARANCES[number]>('urban');
  const [outfit, setOutfit] = useState<typeof OUTFITS[number]>('jacket');
  const [background, setBackground] = useState<typeof BACKGROUNDS[number]>('tech');
  const [stats, setStats] = useState<CharacterStats>({ ...DEFAULT_STATS });
  const [error, setError] = useState('');

  const currentArchetype = ARCHETYPES[appearance];
  const title = getTitle(appearance, background, outfit);
  const avatar = getAvatar(appearance);
  const totalPoints = Object.values(stats).reduce((a, b) => a + b, 0);

  function updateStat(key: keyof CharacterStats, value: number) {
    setStats(prev => ({ ...prev, [key]: value }));
  }

  function handleStart() {
    if (!name.trim()) { setError('Enter your operative street alias'); return; }
    sounds.playClick();
    const char: Character = {
      name: name.trim().toUpperCase(),
      title,
      bio: bio || currentArchetype.defaultBio,
      appearance,
      outfit,
      background,
      stats,
      avatar,
      image: currentArchetype.image,
    };
    setCharacter(char);
    const lsSec = document.getElementById('section-los-santos');
    if (lsSec) {
      lsSec.scrollIntoView({ behavior: 'smooth' });
    } else {
      goToScene('los-santos');
    }
  }

  const optionBtn = (active: boolean) =>
    `px-3 py-2 text-xs font-game uppercase tracking-wider rounded transition-all duration-200 cursor-pointer border ${
      active
        ? 'border-purple-500 bg-purple-600/30 text-purple-300 shadow-[0_0_10px_rgba(179,71,255,0.5)] font-bold'
        : 'border-white/10 bg-white/5 text-white/50 hover:border-purple-500/50 hover:text-white/80'
    }`;

  return (
    <div className="min-h-screen bg-black/80 backdrop-blur-md relative overflow-hidden pt-20 pb-16 px-4 select-none">
      {/* Background grid */}
      <div
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(179,71,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(179,71,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="hud-element text-purple-400 mb-1.5 font-bold tracking-[0.4em]">
            ★ CHAPTER 02: LSPD BOOKING DOSSIER // RAP SHEET ★
          </div>
          <h2 className="font-cinematic text-4xl sm:text-6xl md:text-7xl text-white tracking-wide leading-none" style={{ textShadow: '0 0 35px rgba(179,71,255,0.6)' }}>
            BUILD YOUR CRIMINAL
          </h2>
          <p className="font-game text-xs text-white/50 tracking-[0.25em] mt-2">
            SELECT ARCHETYPE · DISTRIBUTE HEIST STATS · LOG YOUR POLICE RECORD
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 space-y-5"
          >
            {/* Name Input */}
            <div className="glass-panel p-5 bg-black/75 border border-white/15 rounded-xl">
              <label className="hud-element text-purple-400 block mb-2 font-bold tracking-wider">
                ◈ ALIAS / STREET NAME
              </label>
              <input
                value={name}
                onChange={e => { setName(e.target.value); setError(''); }}
                placeholder='e.g. FRANKIE "THE GHOST" VANCE'
                className="w-full bg-black/60 border border-purple-500/40 rounded px-4 py-3 text-white font-game text-base uppercase tracking-widest focus:outline-none focus:border-purple-400 focus:shadow-[0_0_15px_rgba(179,71,255,0.5)] placeholder-white/25 transition-all"
                maxLength={20}
              />
              {error && <p className="text-red-400 text-xs mt-2 font-game font-bold">⚠ {error}</p>}
            </div>

            {/* Appearance (Archetype) Selection */}
            <div className="glass-panel p-5 bg-black/75 border border-white/15 rounded-xl">
              <label className="hud-element text-purple-400 block mb-3 font-bold tracking-wider">
                ◈ CRIMINAL SPECIALTY & VIBE (SELECT 1 OF 4)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {APPEARANCES.map(a => {
                  const arch = ARCHETYPES[a];
                  const isSelected = appearance === a;
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setAppearance(a);
                      }}
                      className={optionBtn(isSelected)}
                    >
                      <div className="flex items-center gap-1.5 justify-center">
                        <span>{getAvatar(a)}</span>
                        <span className="truncate">{arch.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Outfit */}
            <div className="glass-panel p-5 bg-black/75 border border-white/15 rounded-xl">
              <label className="hud-element text-purple-400 block mb-3 font-bold tracking-wider">
                ◈ THREADS & HEIST GEAR
              </label>
              <div className="grid grid-cols-2 gap-2">
                {OUTFITS.map(o => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setOutfit(o);
                    }}
                    className={optionBtn(outfit === o)}
                  >
                    {o === 'jacket' ? '🧥 Biker Leather Jacket' : o === 'hoodie' ? '👕 Heist Hoodie' : o === 'suit' ? '👔 Italian Silk Suit' : '👟 Tracksuit & Gold Chain'}
                  </button>
                ))}
              </div>
            </div>

            {/* Background */}
            <div className="glass-panel p-5 bg-black/75 border border-white/15 rounded-xl">
              <label className="hud-element text-purple-400 block mb-3 font-bold tracking-wider">
                ◈ CRIMINAL RECORD ORIGIN
              </label>
              <div className="grid grid-cols-2 gap-2">
                {BACKGROUNDS.map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setBackground(b);
                    }}
                    className={optionBtn(background === b)}
                  >
                    {b === 'streets' ? '🏙️ South Central LS' : b === 'tech' ? '🔬 Black-Budget Hacker' : b === 'art' ? '🎨 Master Forger' : '💰 High-Stakes Smuggler'}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio / Rap Sheet */}
            <div className="glass-panel p-5 bg-black/75 border border-white/15 rounded-xl">
              <label className="hud-element text-purple-400 block mb-2 font-bold tracking-wider">
                ◈ POLICE INCIDENT REPORT // PRIOR CONVICTIONS
              </label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder={currentArchetype.defaultBio}
                className="w-full bg-black/60 border border-purple-500/40 rounded px-4 py-2.5 text-white/85 text-xs sm:text-sm font-game focus:outline-none focus:border-purple-400 placeholder-white/20 transition-all resize-none leading-relaxed"
                rows={3}
                maxLength={140}
              />
            </div>

            {/* Heist Stats Sliders */}
            <div className="glass-panel p-5 bg-black/75 border border-white/15 rounded-xl">
              <div className="hud-element text-purple-400 mb-3 font-bold tracking-wider">
                ◈ ALLOCATE HEIST ATTRIBUTES
              </div>
              <StatSlider label="TECH // HACKING" value={stats.tech} onChange={v => updateStat('tech', v)} color="#00f5ff" />
              <StatSlider label="WHEELMAN // GETAWAY" value={stats.driving} onChange={v => updateStat('driving', v)} color="#ff9933" />
              <StatSlider label="SWAGGER // DISGUISE" value={stats.style} onChange={v => updateStat('style', v)} color="#ff2d87" />
              <StatSlider label="STREET HEAT // INTEL" value={stats.street} onChange={v => updateStat('street', v)} color="#4ade80" />
              <StatSlider label="DEVIL'S LUCK" value={stats.luck} onChange={v => updateStat('luck', v)} color="#ffd700" />
            </div>
          </motion.div>

          {/* Right Column: LIVING GTA BIOMETRIC LINEUP STAGE (6 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-6 space-y-4"
          >
            {/* Animated Lineup Box */}
            <div
              className="glass-panel p-5 relative overflow-hidden rounded-2xl border bg-black/85 backdrop-blur-xl"
              style={{
                borderColor: `${currentArchetype.color}70`,
                boxShadow: `0 0 35px ${currentArchetype.color}25, inset 0 0 30px ${currentArchetype.color}10`,
              }}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ background: currentArchetype.color }} />
                  <span className="hud-element text-xs tracking-widest font-bold" style={{ color: currentArchetype.color }}>
                    ★ LSPD BIOMETRIC LINEUP // CAM-04 ★
                  </span>
                </div>
                <div className="font-game text-[10px] text-white/50 tracking-wider">
                  SUSPECT ID: #{appearance.toUpperCase()}-9042
                </div>
              </div>

              {/* 3D-Styled Animated Character Viewport */}
              <div className="relative w-full h-[400px] sm:h-[450px] rounded-xl overflow-hidden bg-neutral-950 border border-white/15 flex items-center justify-center">
                {/* LSPD Height Measurement Grid Lines in background */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                  {["6'8\"", "6'4\"", "6'0\"", "5'8\"", "5'4\"", "5'0\""].map((hMark, idx) => (
                    <div
                      key={hMark}
                      className="absolute w-full flex items-center justify-between px-3 text-[10px] font-mono text-white/40"
                      style={{ top: `${14 + idx * 14}%` }}
                    >
                      <span className="border-b border-white/20 w-8" />
                      <span>{hMark}</span>
                      <span className="border-b border-white/20 flex-1 mx-3" />
                      <span>{hMark}</span>
                      <span className="border-b border-white/20 w-8" />
                    </div>
                  ))}
                </div>

                {/* Atmospheric Spotlight Cone */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: `radial-gradient(ellipse at 50% 15%, ${currentArchetype.color}40 0%, transparent 70%)`,
                  }}
                  animate={{ opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* The Animated Character Render */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentArchetype.id}
                    initial={{ opacity: 0, scale: 0.93, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -10 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="relative z-10 w-full h-full flex items-center justify-center"
                  >
                    {/* Natural Breathing & Stance Shift Animation */}
                    <motion.img
                      src={currentArchetype.image}
                      alt={currentArchetype.name}
                      animate={{
                        y: [0, -7, 0],
                        scale: [1, 1.018, 1],
                        rotate: [0, 0.35, 0, -0.35, 0],
                      }}
                      transition={{
                        duration: 4.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-full h-full object-cover object-top filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] cursor-pointer"
                      onClick={() => sounds.playClick()}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Moving Facial Recognition Laser Scanline */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] pointer-events-none z-20"
                  style={{
                    background: `linear-gradient(90deg, transparent 5%, ${currentArchetype.color} 50%, transparent 95%)`,
                    boxShadow: `0 0 12px ${currentArchetype.color}, 0 0 25px ${currentArchetype.color}`,
                  }}
                  animate={{ top: ['12%', '86%', '12%'] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* HUD Targeting Brackets & Facial Recognition Metadata */}
                <div className="absolute inset-2 pointer-events-none z-20 flex flex-col justify-between p-2">
                  <div className="flex items-start justify-between">
                    <div className="font-mono text-[10px] text-white/90 bg-black/75 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1.5 backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      <span>REC [HD 60FPS]</span>
                    </div>
                    <div className="font-mono text-[10px] bg-black/75 px-2 py-0.5 rounded border border-white/10 text-right backdrop-blur-sm font-bold" style={{ color: currentArchetype.color }}>
                      MATCH: 99.4%
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="bg-black/85 px-2.5 py-1.5 rounded border border-white/15 backdrop-blur-md">
                      <div className="font-cinematic text-sm text-white tracking-wider">
                        {name ? name.toUpperCase() : currentArchetype.name}
                      </div>
                      <div className="font-game text-[10px] text-white/60">
                        HEIGHT: {currentArchetype.height} · BOUNTY: {currentArchetype.bounty}
                      </div>
                    </div>
                    <div className="font-game text-[11px] px-2 py-0.5 rounded bg-black/85 border text-amber-400 border-amber-400/40 backdrop-blur-md font-bold">
                      {currentArchetype.threat}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Interactive Character Switcher Mini Tabs */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {Object.values(ARCHETYPES).map((arch) => {
                  const isSelected = appearance === arch.id;
                  return (
                    <button
                      key={arch.id}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setAppearance(arch.id);
                      }}
                      className={`relative group rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer p-1 text-center ${
                        isSelected
                          ? 'border-purple-400 bg-purple-950/80 shadow-[0_0_15px_rgba(179,71,255,0.7)] scale-105'
                          : 'border-white/10 bg-black/60 opacity-60 hover:opacity-100 hover:border-white/30'
                      }`}
                    >
                      <div className="w-full h-12 rounded overflow-hidden mb-1">
                        <img src={arch.image} alt={arch.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="font-game text-[9px] font-bold truncate" style={{ color: isSelected ? arch.color : '#fff' }}>
                        {arch.name.split(' ')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Archetype Dossier Details */}
              <div className="mt-3.5 p-3.5 rounded-lg bg-black/60 border border-white/10">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-cinematic text-base tracking-wider text-white">
                    {currentArchetype.name}
                  </span>
                  <span className="font-game text-[10px] px-2 py-0.5 rounded bg-white/10 text-amber-300 font-bold border border-white/10">
                    {title}
                  </span>
                </div>
                <div className="font-game text-[11px] text-white/60 mb-1.5">
                  {currentArchetype.role}
                </div>
                <p className="font-game text-xs text-white/80 leading-relaxed italic">
                  "{bio || currentArchetype.defaultBio}"
                </p>
                <div className="font-game text-[10px] text-white/50 mt-2 border-t border-white/10 pt-1.5 flex flex-wrap items-center justify-between gap-2">
                  <span>SPECIALTY: {currentArchetype.specialty}</span>
                  <span className="text-amber-400 font-bold">BOUNTY: {currentArchetype.bounty}</span>
                </div>
              </div>

              {/* Threat Index Ticker */}
              <div className="mt-3 text-right hud-element text-orange-400 text-xs font-bold">
                ★ TOTAL HEIST READINESS: {totalPoints} / 500 ★
              </div>
            </div>

            {/* Confirm & Start Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="w-full game-btn-orange py-4 text-base sm:text-lg flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(255,107,53,0.8)]"
            >
              <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">
                SPACE / ENTER
              </span>
              <span className="font-bold tracking-wider">
                CONFIRM DOSSIER & HIT THE STREETS →
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
