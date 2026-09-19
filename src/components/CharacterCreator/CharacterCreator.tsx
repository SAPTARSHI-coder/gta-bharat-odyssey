import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Character, CharacterStats } from '../../types';
import { sounds } from '../../utils/audio';

export interface CharacterArchetype {
  id: string;
  mappedAppearance: 'urban' | 'tech' | 'street' | 'corporate';
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

export const MALE_ARCHETYPES: CharacterArchetype[] = [
  {
    id: 'male-prodigy',
    mappedAppearance: 'urban',
    name: 'VINEWOOD PRODIGY',
    role: 'Vespucci Street Legend and Nitrous Wheelman',
    image: '/assets/char_male_protag.jpg',
    height: "6'0\"",
    bounty: '$190,000',
    threat: '★★★★★',
    color: '#00f5ff',
    accent: '#ff2d87',
    specialty: 'Nitrous street tuning, high-speed highway evasion, counterfeit titles',
    origin: 'Del Perro and Vinewood Hills',
    defaultBio: 'Young charismatic street racer in black hoodie and dark shades. Ditching cruisers down PCH with ease.',
  },
  {
    id: 'male-runner',
    mappedAppearance: 'street',
    name: 'DEL PERRO RUNNER',
    role: 'Downtown Infiltrator and Heist Wheelman',
    image: '/assets/char_male_runner.jpg',
    height: "6'1\"",
    bounty: '$140,000',
    threat: '★★★★☆',
    color: '#ff9933',
    accent: '#ffd700',
    specialty: 'Tactical getaway driving, armed evasion, perimeter breaches',
    origin: 'Pacific Coast Highway and Davis',
    defaultBio: 'Ex-syndicate wheelman. The fastest getaway specialist between Los Santos and Bharat.',
  },
  {
    id: 'male-hacker',
    mappedAppearance: 'tech',
    name: 'DARKNET CYPHER',
    role: 'Zero-Day Exploit Specialist and Cyber Operative',
    image: '/assets/char_male_hacker.jpg',
    height: "5'11\"",
    bounty: '$175,000',
    threat: '★★★★★',
    color: '#b347ff',
    accent: '#00f5ff',
    specialty: 'ATM skimming, bank security bypass, EMP pulses, drone surveillance',
    origin: 'Black-Budget Silicon Syndicate',
    defaultBio: 'Rogue cypherpunk. Erased his federal record, cracked Maze Bank encryption.',
  },
  {
    id: 'male-enforcer',
    mappedAppearance: 'street',
    name: 'STREET ENFORCER',
    role: 'South Central Heavy Muscle and Vault Breacher',
    image: '/assets/char_male_enforcer.jpg',
    height: "6'4\"",
    bounty: '$165,000',
    threat: '★★★★★',
    color: '#ff2d87',
    accent: '#ff6b35',
    specialty: 'Thermal lance breaching, armed intimidation, heavy munitions',
    origin: 'Strawberry and Davis District',
    defaultBio: 'Two-time Bolingbroke escapee. Built like a brick safehouse with gold chains and zero remorse.',
  },
];

export const FEMALE_ARCHETYPES: CharacterArchetype[] = [
  {
    id: 'female-queenpin',
    mappedAppearance: 'street',
    name: 'VICE CITY QUEENPIN',
    role: 'Armed Heist Mastermind and Syndicate Boss',
    image: '/assets/char_female_heist.jpg',
    height: "5'8\"",
    bounty: '$250,000',
    threat: '★★★★★',
    color: '#ff2d87',
    accent: '#ffd700',
    specialty: 'Precision bank entry, armed intimidation, heavy weapon mastery',
    origin: 'Vice City and South Central LS',
    defaultBio: 'Sultry, deadly cartel mastermind. Most wanted by Miami and LSPD feds. Untouchable reputation.',
  },
  {
    id: 'female-rebel',
    mappedAppearance: 'urban',
    name: 'BHARAT REBEL',
    role: 'Mumbai Port Smuggler and Resistance Leader',
    image: '/assets/char_female_rebel.jpg',
    height: "5'7\"",
    bounty: '$210,000',
    threat: '★★★★★',
    color: '#ffd700',
    accent: '#ff9933',
    specialty: 'Underground smuggling networks, twin pistol marksmanship, evasive driving',
    origin: 'Colaba Harbor, Mumbai and Kolkata',
    defaultBio: 'Ruling the maritime black markets from Colaba to Howrah. Known across underworld syndicates as the Ghost of Mumbai.',
  },
  {
    id: 'female-cyber',
    mappedAppearance: 'tech',
    name: 'DARKNET INFILTRATOR',
    role: 'Zero-Day Exploit Specialist and Cyber Infiltrator',
    image: '/assets/char_female_cyber.jpg',
    height: "5'10\"",
    bounty: '$180,000',
    threat: '★★★★★',
    color: '#00f5ff',
    accent: '#b347ff',
    specialty: 'Maze Bank vault bypass, drone surveillance, EMP disruptions',
    origin: 'Silicon Alley, San Fierro',
    defaultBio: 'Black-budget cypherpunk. Empties offshore crypto reserves without leaving a single trace.',
  },
  {
    id: 'female-exec',
    mappedAppearance: 'corporate',
    name: 'SHADOW EXECUTIVE',
    role: 'Maze Bank Launderer and Offshore Strategist',
    image: '/assets/char_female_exec.jpg',
    height: "5'11\"",
    bounty: '$195,000',
    threat: '★★★★☆',
    color: '#4ade80',
    accent: '#00f5ff',
    specialty: 'Caymans shell companies, federal wire routing, international bribery',
    origin: 'Downtown Los Santos Financial Core',
    defaultBio: 'Boardroom predator. Moving billions through shadow corporations. High-society untouchable.',
  },
];

export const NON_BINARY_ARCHETYPES: CharacterArchetype[] = [
  {
    id: 'nb-renegade',
    mappedAppearance: 'urban',
    name: 'NEO RENEGADE',
    role: 'Underground Netrunner and Street Rebel',
    image: '/assets/char_nb_renegade.jpg',
    height: "5'9\"",
    bounty: '$220,000',
    threat: '★★★★★',
    color: '#b347ff',
    accent: '#00f5ff',
    specialty: 'Cybernetic overdrive, illegal signal interception, street evasion',
    origin: 'Neo-Shinjuku and Little Seoul',
    defaultBio: 'Daring cyberpunk operative with electric hair and retro optics. Hacking police frequencies across borders.',
  },
  {
    id: 'nb-phantom',
    mappedAppearance: 'tech',
    name: 'GHOST PHANTOM',
    role: 'Black-Budget Stealth Operative',
    image: '/assets/char_nb_phantom.jpg',
    height: "5'10\"",
    bounty: '$240,000',
    threat: '★★★★★',
    color: '#00f5ff',
    accent: '#4ade80',
    specialty: 'Active camouflage techwear, biometric spoofing, zero-footprint infiltration',
    origin: 'Classified R&D Facility, Mount Chiliad',
    defaultBio: 'Stealth infiltrator equipped with holographic visor and carbon gear. In and out before alarms sound.',
  },
  {
    id: 'nb-drift',
    mappedAppearance: 'street',
    name: 'CHROME DRIFT',
    role: 'Midnight Touge Specialist and Getaway Prodigy',
    image: '/assets/char_nb_drift.jpg',
    height: "5'8\"",
    bounty: '$185,000',
    threat: '★★★★☆',
    color: '#ffd700',
    accent: '#ff2d87',
    specialty: 'Twin-turbo apex drifting, night getaway runs, nitro boost mechanics',
    origin: 'East Vinewood Industrial Docks',
    defaultBio: 'Underground street racing prodigy known as Jax. Rules the highway drift circuits with split-second precision.',
  },
  {
    id: 'nb-apex',
    mappedAppearance: 'corporate',
    name: 'APEX SYNDICATE',
    role: 'High-Society Heist Architect and Broker',
    image: '/assets/char_nb_apex.jpg',
    height: "5'11\"",
    bounty: '$260,000',
    threat: '★★★★★',
    color: '#ff2d87',
    accent: '#ffd700',
    specialty: 'High-stakes heist logistics, encrypted communications, international fencing',
    origin: 'Vinewood Penthouse Row',
    defaultBio: 'Calculating syndicate architect in bespoke designer trench coat. Orchestrating seven-wonder heists from the shadows.',
  },
];

interface StatRowProps {
  label: string;
  value: number;
  color: string;
  onChange: (val: number) => void;
}

function StatRow({ label, value, color, onChange }: StatRowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-game text-xs text-white/80 w-20 shrink-0 tracking-wide">{label}</span>
      <div className="flex-1 relative flex items-center">
        <input
          type="range"
          min="20"
          max="100"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-400 focus:outline-none"
          style={{
            background: `linear-gradient(to right, ${color} 0%, ${color} ${value}%, rgba(255,255,255,0.1) ${value}%, rgba(255,255,255,0.1) 100%)`,
          }}
        />
      </div>
      <span className="font-game text-xs font-bold w-7 text-right" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

export function CharacterCreator() {
  const { goToScene, setCharacter } = useGame();
  const [name, setName] = useState('Saptarshi');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Non-binary'>('Male');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [backgroundOption, setBackgroundOption] = useState('Tech Nomad');

  // Stats matching the ChatGPT mockup: Driving, Shooting, IQ, Style (plus Luck)
  const [stats, setStats] = useState<CharacterStats>({
    driving: 70,
    street: 40, // Shooting / Combat
    tech: 90,   // IQ / Hacking
    style: 80,  // Style
    luck: 65,
  });

  const [error, setError] = useState('');

  // Active roster based on gender
  const activeRoster =
    gender === 'Female'
      ? FEMALE_ARCHETYPES
      : gender === 'Non-binary'
        ? NON_BINARY_ARCHETYPES
        : MALE_ARCHETYPES;
  const currentArchetype = activeRoster[selectedIndex] || activeRoster[0];

  // Map chosen background option to game internal types
  const getMappedBackground = (opt: string): 'streets' | 'tech' | 'art' | 'hustle' => {
    switch (opt) {
      case 'Vinewood Hustler': return 'hustle';
      case 'Street Enforcer': return 'streets';
      case 'Corporate Embezzler': return 'hustle';
      case 'Master Forger': return 'art';
      default: return 'tech';
    }
  };

  const handleGenderChange = (g: 'Male' | 'Female' | 'Non-binary') => {
    sounds.playClick();
    setGender(g);
    setSelectedIndex(0); // reset to top hot profile of chosen gender
  };

  const handleStart = () => {
    if (!name.trim()) {
      setError('Please enter a character name');
      return;
    }
    sounds.playClick();
    const char: Character = {
      name: name.trim().toUpperCase(),
      title: backgroundOption.toUpperCase(),
      bio: `${gender} operative. ${currentArchetype.defaultBio}`,
      appearance: currentArchetype.mappedAppearance,
      outfit: 'hoodie',
      background: getMappedBackground(backgroundOption),
      stats,
      avatar: gender === 'Female' ? '💃' : gender === 'Non-binary' ? '⚡' : '🕶️',
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

  // Keyboard controls: 1-4 to select character, Arrow keys to cycle, Enter to continue
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'SELECT';
      if (isInput) {
        if (e.key === 'Enter') {
          handleStart();
        }
        return;
      }

      if (e.key === '1') { sounds.playClick(); setSelectedIndex(0); }
      else if (e.key === '2') { sounds.playClick(); setSelectedIndex(1); }
      else if (e.key === '3') { sounds.playClick(); setSelectedIndex(2); }
      else if (e.key === '4') { sounds.playClick(); setSelectedIndex(3); }
      else if (e.key === 'ArrowRight') {
        sounds.playClick();
        setSelectedIndex(prev => (prev + 1) % activeRoster.length);
      } else if (e.key === 'ArrowLeft') {
        sounds.playClick();
        setSelectedIndex(prev => (prev - 1 + activeRoster.length) % activeRoster.length);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [name, gender, backgroundOption, selectedIndex, stats, currentArchetype, activeRoster]);

  return (
    <div className="relative h-screen max-h-screen w-full flex items-center justify-center select-none overflow-hidden bg-black/90 backdrop-blur-md px-4 py-2">
      {/* Background cyber grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(179,71,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(179,71,255,0.25) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main Unified ChatGPT Concept Card (Panel 1: "1. Character Creation") */}
      <div className="relative z-10 max-w-4xl w-full bg-neutral-950/85 border border-purple-500/30 rounded-2xl p-4 sm:p-5 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(179,71,255,0.2)] backdrop-blur-2xl">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
          <div className="hud-element text-purple-400 text-[10px] font-bold tracking-[0.25em]">
            ★ CHAPTER 02: LSPD BIOMETRIC LINEUP & BOOKING DOSSIER ★
          </div>
          <div className="font-game text-[10px] text-white/50 tracking-wider hidden sm:block">
            PRESS <span className="text-amber-400 font-bold">[1-4]</span> OR <span className="text-amber-400 font-bold">[←/→]</span> TO CYCLE · <span className="text-purple-400 font-bold">[ENTER]</span> CONTINUE
          </div>
        </div>

        {/* 2-Column Responsive Card Grid */}
        <div className="grid md:grid-cols-12 gap-5 items-stretch">
          {/* Left Column: Character Portrait & Selector Thumbnails (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            {/* Viewport with Animated Character & Laser HUD */}
            <div className="relative w-full h-[270px] sm:h-[290px] rounded-xl overflow-hidden bg-black border border-white/15 flex items-center justify-center">
              {/* LSPD Height Measurement Chart */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                {["6'8\"", "6'4\"", "6'0\"", "5'8\"", "5'4\"", "5'0\""].map((hMark, idx) => (
                  <div
                    key={hMark}
                    className="absolute w-full flex items-center justify-between px-3 text-[9px] font-mono text-white/40"
                    style={{ top: `${10 + idx * 14}%` }}
                  >
                    <span className="border-b border-white/20 w-6" />
                    <span>{hMark}</span>
                    <span className="border-b border-white/20 flex-1 mx-2" />
                    <span>{hMark}</span>
                    <span className="border-b border-white/20 w-6" />
                  </div>
                ))}
              </div>

              {/* Dynamic Atmospheric Spotlight */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: `radial-gradient(ellipse at 50% 15%, ${currentArchetype.color}40 0%, transparent 70%)`,
                }}
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* The Living Animated Character Render */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentArchetype.id}
                  initial={{ opacity: 0, scale: 0.94, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.04, y: -8 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative z-10 w-full h-full flex items-center justify-center"
                >
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

              {/* Laser Scanline */}
              <motion.div
                className="absolute left-0 right-0 h-[2px] pointer-events-none z-20"
                style={{
                  background: `linear-gradient(90deg, transparent 5%, ${currentArchetype.color} 50%, transparent 95%)`,
                  boxShadow: `0 0 10px ${currentArchetype.color}`,
                }}
                animate={{ top: ['10%', '88%', '10%'] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* HUD Target Overlay */}
              <div className="absolute inset-2 pointer-events-none z-20 flex flex-col justify-between p-1.5">
                <div className="flex items-start justify-between">
                  <div className="font-mono text-[9px] text-white/90 bg-black/75 px-1.5 py-0.5 rounded border border-white/10 flex items-center gap-1 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <span>REC</span>
                  </div>
                  <div
                    className="font-mono text-[9px] bg-black/75 px-1.5 py-0.5 rounded border border-white/10 text-right backdrop-blur-sm font-bold"
                    style={{ color: currentArchetype.color }}
                  >
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

            {/* 4 Avatar Selection Thumbnails (Directly Below Portrait, matching ChatGPT panel) */}
            <div className="grid grid-cols-4 gap-1.5 mt-2.5">
              {activeRoster.map((arch, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={arch.id}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setSelectedIndex(idx);
                    }}
                    className={`relative group rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer p-1 text-center ${
                      isSelected
                        ? 'border-purple-400 bg-purple-950/80 shadow-[0_0_12px_rgba(179,71,255,0.7)] scale-105'
                        : 'border-white/10 bg-black/60 opacity-60 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    <div className="w-full h-8 rounded overflow-hidden mb-0.5">
                      <img
                        src={arch.image}
                        alt={arch.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div
                      className="font-game text-[8px] font-bold truncate"
                      style={{ color: isSelected ? arch.color : '#fff' }}
                    >
                      [{idx + 1}] {arch.name.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Specialty Snippet */}
            <div className="mt-2 px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 flex items-center justify-between text-[10px] font-game text-white/70">
              <span className="truncate font-bold" style={{ color: currentArchetype.color }}>
                {currentArchetype.name}
              </span>
              <span className="text-white/40 truncate ml-2">{currentArchetype.role}</span>
            </div>
          </div>

          {/* Right Column: "Who Are You?" Form & Stats (7 cols, exact match to ChatGPT concept) */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-2.5 pl-0 md:pl-2">
            {/* Title & Subtitle */}
            <div>
              <h2 className="font-cinematic text-2xl sm:text-3xl text-white tracking-wide leading-tight">
                Who Are You?
              </h2>
              <p className="font-game text-xs text-white/60 tracking-wider">
                Every journey starts with a character.
              </p>
            </div>

            {/* Gender / Persona Radio Pills */}
            <div className="flex items-center gap-3">
              {(['Male', 'Female', 'Non-binary'] as const).map(g => {
                const isSelected = gender === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleGenderChange(g)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-game transition-all cursor-pointer border ${
                      isSelected
                        ? 'border-purple-400 bg-purple-600/30 text-white font-bold shadow-[0_0_10px_rgba(179,71,255,0.4)]'
                        : 'border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-purple-400 shadow-[0_0_5px_#c084fc]' : 'border border-white/40'
                      }`}
                    />
                    <span>{g}</span>
                  </button>
                );
              })}
            </div>

            {/* Name Input Field */}
            <div>
              <label className="font-game text-xs text-white/70 block mb-1">Name</label>
              <input
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="Enter character name..."
                maxLength={24}
                className="w-full bg-black/60 border border-white/20 focus:border-purple-400 rounded-lg px-3.5 py-1.5 text-white font-game text-sm tracking-wider focus:outline-none transition-all shadow-inner"
              />
              {error && <p className="text-red-400 text-[10px] mt-1 font-game">⚠ {error}</p>}
            </div>

            {/* Background Dropdown Selector */}
            <div>
              <label className="font-game text-xs text-white/70 block mb-1">Background</label>
              <div className="relative">
                <select
                  value={backgroundOption}
                  onChange={e => {
                    sounds.playClick();
                    setBackgroundOption(e.target.value);
                  }}
                  className="w-full bg-black/80 border border-white/20 focus:border-purple-400 rounded-lg px-3.5 py-1.5 text-white font-game text-sm tracking-wider focus:outline-none appearance-none cursor-pointer transition-all pr-8"
                >
                  <option value="Tech Nomad">Tech Nomad</option>
                  <option value="Vinewood Hustler">Vinewood Hustler</option>
                  <option value="Street Enforcer">Street Enforcer</option>
                  <option value="Corporate Embezzler">Corporate Embezzler</option>
                  <option value="Master Forger">Master Forger</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* 4 Clean Stat Sliders (Driving, Shooting, IQ, Style) */}
            <div className="space-y-2 pt-1">
              <StatRow
                label="Driving"
                value={stats.driving}
                color="#ff9933"
                onChange={v => setStats(prev => ({ ...prev, driving: v }))}
              />
              <StatRow
                label="Shooting"
                value={stats.street}
                color="#ff2d87"
                onChange={v => setStats(prev => ({ ...prev, street: v }))}
              />
              <StatRow
                label="IQ"
                value={stats.tech}
                color="#00f5ff"
                onChange={v => setStats(prev => ({ ...prev, tech: v }))}
              />
              <StatRow
                label="Style"
                value={stats.style}
                color="#c084fc"
                onChange={v => setStats(prev => ({ ...prev, style: v }))}
              />
            </div>

            {/* Continue Button (Glowing Purple Gradient matching ChatGPT concept) */}
            <div className="pt-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStart}
                className="w-full py-2.5 px-6 rounded-xl font-game font-bold text-sm tracking-wider uppercase text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.6)] cursor-pointer flex items-center justify-center gap-2 transition-all"
              >
                <span>Continue</span>
                <span className="px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-mono border border-white/20">
                  ENTER
                </span>
                <span>→</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
