import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { SceneBackground } from '../shared/SceneBackground';
import { GTAMinimap } from '../HUD/GTAMinimap';
import { GTAMissionBox } from '../HUD/GTAMissionBox';

export function LosSantosScene() {
  const { goToScene, character } = useGame();
  const [stage, setStage] = useState<'intro' | 'explore' | 'portal_discovered'>('intro');

  useEffect(() => {
    const t1 = setTimeout(() => setStage('explore'), 3500);
    return () => clearTimeout(t1);
  }, []);

  // Keyboard shortcut [E] or [Space] to interact
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E' || e.key === ' ') {
        if (stage === 'explore') {
          setStage('portal_discovered');
        } else if (stage === 'portal_discovered') {
          goToScene('portal');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, goToScene]);

  return (
    <div className="relative min-h-screen overflow-hidden select-none">
      {/* Cinematic Generated Photo-realistic Scene Background */}
      <SceneBackground scene="los-santos" zoomDirection="in" />

      {/* GTA Minimap Radar */}
      <GTAMinimap locationName="PACIFIC COAST HWY" zoneType="beach" />

      {/* GTA Mission Notification Box */}
      <GTAMissionBox
        title={
          stage === 'portal_discovered'
            ? 'Investigate the glowing anomaly on the beach.'
            : 'Find the package near the pier.'
        }
        subtitle={
          stage === 'portal_discovered'
            ? 'A strange cosmic rift has opened near the coastline.'
            : 'Explore the scenic coast before your meeting.'
        }
        badge={stage === 'portal_discovered' ? 'PRIORITY OBJECTIVE' : 'STORY MISSION'}
      />

      {/* Center Cinematic Story Narrative */}
      <div className="fixed z-30 inset-x-0 top-1/3 -translate-y-1/2 px-6 pointer-events-none">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hud-element text-xs tracking-[0.4em] text-amber-400 mb-2 font-bold"
          >
            ◈ CHAPTER 1: THE PACIFIC DEPARTURE ◈
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinematic text-5xl md:text-7xl text-white mb-3"
            style={{ textShadow: '0 5px 30px rgba(0,0,0,0.9), 0 0 50px rgba(255,107,53,0.4)' }}
          >
            {stage === 'portal_discovered'
              ? 'A RIFT IN REALITY'
              : 'LOS SANTOS COAST'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-game text-sm md:text-base text-white/80 tracking-wider mb-2"
          >
            {stage === 'portal_discovered'
              ? 'An electric gateway is warping space and time right before your eyes.'
              : 'The golden hour over Santa Monica. You thought this city was your final stop.'}
          </motion.p>
        </div>
      </div>

      {/* Glowing Interactive Portal Marker */}
      {stage === 'portal_discovered' && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="fixed z-30 cursor-pointer top-[45%] right-[20%] md:right-[25%]"
          onClick={() => goToScene('portal')}
        >
          <div className="relative flex flex-col items-center">
            {/* Glowing Vortex Beacon */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                boxShadow: [
                  '0 0 30px #b347ff, 0 0 60px #00f5ff',
                  '0 0 60px #ff2d87, 0 0 100px #b347ff',
                  '0 0 30px #b347ff, 0 0 60px #00f5ff',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400"
            >
              <span className="text-2xl animate-spin">🌀</span>
            </motion.div>

            {/* Prompt Pill */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-3 glass-panel px-3 py-1 text-center border border-purple-400"
            >
              <div className="font-game text-xs text-white font-bold tracking-widest flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px]">E</span>
                <span>ENTER RIFT</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Bottom Interactive HUD Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3">
        <AnimatePresence mode="wait">
          {stage === 'explore' && (
            <motion.button
              key="explore-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={() => setStage('portal_discovered')}
              className="game-btn-orange px-8 py-3.5 text-sm md:text-base flex items-center gap-3 cursor-pointer shadow-xl"
            >
              <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/20">E</span>
              <span className="font-bold tracking-wider">INVESTIGATE THE SHORELINE →</span>
            </motion.button>
          )}

          {stage === 'portal_discovered' && (
            <motion.button
              key="portal-btn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => goToScene('portal')}
              className="game-btn-purple px-10 py-4 text-base md:text-lg flex items-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(179,71,255,0.7)]"
            >
              <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/20">SPACE</span>
              <span className="font-bold tracking-wider">STEP INTO THE PORTAL →</span>
            </motion.button>
          )}
        </AnimatePresence>

        <div className="font-game text-[11px] text-white/40 tracking-widest">
          {character ? `${character.name.toUpperCase()} · ${character.title}` : 'OPERATIVE'}
        </div>
      </div>
    </div>
  );
}
