import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';

export function HUD() {
  const { character, currentScene } = useGame();

  const sceneLabels: Record<string, string> = {
    'landing':    'MENU',
    'character':  'CHARACTER SETUP',
    'los-santos': 'LOS SANTOS, PACIFIC COAST',
    'portal':     'UNKNOWN LOCATION',
    'mumbai':     'MUMBAI, BHARAT',
    'delhi':      'NEW DELHI, BHARAT',
    'kolkata':    'KOLKATA, BHARAT',
    'editor':     'JOURNEY POSTER STUDIO',
    'final':      'JOURNEY COMPLETE',
  };

  const journeyStops = [
    { scene: 'los-santos', label: 'LOS SANTOS', color: '#b347ff' },
    { scene: 'portal',     label: 'PORTAL',     color: '#cc88ff' },
    { scene: 'mumbai',     label: 'MUMBAI',     color: '#ff9933' },
    { scene: 'delhi',      label: 'DELHI',      color: '#ff6b35' },
    { scene: 'kolkata',    label: 'KOLKATA',    color: '#66aaff' },
    { scene: 'editor',     label: 'POSTER',     color: '#00f5ff' },
  ];

  const sceneOrder = ['landing','character','los-santos','portal','mumbai','delhi','kolkata','editor','final'];
  const currentIdx = sceneOrder.indexOf(currentScene);

  if (currentScene === 'landing' || currentScene === 'character') return null;

  return (
    <>
      {/* Top left: Location */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-4 left-4 z-50 glass-panel p-3 min-w-[200px]"
      >
        <div className="hud-element text-purple-400 mb-1">◈ LOCATION</div>
        <div className="font-game text-sm font-bold text-white">
          {sceneLabels[currentScene] || currentScene.toUpperCase()}
        </div>
      </motion.div>

      {/* Top right: Character info */}
      {character && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed top-4 right-4 z-50 glass-panel p-3 min-w-[180px] text-right"
        >
          <div className="hud-element text-orange-400 mb-1">◈ OPERATIVE</div>
          <div className="font-game text-sm font-bold text-white">{character.name}</div>
          <div className="font-game text-xs text-orange-400/70">{character.title}</div>
        </motion.div>
      )}

      {/* Bottom: Journey progress */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 glass-panel px-4 py-2"
      >
        {journeyStops.map((stop, i) => {
          const stopIdx = sceneOrder.indexOf(stop.scene);
          const isDone = currentIdx > stopIdx;
          const isCurrent = currentScene === stop.scene;
          return (
            <div key={stop.scene} className="flex items-center gap-1">
              <div className="flex flex-col items-center gap-0.5">
                <motion.div
                  animate={isCurrent ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="rounded-full border"
                  style={{
                    width: isCurrent ? 10 : 7,
                    height: isCurrent ? 10 : 7,
                    background: isDone || isCurrent ? stop.color : 'transparent',
                    borderColor: isDone || isCurrent ? stop.color : 'rgba(255,255,255,0.2)',
                    boxShadow: isCurrent ? `0 0 8px ${stop.color}` : 'none',
                  }}
                />
                <span
                  className="font-game leading-none"
                  style={{
                    fontSize: '5px',
                    color: isDone || isCurrent ? stop.color : 'rgba(255,255,255,0.25)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {stop.label.slice(0, 5)}
                </span>
              </div>
              {i < journeyStops.length - 1 && (
                <div
                  className="h-px w-4"
                  style={{
                    background: currentIdx > stopIdx ? stop.color : 'rgba(255,255,255,0.1)',
                  }}
                />
              )}
            </div>
          );
        })}
      </motion.div>
    </>
  );
}
