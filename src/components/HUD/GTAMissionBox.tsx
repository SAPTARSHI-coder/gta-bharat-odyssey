import React from 'react';
import { motion } from 'framer-motion';

interface MissionBoxProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export function GTAMissionBox({ title, subtitle, badge }: MissionBoxProps) {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed top-20 left-5 z-40 max-w-sm pointer-events-none"
    >
      <div className="bg-black/85 border-l-4 border-amber-400 px-4 py-3 rounded-r shadow-2xl backdrop-blur-md border-y border-r border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-amber-400 text-xs">◆</span>
          <span className="font-game text-[10px] tracking-widest uppercase text-amber-400 font-bold">
            {badge || 'OBJECTIVE'}
          </span>
        </div>
        <div className="font-cinematic text-lg md:text-xl text-white tracking-wide leading-tight">
          {title}
        </div>
        {subtitle && (
          <div className="font-game text-xs text-white/60 mt-1 leading-snug">
            {subtitle}
          </div>
        )}
      </div>
    </motion.div>
  );
}
