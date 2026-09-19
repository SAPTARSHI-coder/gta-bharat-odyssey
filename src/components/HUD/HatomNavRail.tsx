import React from 'react';
import { motion } from 'framer-motion';

export interface Chapter {
  id: string;
  number: string;
  name: string;
  badge: string;
}

export const CHAPTERS: Chapter[] = [
  { id: 'section-landing',      number: '01', name: 'LOS SANTOS TO BHARAT', badge: 'PROLOGUE' },
  { id: 'section-character',    number: '02', name: 'LSPD BOOKING',         badge: 'RAP SHEET' },
  { id: 'section-los-santos',   number: '03', name: 'DEL PERRO HEAT',       badge: 'TWO STARS' },
  { id: 'section-portal',       number: '04', name: 'PUNCH THE RIFT',       badge: 'SINGULARITY' },
  { id: 'section-mumbai',       number: '05', name: 'COLABA HARBOR',        badge: 'MAXIMUM CITY' },
  { id: 'section-delhi',        number: '06', name: 'KARTAVYA PATH',        badge: 'POWER AXIS' },
  { id: 'section-kolkata',      number: '07', name: 'VICTORIA MEMORIAL',    badge: 'REBEL CITY' },
  { id: 'section-dream-meadow', number: '08', name: 'THE 8TH WONDER',        badge: 'DREAM MEADOW' },
  { id: 'section-wonders',      number: '09', name: '7 WONDERS HEIST',      badge: 'INTERPOL RED' },
  { id: 'section-editor',       number: '10', name: 'UNLAYER POSTER LAB',   badge: 'FORGE MUGSHOT' },
  { id: 'section-final',        number: '11', name: 'MISSION PASSED',       badge: 'RESPECT +' },
];

interface HatomNavRailProps {
  activeSectionId: string;
  scrollProgress: number; // 0 to 1
  onSelectChapter: (id: string) => void;
}

export function HatomNavRail({ activeSectionId, scrollProgress, onSelectChapter }: HatomNavRailProps) {
  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 select-none hidden sm:flex flex-col items-end gap-3 pointer-events-auto">
      {/* Vertical Progress Line Track */}
      <div className="relative flex flex-col items-center gap-3">
        {CHAPTERS.map((chap, idx) => {
          const isActive = activeSectionId === chap.id;
          return (
            <div
              key={chap.id}
              onClick={() => onSelectChapter(chap.id)}
              className="group relative flex items-center justify-end cursor-pointer py-1"
            >
              {/* Tooltip on Hover / Active */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : 10,
                  scale: isActive ? 1 : 0.9,
                }}
                className={`mr-3 px-2.5 py-1 rounded glass-panel border whitespace-nowrap text-right pointer-events-none transition-all group-hover:opacity-100 group-hover:translate-x-0 ${
                  isActive
                    ? 'border-purple-400 bg-purple-950/80 text-white shadow-[0_0_15px_rgba(179,71,255,0.6)]'
                    : 'border-white/10 bg-black/60 text-white/70'
                }`}
              >
                <div className="font-game text-[9px] text-amber-400 font-bold uppercase tracking-wider">
                  {chap.number} · {chap.badge}
                </div>
                <div className="font-cinematic text-xs tracking-wider text-white">
                  {chap.name}
                </div>
              </motion.div>

              {/* Indicator Dot */}
              <div className="relative flex items-center justify-center w-5 h-5">
                {isActive && (
                  <motion.div
                    layoutId="active-ring"
                    className="absolute inset-0 rounded-full border border-purple-400 shadow-[0_0_10px_#b347ff]"
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  />
                )}
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-gradient-to-tr from-purple-400 to-cyan-400 shadow-[0_0_12px_#00f5ff] scale-125'
                      : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-white/70 group-hover:scale-125'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
