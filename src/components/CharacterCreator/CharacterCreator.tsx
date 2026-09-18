import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Character, CharacterStats } from '../../types';

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
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="hud-element text-white/70 text-xs">{label}</span>
        <span className="font-game text-xs font-bold" style={{ color }}>{value}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 stat-bar">
          <motion.div
            className="stat-fill"
            style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}, #ff6b35)` }}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-4 rounded-sm cursor-pointer transition-all"
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
  const [appearance, setAppearance] = useState<typeof APPEARANCES[number]>('tech');
  const [outfit, setOutfit] = useState<typeof OUTFITS[number]>('jacket');
  const [background, setBackground] = useState<typeof BACKGROUNDS[number]>('tech');
  const [stats, setStats] = useState<CharacterStats>({ ...DEFAULT_STATS });
  const [error, setError] = useState('');

  const title = getTitle(appearance, background, outfit);
  const avatar = getAvatar(appearance);
  const totalPoints = Object.values(stats).reduce((a, b) => a + b, 0);

  function updateStat(key: keyof CharacterStats, value: number) {
    setStats(prev => ({ ...prev, [key]: value }));
  }

  function handleStart() {
    if (!name.trim()) { setError('Enter your character name'); return; }
    const char: Character = {
      name: name.trim().toUpperCase(),
      title,
      bio: bio || 'A wanderer with a mission.',
      appearance,
      outfit,
      background,
      stats,
      avatar,
    };
    setCharacter(char);
    goToScene('los-santos');
  }

  const optionBtn = (active: boolean) =>
    `px-3 py-2 text-xs font-game uppercase tracking-wider rounded transition-all duration-200 cursor-pointer border ${
      active
        ? 'border-purple-500 bg-purple-600/30 text-purple-300 shadow-[0_0_10px_rgba(179,71,255,0.5)]'
        : 'border-white/10 bg-white/5 text-white/50 hover:border-purple-500/50 hover:text-white/80'
    }`;

  return (
    <div className="min-h-screen bg-black/70 backdrop-blur-md relative overflow-hidden pt-20 pb-16 px-4">
      {/* Background grid */}
      <div
        className="fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(179,71,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(179,71,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="hud-element text-purple-400 mb-2">◈ LSPD BOOKING DOSSIER // RAP SHEET ◈</div>
          <h2 className="font-cinematic text-5xl md:text-7xl text-white" style={{ textShadow: '0 0 30px rgba(179,71,255,0.5)' }}>
            BUILD YOUR CRIMINAL
          </h2>
          <p className="font-game text-xs text-white/40 tracking-[0.3em] mt-2">
            SELECT ARCHETYPE · DISTRIBUTE HEIST STATS · LOG YOUR POLICE RECORD
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Name */}
            <div className="glass-panel p-5">
              <label className="hud-element text-purple-400 block mb-2">◈ ALIAS / STREET NAME</label>
              <input
                value={name}
                onChange={e => { setName(e.target.value); setError(''); }}
                placeholder='e.g. FRANKIE "THE GHOST" VANCE'
                className="w-full bg-transparent border border-purple-500/30 rounded px-4 py-3 text-white font-game text-lg uppercase tracking-widest focus:outline-none focus:border-purple-500 placeholder-white/20 transition-colors"
                maxLength={20}
              />
              {error && <p className="text-red-400 text-xs mt-2 font-game">⚠ {error}</p>}
            </div>

            {/* Appearance */}
            <div className="glass-panel p-5">
              <label className="hud-element text-purple-400 block mb-3">◈ CRIMINAL SPECIALTY & VIBE</label>
              <div className="grid grid-cols-2 gap-2">
                {APPEARANCES.map(a => (
                  <button key={a} onClick={() => setAppearance(a)} className={optionBtn(appearance === a)}>
                    {a === 'urban' ? '🌆 Vinewood Hustler' : a === 'tech' ? '💻 Darknet Infiltrator' : a === 'street' ? '🎭 Street Enforcer' : '⚡ Corporate Embezzler'}
                  </button>
                ))}
              </div>
            </div>

            {/* Outfit */}
            <div className="glass-panel p-5">
              <label className="hud-element text-purple-400 block mb-3">◈ THREADS & HEIST GEAR</label>
              <div className="grid grid-cols-2 gap-2">
                {OUTFITS.map(o => (
                  <button key={o} onClick={() => setOutfit(o)} className={optionBtn(outfit === o)}>
                    {o === 'jacket' ? '🧥 Biker Leather Jacket' : o === 'hoodie' ? '👕 Heist Hoodie' : o === 'suit' ? '👔 Italian Silk Suit' : '👟 Tracksuit & Gold Chain'}
                  </button>
                ))}
              </div>
            </div>

            {/* Background */}
            <div className="glass-panel p-5">
              <label className="hud-element text-purple-400 block mb-3">◈ CRIMINAL RECORD ORIGIN</label>
              <div className="grid grid-cols-2 gap-2">
                {BACKGROUNDS.map(b => (
                  <button key={b} onClick={() => setBackground(b)} className={optionBtn(background === b)}>
                    {b === 'streets' ? '🏙️ South Central LS' : b === 'tech' ? '🔬 Black-Budget Hacker' : b === 'art' ? '🎨 Master Forger' : '💰 High-Stakes Smuggler'}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="glass-panel p-5">
              <label className="hud-element text-purple-400 block mb-2">◈ POLICE INCIDENT REPORT // PRIOR CONVICTIONS</label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Considered armed, dangerous, and chronically underpaid. Wanted for grand theft auto and evading FIB pursuit on Vespucci Blvd..."
                className="w-full bg-transparent border border-purple-500/30 rounded px-4 py-3 text-white/80 text-sm focus:outline-none focus:border-purple-500 placeholder-white/20 transition-colors resize-none"
                rows={3}
                maxLength={120}
              />
            </div>
          </motion.div>

          {/* Right: Character Card + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Character Card */}
            <div
              className="glass-panel p-6 relative overflow-hidden"
              style={{
                border: '1px solid rgba(179,71,255,0.4)',
                boxShadow: '0 0 30px rgba(179,71,255,0.2), inset 0 0 30px rgba(179,71,255,0.05)',
              }}
            >
              {/* Card BG pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #b347ff 0px, #b347ff 1px, transparent 1px, transparent 10px)',
                }}
              />
              <div className="relative z-10">
                <div className="hud-element text-purple-400 mb-4">◈ LSPD BOOKING SHEET ◈</div>
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-20 h-20 rounded-lg flex items-center justify-center text-5xl"
                    style={{
                      background: 'linear-gradient(135deg, #1a0030, #3d0066)',
                      border: '2px solid rgba(179,71,255,0.6)',
                      boxShadow: '0 0 20px rgba(179,71,255,0.4)',
                    }}
                  >
                    {avatar}
                  </div>
                  <div>
                    <div className="font-cinematic text-3xl text-white leading-none">
                      {name || 'UNKNOWN SUSPECT'}
                    </div>
                    <div
                      className="font-game text-sm mt-1"
                      style={{ color: '#ff6b35', textShadow: '0 0 10px #ff6b35' }}
                    >
                      {title}
                    </div>
                    <div className="text-white/40 text-xs mt-1">
                      {background.toUpperCase()} · {outfit.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Bio preview */}
                {bio && (
                  <div className="text-white/50 text-sm italic mb-4 border-l-2 border-purple-500/40 pl-3">
                    "{bio}"
                  </div>
                )}

                {/* Divider */}
                <div className="h-px bg-purple-500/20 my-4" />

                {/* Stats preview */}
                <div className="space-y-1">
                  {Object.entries(stats).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-2">
                      <span className="hud-element text-white/40 text-xs w-16">{k.toUpperCase()}</span>
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${v}%`,
                            background: 'linear-gradient(90deg, #b347ff, #ff6b35)',
                          }}
                        />
                      </div>
                      <span className="font-game text-xs text-purple-300 w-8">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-3 text-right hud-element text-orange-400 text-xs font-bold">
                  ★ TOTAL THREAT INDEX: {totalPoints} / 500 ★
                </div>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="glass-panel p-5">
              <div className="hud-element text-purple-400 mb-4">◈ ALLOCATE HEIST ATTRIBUTES</div>
              <StatSlider label="TECH // HACKING" value={stats.tech} onChange={v => updateStat('tech', v)} color="#b347ff" />
              <StatSlider label="WHEELMAN // GETAWAY" value={stats.driving} onChange={v => updateStat('driving', v)} color="#ff6b35" />
              <StatSlider label="SWAGGER // DISGUISE" value={stats.style} onChange={v => updateStat('style', v)} color="#ff2d87" />
              <StatSlider label="STREET HEAT // INTEL" value={stats.street} onChange={v => updateStat('street', v)} color="#00f5ff" />
              <StatSlider label="DEVIL'S LUCK" value={stats.luck} onChange={v => updateStat('luck', v)} color="#ffd700" />
            </div>

            {/* Start Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="w-full game-btn-orange py-5 text-lg"
            >
              ★ CONFIRM DOSSIER & HIT THE STREETS ★
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

