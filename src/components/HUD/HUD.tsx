import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';

export function HUD() {
  const { character, currentScene } = useGame();

  const sceneLabels: Record<string, string> = {
    'landing': 'MENU',
    'character': 'CHARACTER SETUP',
    'los-santos': 'LOS SANTOS BEACH',
    'portal': 'UNKNOWN LOCATION',
    'mumbai': 'MUMBAI, BHARAT',
    'delhi': 'NEW DELHI, BHARAT',
    'editor': 'JOURNEY EDITOR',
    'final': 'JOURNEY COMPLETE',
  };

  if (currentScene === 'landing' || currentScene === 'character') return null;

  return (
    <>
      {/* Top left HUD */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-4 left-4 z-50 glass-panel p-3 min-w-[180px]"
      >
        <div className="hud-element text-purple-400 mb-1">
          ◈ LOCATION
        </div>
        <div className="font-game text-sm font-bold text-white">
          {sceneLabels[currentScene] || currentScene.toUpperCase()}
        </div>
      </motion.div>

      {/* Top right HUD - character info */}
      {character && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed top-4 right-4 z-50 glass-panel p-3 text-right min-w-[160px]"
        >
          <div className="hud-element text-orange-400 mb-1">
            ◈ OPERATIVE
          </div>
          <div className="font-game text-sm font-bold text-white">
            {character.name.toUpperCase()}
          </div>
          <div className="font-game text-xs text-purple-300">
            {character.title}
          </div>
        </motion.div>
      )}

      {/* Bottom mini-map style progress */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-4 right-4 z-50 glass-panel p-3"
      >
        <div className="hud-element text-purple-400 mb-2">◈ JOURNEY</div>
        <div className="flex gap-2 items-center">
          {(['los-santos', 'portal', 'mumbai', 'delhi'] as const).map((s, i) => {
            const scenes = ['los-santos', 'portal', 'mumbai', 'delhi', 'editor', 'final'];
            const currentIdx = scenes.indexOf(currentScene);
            const thisIdx = scenes.indexOf(s);
            const isPast = currentIdx > thisIdx;
            const isCurrent = currentScene === s;
            return (
              <React.Fragment key={s}>
                <div
                  className="w-2 h-2 rounded-full transition-all duration-500"
                  style={{
                    background: isCurrent ? '#b347ff' : isPast ? '#ff6b35' : '#333',
                    boxShadow: isCurrent ? '0 0 8px #b347ff' : isPast ? '0 0 4px #ff6b35' : 'none',
                  }}
                />
                {i < 3 && <div className="w-4 h-px bg-white/20" />}
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
