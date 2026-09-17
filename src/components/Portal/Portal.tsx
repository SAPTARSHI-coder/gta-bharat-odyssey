import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { SceneBackground } from '../shared/SceneBackground';

function PortalRing({ radius, color, duration, opacity }: {
  radius: number; color: string; duration: number; opacity: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full border-2"
      style={{
        width: radius * 2,
        height: radius * 2,
        borderColor: color,
        opacity,
        boxShadow: `0 0 20px ${color}, inset 0 0 20px ${color}`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{ rotate: [0, 360], scale: [1, 1.03, 1] }}
      transition={{ rotate: { duration, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity } }}
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
    const maxFrames = 120;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const colors = ['#b347ff', '#ff6b35', '#00f5ff', '#ff2d87', '#ffffff', '#ff9933', '#138808'];

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = `rgba(0,0,0,${frame < 60 ? 0.05 : 0.1})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const progress = frame / maxFrames;
      const numLines = 80;

      for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2;
        const speed = (1 + (i % 5)) * 15 * progress;
        const length = 50 + i * 3 * progress;
        const x1 = cx + Math.cos(angle) * speed;
        const y1 = cy + Math.sin(angle) * speed;
        const x2 = cx + Math.cos(angle) * (speed + length);
        const y2 = cy + Math.sin(angle) * (speed + length);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = colors[i % colors.length];
        ctx.globalAlpha = Math.max(0, 1 - progress * 0.5);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // White flash at end
      if (frame > 100) {
        ctx.globalAlpha = (frame - 100) / 20;
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
      className="fixed inset-0 z-[100]"
      style={{ pointerEvents: 'none' }}
    />
  );
}

export function Portal() {
  const { goToScene } = useGame();
  const [phase, setPhase] = useState<'approach' | 'enter' | 'warp'>('approach');
  const [warping, setWarping] = useState(false);

  function handleEnter() {
    setPhase('enter');
    setTimeout(() => {
      setWarping(true);
    }, 2000);
  }

  function handleWarpComplete() {
    goToScene('mumbai');
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <SceneBackground scene="portal" />

      {/* Particle field */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#b347ff', '#ff6b35', '#00f5ff', '#ff2d87'][i % 4],
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 5,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Portal Center */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Portal rings */}
        <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center mb-12">
          <PortalRing radius={190} color="rgba(179,71,255,0.2)" duration={20} opacity={0.3} />
          <PortalRing radius={170} color="rgba(179,71,255,0.4)" duration={15} opacity={0.5} />
          <PortalRing radius={150} color="#b347ff" duration={10} opacity={0.7} />
          <PortalRing radius={130} color="#cc88ff" duration={8} opacity={0.8} />
          <PortalRing radius={110} color="rgba(255,107,53,0.6)" duration={12} opacity={0.6} />

          {/* Portal core */}
          <motion.div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              width: 180,
              height: 180,
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(200,150,255,0.7) 30%, rgba(100,0,200,0.5) 60%, transparent 100%)',
              boxShadow: '0 0 60px #b347ff, 0 0 120px rgba(179,71,255,0.5)',
            }}
            animate={phase === 'enter' ? {
              scale: [1, 1.3, 1.1],
              boxShadow: [
                '0 0 60px #b347ff',
                '0 0 150px #b347ff, 0 0 300px rgba(179,71,255,0.5)',
                '0 0 80px #b347ff',
              ],
            } : {
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: phase === 'enter' ? 2 : 3, repeat: Infinity }}
          >
            <motion.div
              className="text-4xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              ✦
            </motion.div>
          </motion.div>
        </div>

        {/* Text */}
        <AnimatePresence mode="wait">
          {phase === 'approach' && (
            <motion.div
              key="approach"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-8"
            >
              <motion.div
                className="hud-element text-purple-400 mb-3 tracking-[0.5em]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ◈ ANOMALY DETECTED ◈
              </motion.div>
              <h2 className="font-cinematic text-5xl md:text-7xl text-white mb-3"
                style={{ textShadow: '0 0 40px #b347ff' }}>
                UNKNOWN DESTINATION
              </h2>
              <p className="text-white/50 font-game text-sm tracking-wider">
                What lies beyond is uncharted.
              </p>
            </motion.div>
          )}

          {phase === 'enter' && (
            <motion.div
              key="enter"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-8"
            >
              <motion.div
                className="font-cinematic text-4xl md:text-6xl text-white"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{ textShadow: '0 0 40px rgba(255,255,255,0.8)' }}
              >
                ENTERING PORTAL...
              </motion.div>
              <div className="font-game text-sm text-purple-300 mt-3 tracking-widest">
                COORDINATES UNKNOWN ·  DESTINATION LOCKED
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enter button */}
        {phase === 'approach' && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={handleEnter}
            className="game-btn-purple text-lg px-12 py-4 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 rounded"
              animate={{ boxShadow: ['0 0 20px #b347ff', '0 0 50px #b347ff', '0 0 20px #b347ff'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            ◈ ENTER PORTAL ◈
          </motion.button>
        )}
      </div>

      {/* Warp effect */}
      {warping && <WarpEffect onComplete={handleWarpComplete} />}
    </div>
  );
}
