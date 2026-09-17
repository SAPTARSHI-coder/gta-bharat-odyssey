import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { sounds } from '../../utils/audio';

interface TopBarProps {
  activeSectionId: string;
  progressPercent: number;
  onNavigate: (sectionId: string) => void;
}

const SECTION_TITLES: Record<string, { title: string; location: string; step: number }> = {
  'section-landing':    { title: 'EXPEDITION START',     location: 'LOS SANTOS BEACH',         step: 1 },
  'section-character':  { title: 'OPERATIVE CREATION',   location: 'CUSTOMIZATION STATION',    step: 2 },
  'section-los-santos': { title: 'CHAPTER 1: THE COAST', location: 'DEL PERRO BEACH, LS',       step: 3 },
  'section-portal':     { title: 'CHAPTER 2: THE RIFT',  location: 'DIMENSIONAL CONVERGENCE',  step: 4 },
  'section-mumbai':     { title: 'CHAPTER 3: MUMBAI',    location: 'COLABA HARBOR, BHARAT',    step: 5 },
  'section-delhi':      { title: 'CHAPTER 4: NEW DELHI', location: 'KARTAVYA PATH, BHARAT',    step: 6 },
  'section-kolkata':    { title: 'CHAPTER 5: KOLKATA',   location: 'VICTORIA MEMORIAL, BHARAT',step: 7 },
  'section-editor':     { title: 'POSTER STUDIO',        location: 'REACT IMAGE EDITOR',       step: 8 },
  'section-final':      { title: 'MISSION DEBRIEF',      location: 'JOURNEY COMPLETED',        step: 9 },
};

export function HatomTopBar({ activeSectionId, progressPercent, onNavigate }: TopBarProps) {
  const { character } = useGame();
  const [soundActive, setSoundActive] = useState(true);
  const info = SECTION_TITLES[activeSectionId] || SECTION_TITLES['section-landing'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-auto bg-black/60 backdrop-blur-md border-b border-white/10 select-none">
      {/* Dynamic Progress Line */}
      <div className="w-full h-[2px] bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-orange-400 to-cyan-400"
          animate={{ width: `${Math.max(progressPercent, 4)}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <div className="px-4 md:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Brand + Active Location */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('section-landing')}
            className="font-cinematic text-lg md:text-xl text-white tracking-wider hover:text-amber-400 transition-colors cursor-pointer"
          >
            LOS SANTOS <span className="text-orange-400">→</span> BHARAT
          </button>

          <span className="hidden sm:inline text-white/20">|</span>

          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-game text-xs text-white/80 font-bold tracking-wider">
              {info.location}
            </span>
          </div>
        </div>

        {/* Center: Interactive Route Steps (clickable) */}
        <div className="hidden lg:flex items-center gap-1.5 font-game text-[11px] text-white/40 tracking-wider">
          {[
            { id: 'section-los-santos', label: 'LOS SANTOS' },
            { id: 'section-portal',     label: 'PORTAL' },
            { id: 'section-mumbai',     label: 'MUMBAI' },
            { id: 'section-delhi',      label: 'DELHI' },
            { id: 'section-kolkata',    label: 'KOLKATA' },
            { id: 'section-editor',     label: 'POSTER' },
          ].map((item, i, arr) => {
            const isCurrent = activeSectionId === item.id;
            return (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`transition-colors cursor-pointer hover:text-white ${
                    isCurrent ? 'text-amber-400 font-bold underline decoration-amber-400 underline-offset-4' : ''
                  }`}
                >
                  {item.label}
                </button>
                {i < arr.length - 1 && <span className="text-white/20">→</span>}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right: Progress % + Operative Badge + Jump to Editor */}
        <div className="flex items-center gap-3">
          {character && (
            <div className="hidden md:flex items-center gap-1.5 glass-panel px-2.5 py-1 border border-purple-400/30">
              <span className="text-xs">👤</span>
              <span className="font-game text-xs text-purple-200 font-bold">{character.name}</span>
            </div>
          )}

          <button
            onClick={() => {
              sounds.enabled = !sounds.enabled;
              setSoundActive(sounds.enabled);
              if (sounds.enabled) sounds.playClick();
            }}
            title={soundActive ? 'Mute Sound FX' : 'Enable Sound FX'}
            className="glass-panel px-2 py-1 border border-white/20 hover:border-amber-400 text-xs cursor-pointer transition-colors"
          >
            {soundActive ? '🔊' : '🔇'}
          </button>

          <div className="glass-panel px-2.5 py-1 border border-white/15 font-mono text-xs text-amber-400 font-bold">
            {Math.round(progressPercent)}%
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('section-editor');
            }}
            className="game-btn-orange text-xs px-3.5 py-1.5 cursor-pointer font-bold tracking-wider hidden sm:inline-flex"
          >
            🎨 POSTER STUDIO
          </button>
        </div>
      </div>
    </header>
  );
}
