import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { SceneBackground } from '../shared/SceneBackground';
import { GTAMinimap } from '../HUD/GTAMinimap';
import { GTAMissionBox } from '../HUD/GTAMissionBox';

function PortalRing({ radius, color, duration, opacity }: {
  radius: number; color: string; duration: number; opacity: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full border-2 pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        borderColor: color,
        opacity,
        boxShadow: `0 0 25px ${color}, inset 0 0 25px ${color}`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{ rotate: [0, 360], scale: [1, 1.04, 1] }}
      transition={{ rotate: { duration, repeat: Infinity, ease: 'linear' }, scale: { duration: 2.2, repeat: Infinity } }}
    />
  );
}

// Warp tunnel transition effect
function WarpEffect({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let frame = 0;
    const maxFrames = 130;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const colors = ['#b347ff', '#ff6b35', '#00f5ff', '#ff2d87', '#ffffff', '#ff9933', '#138808'];

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = `rgba(0,0,0,${frame < 60 ? 0.06 : 0.12})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const progress = frame / maxFrames;
      const numLines = 90;

      for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2;
        const speed = (1 + (i % 5)) * 18 * progress;
        const length = 60 + i * 3.5 * progress;
        const x1 = cx + Math.cos(angle) * speed;
        const y1 = cy + Math.sin(angle) * speed;
        const x2 = cx + Math.cos(angle) * (speed + length);
        const y2 = cy + Math.sin(angle) * (speed + length);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = colors[i % colors.length];
        ctx.globalAlpha = Math.max(0, 1 - progress * 0.4);
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // White flash at end
      if (frame > 105) {
        ctx.globalAlpha = (frame - 105) / 25;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      frame++;
      if (frame < maxFrames) {
        requestAnimationFrame(draw);
      } else {
        onComplete();
      }
    }

    draw();
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none"
    />
  );
}

export function Portal() {
  const { goToScene } = useGame();
  const [phase, setPhase] = useState<'approach' | 'enter' | 'warp'>('approach');
  const [warping, setWarping] = useState(false);

  function handleEnter() {
    if (phase !== 'approach') return;
    setPhase('enter');
    setTimeout(() => {
      setWarping(true);
    }, 1800);
  }

  // Keyboard shortcut [E] or [Space] to enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'e' || e.key === 'E' || e.key === ' ') && phase === 'approach') {
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase]);

  function handleWarpComplete() {
    goToScene('mumbai');
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden select-none">
      {/* Photo-realistic Portal Scene Background */}
      <SceneBackground scene="portal" zoomDirection="out" />

      {/* GTA Minimap Radar */}
      <GTAMinimap locationName="COSMIC RIFT [ANOMALY]" zoneType="gateway" />

      {/* GTA Mission Box */}
      <GTAMissionBox
        title="Investigate the Gateway."
        subtitle="Step into the swirling vortex to traverse across the world."
        badge="CRITICAL EVENT"
      />

      {/* Portal Energy Rings in center */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center mb-6">
          <PortalRing radius={200} color="rgba(179,71,255,0.25)" duration={22} opacity={0.3} />
          <PortalRing radius={175} color="rgba(0,245,255,0.4)" duration={16} opacity={0.5} />
          <PortalRing radius={150} color="#b347ff" duration={11} opacity={0.7} />
          <PortalRing radius={125} color="#00f5ff" duration={8} opacity={0.85} />

          {/* Central Pulsing Vortex Glow */}
          <motion.div
            className="absolute rounded-full flex items-center justify-center cursor-pointer"
            style={{
              width: 170,
              height: 170,
              background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(179,71,255,0.8) 35%, rgba(0,245,255,0.6) 70%, transparent 100%)',
              boxShadow: '0 0 60px #b347ff, 0 0 120px #00f5ff',
            }}
            animate={phase === 'enter' ? {
              scale: [1, 1.4, 1.2],
              boxShadow: [
                '0 0 60px #b347ff',
                '0 0 180px #b347ff, 0 0 350px #00f5ff',
                '0 0 90px #ff2d87',
              ],
            } : {
              scale: [1, 1.08, 1],
            }}
            transition={{ duration: phase === 'enter' ? 1.5 : 2.5, repeat: Infinity }}
            onClick={handleEnter}
          >
            <motion.div
              className="text-4xl text-white font-bold"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              🌀
            </motion.div>
          </motion.div>
        </div>

        {/* Narrative Banner */}
        <AnimatePresence mode="wait">
          {phase === 'approach' && (
            <motion.div
              key="approach"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-center mb-6"
            >
              <div className="hud-element text-purple-400 mb-1 tracking-[0.4em]">
                ◈ DIMENSIONAL CONVERGENCE ◈
              </div>
              <h2
                className="font-cinematic text-5xl md:text-7xl text-white mb-2"
                style={{ textShadow: '0 0 35px #b347ff' }}
              >
                ACROSS THE WORLDS
              </h2>
              <p className="text-white/70 font-game text-sm tracking-wider">
                Connecting Los Santos to the ancient and modern spirit of Bharat.
              </p>
            </motion.div>
          )}

          {phase === 'enter' && (
            <motion.div
              key="enter"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-6"
            >
              <div
                className="font-cinematic text-4xl md:text-6xl text-white"
                style={{ textShadow: '0 0 50px rgba(255,255,255,0.9)' }}
              >
                WARPING DESTINATION: MUMBAI...
              </div>
              <div className="font-game text-sm text-cyan-300 mt-2 tracking-widest">
                LAT: 18.9220° N, LON: 72.8347° E · LOCKED
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prompt Button matching concept art: "Press E to Enter" */}
        {phase === 'approach' && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={handleEnter}
            className="game-btn-purple text-base md:text-lg px-12 py-4 flex items-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(179,71,255,0.8)]"
          >
            <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold">
              E
            </span>
            <span className="font-bold tracking-wider">PRESS E TO ENTER PORTAL</span>
          </motion.button>
        )}
      </div>

      {/* Warp Canvas Transition */}
      {warping && <WarpEffect onComplete={handleWarpComplete} />}
    </div>
  );
}
