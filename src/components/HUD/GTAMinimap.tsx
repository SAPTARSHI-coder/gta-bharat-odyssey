import React from 'react';
import { motion } from 'framer-motion';

interface MinimapProps {
  locationName: string;
  zoneType?: 'beach' | 'urban' | 'monument' | 'gateway';
}

export function GTAMinimap({ locationName, zoneType = 'urban' }: MinimapProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-5 left-5 z-40 select-none pointer-events-none"
    >
      {/* GTA Iconic Flashing Wanted Stars */}
      <div className="flex items-center gap-1 mb-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 w-fit">
        <span className="font-game text-[9px] text-white/50 tracking-wider mr-1">WANTED:</span>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < 3
                ? 'text-amber-400 drop-shadow-[0_0_8px_#ffd700] animate-pulse'
                : 'text-white/20'
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Outer Radar Container */}
      <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full p-1 bg-black/80 border-2 border-white/20 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Radar Map Grid Background */}
        <div
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(20,35,50,0.9) 0%, rgba(10,15,25,0.95) 100%)',
          }}
        />

        {/* Map Grid Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#00f5ff" strokeWidth="0.5" strokeDasharray="2,2"/>
          <circle cx="50" cy="50" r="30" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="1,2"/>
          <circle cx="50" cy="50" r="15" fill="none" stroke="#fff" strokeWidth="0.5"/>
          <line x1="50" y1="5" x2="50" y2="95" stroke="#fff" strokeWidth="0.5" strokeDasharray="2,2"/>
          <line x1="5" y1="50" x2="95" y2="50" stroke="#fff" strokeWidth="0.5" strokeDasharray="2,2"/>

          {/* Road networks hint */}
          <path d="M10,40 Q40,45 50,50 T90,65" fill="none" stroke="#4a5568" strokeWidth="3"/>
          <path d="M50,10 Q55,40 50,50 T40,90" fill="none" stroke="#4a5568" strokeWidth="2.5"/>
          <path d="M25,25 Q50,40 75,75" fill="none" stroke="#718096" strokeWidth="1.5"/>

          {/* Waterway hint if beach/mumbai/kolkata */}
          {(zoneType === 'beach' || locationName.includes('MUMBAI') || locationName.includes('KOLKATA')) && (
            <path d="M0,0 Q30,50 10,100 L0,100 Z" fill="#00f5ff" opacity="0.25"/>
          )}

          {/* Waypoint Marker */}
          <circle cx="68" cy="32" r="3.5" fill="#ff2d87" stroke="#fff" strokeWidth="1">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <text x="73" y="34" fill="#ff2d87" fontSize="5" fontFamily="monospace" fontWeight="bold">DEST</text>

          {/* Player Arrow at Center */}
          <polygon points="50,42 46,55 50,52 54,55" fill="#00f5ff" stroke="#fff" strokeWidth="0.8"/>
        </svg>

        {/* Compass N Indicator */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 font-game text-[9px] font-bold text-cyan-400 tracking-wider">
          N
        </div>

        {/* Sweeping Radar Scanner Line */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(0,245,255,0.25) 360deg)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Health & Armor Status Bars (GTA Style) */}
      <div className="w-32 md:w-36 mt-1.5 flex flex-col gap-0.5">
        <div className="flex gap-1 items-center">
          {/* Health (Green) */}
          <div className="flex-1 h-1.5 bg-black/80 rounded-sm overflow-hidden border border-white/10 p-[1px]">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 w-[85%] rounded-sm" />
          </div>
          {/* Armor (Blue) */}
          <div className="flex-1 h-1.5 bg-black/80 rounded-sm overflow-hidden border border-white/10 p-[1px]">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[60%] rounded-sm" />
          </div>
        </div>
        {/* Location Label under Minimap */}
        <div className="bg-black/80 px-2 py-0.5 rounded border border-white/10 flex items-center justify-between">
          <span className="font-game text-[8px] text-white/90 truncate tracking-wider font-semibold">
            {locationName}
          </span>
          <span className="font-game text-[8px] text-cyan-400 font-bold ml-1">
            GPS
          </span>
        </div>
      </div>
    </motion.div>
  );
}
