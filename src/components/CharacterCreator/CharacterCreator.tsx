import React, { useState, useEffect } from 'react';
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
    defaultBio: 'Wanted for grand theft auto and reckless evasion on Vespucci Blvd. Ditching cruisers on Pacific Coast Hwy.',
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
    defaultBio: 'Ex-defense contractor turned rogue cypherpunk. Erased his identity, emptied Maze Bank offshore vaults.',
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
    specialty: 'Thermal lance breaching, armed intimidation, heavy munitions',
    origin: 'Strawberry & Davis District, Los Santos',
    defaultBio: 'Two-time Bolingbroke escapee. Built like a brick safehouse with gold chains and zero remorse.',
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
    specialty: 'Shell company laundering, international wire routing, federal bribery',
    origin: 'Downtown Los Santos Financial Core',
    defaultBio: 'High-stakes boardroom predator. Siphoning millions through Caymans shell accounts. Untouchable.',
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

const DEFAULT_STATS: CharacterStats = { driving: 75, street: 70, tech: 85, style: 80, luck: 65 };

function StatSlider({ label, value, onChange, color }: {
  label: string; value: number; onChange: (v: number) => void; color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="hud-element text-white/60 text-[10px] w-28 shrink-0 truncate">{label}</span>
      <div className="flex-1 stat-bar h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}, #ff6b35)` }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="flex gap-0.5 shrink-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-2.5 rounded-xs cursor-pointer transition-all"
            style={{
              background: i < Math.round(value / 20) ? color : 'rgba(255,255,255,0.15)',
              boxShadow: i < Math.round(value / 20) ? `0 0 3px ${color}` : 'none',
            }}
            onClick={() => onChange((i + 1) * 20)}
          />
        ))}
      </div>
      <span className="font-game text-[11px] font-bold w-6 text-right" style={{ color }}>{value}</span>
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

  const handleStart = () => {
    if (!name.trim()) { setError('Enter your operative alias'); return; }
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
  };

  // Keyboard navigation: [1-4] to select character, [Arrow Keys] to cycle, [Enter] to submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in the text input
      const isInput = document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA';
      if (isInput) {
        if (e.key === 'Enter') {
          handleStart();
        }
        return;
      }

      if (e.key === '1') { sounds.playClick(); setAppearance('urban'); }
      else if (e.key === '2') { sounds.playClick(); setAppearance('tech'); }
      else if (e.key === '3') { sounds.playClick(); setAppearance('street'); }
      else if (e.key === '4') { sounds.playClick(); setAppearance('corporate'); }
      else if (e.key === 'ArrowRight') {
        sounds.playClick();
        setAppearance(prev => {
          const idx = APPEARANCES.indexOf(prev);
          return APPEARANCES[(idx + 1) % APPEARANCES.length];
        });
      } else if (e.key === 'ArrowLeft') {
        sounds.playClick();
        setAppearance(prev => {
          const idx = APPEARANCES.indexOf(prev);
          return APPEARANCES[(idx - 1 + APPEARANCES.length) % APPEARANCES.length];
        });
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [name, title, bio, appearance, outfit, background, stats, currentArchetype]);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center select-none overflow-hidden bg-black/85 backdrop-blur-md pt-16 pb-4 px-4 md:px-8">
      {/* Background grid */}
      <div
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(179,71,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(179,71,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto">
        {/* Compact Header */}
        <div className="text-center mb-3">
          <div className="hud-element text-purple-400 text-[10px] sm:text-xs font-bold tracking-[0.35em]">
            ★ CHAPTER 02: LSPD BOOKING DOSSIER // RAP SHEET ★
          </div>
          <h2
            className="font-cinematic text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight"
            style={{ textShadow: '0 0 25px rgba(179,71,255,0.6)' }}
          >
            BUILD YOUR CRIMINAL
          </h2>
          <div className="font-game text-[10px] sm:text-[11px] text-white/50 tracking-wider">
            PRESS <span className="text-amber-400 font-bold">[1-4]</span> OR <span className="text-amber-400 font-bold">[←/→]</span> TO CYCLE SUSPECTS · PRESS <span className="text-amber-400 font-bold">[ENTER]</span> TO HIT STREETS
          </div>
        </div>

        {/* 2-Column Balanced Dashboard */}
        <div className="grid lg:grid-cols-12 gap-4 items-stretch">
          {/* Left Column: Dossier Configurations (5 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
            {/* Alias Card */}
            <div className="glass-panel p-3.5 bg-black/75 border border-white/15 rounded-xl">
              <label className="hud-element text-purple-400 block text-[10px] font-bold tracking-wider mb-1">
                ◈ OPERATIVE ALIAS / STREET NAME
              </label>
              <input
                value={name}
                onChange={e => { setName(e.target.value); setError(''); }}
                placeholder='e.g. FRANKIE "THE GHOST" VANCE'
                className="w-full bg-black/60 border border-purple-500/40 rounded px-3.5 py-1.5 text-white font-game text-sm uppercase tracking-widest focus:outline-none focus:border-purple-400 placeholder-white/25 transition-all"
                maxLength={20}
              />
              {error && <p className="text-red-400 text-[10px] mt-1 font-game font-bold">⚠ {error}</p>}
            </div>

            {/* Specialty Selection (4 buttons) */}
            <div className="glass-panel p-3 bg-black/75 border border-white/15 rounded-xl">
              <label className="hud-element text-purple-400 block text-[10px] font-bold tracking-wider mb-1.5">
                ◈ CRIMINAL SPECIALTY (1 OF 4)
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {APPEARANCES.map((a, idx) => {
                  const arch = ARCHETYPES[a];
                  const isSelected = appearance === a;
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => { sounds.playClick(); setAppearance(a); }}
                      className={`px-2 py-1.5 rounded text-[11px] font-game uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-1.5 justify-center ${
                        isSelected
                          ? 'border-purple-400 bg-purple-600/30 text-white shadow-[0_0_12px_rgba(179,71,255,0.6)] font-bold'
                          : 'border-white/10 bg-black/40 text-white/50 hover:border-purple-500/50 hover:text-white/80'
                      }`}
                    >
                      <span className="font-mono text-[10px] text-amber-400">[{idx + 1}]</span>
                      <span className="truncate">{arch.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Threads & Origin Combined */}
            <div className="glass-panel p-3 bg-black/75 border border-white/15 rounded-xl grid grid-cols-2 gap-3">
              <div>
                <label className="hud-element text-purple-400 block text-[10px] font-bold tracking-wider mb-1">
                  ◈ THREADS
                </label>
                <div className="space-y-1">
                  {OUTFITS.map(o => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => { sounds.playClick(); setOutfit(o); }}
                      className={`w-full px-2 py-0.5 rounded text-[10px] font-game uppercase tracking-wider transition-all cursor-pointer border truncate text-left ${
                        outfit === o
                          ? 'border-purple-400 bg-purple-600/30 text-white font-bold'
                          : 'border-white/10 bg-black/40 text-white/50 hover:text-white'
                      }`}
                    >
                      {o === 'jacket' ? '🧥 Biker Jacket' : o === 'hoodie' ? '👕 Heist Hoodie' : o === 'suit' ? '👔 Silk Suit' : '👟 Tracksuit'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="hud-element text-purple-400 block text-[10px] font-bold tracking-wider mb-1">
                  ◈ SYNDICATE ORIGIN
                </label>
                <div className="space-y-1">
                  {BACKGROUNDS.map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => { sounds.playClick(); setBackground(b); }}
                      className={`w-full px-2 py-0.5 rounded text-[10px] font-game uppercase tracking-wider transition-all cursor-pointer border truncate text-left ${
                        background === b
                          ? 'border-purple-400 bg-purple-600/30 text-white font-bold'
                          : 'border-white/10 bg-black/40 text-white/50 hover:text-white'
                      }`}
                    >
                      {b === 'streets' ? '🏙️ South Central' : b === 'tech' ? '🔬 Silicon Hacker' : b === 'art' ? '🎨 Master Forger' : '💰 High Smuggler'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Heist Stats Sliders (Compact) */}
            <div className="glass-panel p-3 bg-black/75 border border-white/15 rounded-xl">
              <div className="hud-element text-purple-400 mb-2 font-bold tracking-wider text-[10px] flex items-center justify-between">
                <span>◈ HEIST ATTRIBUTES</span>
                <span className="text-orange-400 font-mono text-[11px]">INDEX: {totalPoints}/500</span>
              </div>
              <div className="space-y-1.5">
                <StatSlider label="TECH // HACKING" value={stats.tech} onChange={v => updateStat('tech', v)} color="#00f5ff" />
                <StatSlider label="WHEELMAN // GETAWAY" value={stats.driving} onChange={v => updateStat('driving', v)} color="#ff9933" />
                <StatSlider label="SWAGGER // DISGUISE" value={stats.style} onChange={v => updateStat('style', v)} color="#ff2d87" />
                <StatSlider label="STREET HEAT // INTEL" value={stats.street} onChange={v => updateStat('street', v)} color="#4ade80" />
                <StatSlider label="DEVIL'S LUCK" value={stats.luck} onChange={v => updateStat('luck', v)} color="#ffd700" />
              </div>
            </div>
          </div>

          {/* Right Column: LIVING GTA BIOMETRIC LINEUP STAGE (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-2.5">
            {/* Animated Lineup Box */}
            <div
              className="glass-panel p-3.5 relative overflow-hidden rounded-2xl border bg-black/85 backdrop-blur-xl flex-1 flex flex-col justify-between"
              style={{
                borderColor: `${currentArchetype.color}60`,
                boxShadow: `0 0 30px ${currentArchetype.color}20, inset 0 0 25px ${currentArchetype.color}10`,
              }}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ background: currentArchetype.color }} />
                  <span className="hud-element text-[11px] tracking-wider font-bold" style={{ color: currentArchetype.color }}>
                    ★ LSPD BIOMETRIC LINEUP // CAM-04 ★
                  </span>
                </div>
                <div className="font-game text-[9px] text-white/50 tracking-wider">
                  SUSPECT ID: #{appearance.toUpperCase()}-9042
                </div>
              </div>

              {/* 3D-Styled Animated Character Viewport (Compact Height: 260px-280px) */}
              <div className="relative w-full h-[260px] sm:h-[280px] rounded-xl overflow-hidden bg-neutral-950 border border-white/15 flex items-center justify-center">
                {/* LSPD Height Measurement Grid Lines in background */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                  {["6'8\"", "6'4\"", "6'0\"", "5'8\"", "5'4\"", "5'0\""].map((hMark, idx) => (
                    <div
                      key={hMark}
                      className="absolute w-full flex items-center justify-between px-3 text-[9px] font-mono text-white/40"
                      style={{ top: `${12 + idx * 14}%` }}
                    >
                      <span className="border-b border-white/20 w-6" />
                      <span>{hMark}</span>
                      <span className="border-b border-white/20 flex-1 mx-2" />
                      <span>{hMark}</span>
                      <span className="border-b border-white/20 w-6" />
                    </div>
                  ))}
                </div>

                {/* Atmospheric Spotlight Cone */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: `radial-gradient(ellipse at 50% 15%, ${currentArchetype.color}35 0%, transparent 70%)`,
                  }}
                  animate={{ opacity: [0.5, 0.85, 0.5] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* The Animated Character Render */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentArchetype.id}
                    initial={{ opacity: 0, scale: 0.94, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.04, y: -8 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="relative z-10 w-full h-full flex items-center justify-center"
                  >
                    {/* Natural Breathing & Stance Shift Animation */}
                    <motion.img
                      src={currentArchetype.image}
                      alt={currentArchetype.name}
                      animate={{
                        y: [0, -5, 0],
                        scale: [1, 1.015, 1],
                        rotate: [0, 0.25, 0, -0.25, 0],
                      }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-full h-full object-cover object-top filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.9)] cursor-pointer"
                      onClick={() => sounds.playClick()}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Moving Facial Recognition Laser Scanline */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] pointer-events-none z-20"
                  style={{
                    background: `linear-gradient(90deg, transparent 5%, ${currentArchetype.color} 50%, transparent 95%)`,
                    boxShadow: `0 0 10px ${currentArchetype.color}`,
                  }}
                  animate={{ top: ['12%', '86%', '12%'] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* HUD Targeting Brackets */}
                <div className="absolute inset-2 pointer-events-none z-20 flex flex-col justify-between p-1.5">
                  <div className="flex items-start justify-between">
                    <div className="font-mono text-[9px] text-white/90 bg-black/75 px-1.5 py-0.5 rounded border border-white/10 flex items-center gap-1 backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      <span>REC</span>
                    </div>
                    <div className="font-mono text-[9px] bg-black/75 px-1.5 py-0.5 rounded border border-white/10 text-right backdrop-blur-sm font-bold" style={{ color: currentArchetype.color }}>
                      MATCH: 99.4%
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="bg-black/85 px-2 py-1 rounded border border-white/15 backdrop-blur-md">
                      <div className="font-cinematic text-xs text-white tracking-wider">
                        {name ? name.toUpperCase() : currentArchetype.name}
                      </div>
                      <div className="font-game text-[9px] text-white/60">
                        {currentArchetype.height} · BOUNTY: {currentArchetype.bounty}
                      </div>
                    </div>
                    <div className="font-game text-[10px] px-1.5 py-0.5 rounded bg-black/85 border text-amber-400 border-amber-400/40 backdrop-blur-md font-bold">
                      {currentArchetype.threat}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Interactive Character Switcher Mini Tabs */}
              <div className="grid grid-cols-4 gap-1.5 mt-2">
                {Object.values(ARCHETYPES).map((arch, idx) => {
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
                          ? 'border-purple-400 bg-purple-950/80 shadow-[0_0_12px_rgba(179,71,255,0.7)] scale-105'
                          : 'border-white/10 bg-black/60 opacity-60 hover:opacity-100 hover:border-white/30'
                      }`}
                    >
                      <div className="w-full h-8 rounded overflow-hidden mb-0.5">
                        <img src={arch.image} alt={arch.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="font-game text-[8px] font-bold truncate" style={{ color: isSelected ? arch.color : '#fff' }}>
                        [{idx + 1}] {arch.name.split(' ')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Compact Dossier Intel */}
              <div className="mt-2 p-2 rounded-lg bg-black/60 border border-white/10 text-left">
                <div className="flex items-center justify-between text-xs mb-0.5">
                  <span className="font-cinematic text-xs tracking-wider text-white">
                    {currentArchetype.name}
                  </span>
                  <span className="font-game text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-amber-300 font-bold">
                    {title}
                  </span>
                </div>
                <div className="font-game text-[10px] text-white/70 truncate">
                  {currentArchetype.specialty}
                </div>
              </div>
            </div>

            {/* Confirm & Start Button (Always Visible in Viewport) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="w-full game-btn-orange py-3.5 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(255,107,53,0.7)] shrink-0"
            >
              <span className="px-1.5 py-0.5 rounded bg-black/40 font-mono text-[10px] border border-white/30 font-bold">
                ENTER
              </span>
              <span className="font-bold tracking-wider">
                CONFIRM DOSSIER & HIT THE STREETS →
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
