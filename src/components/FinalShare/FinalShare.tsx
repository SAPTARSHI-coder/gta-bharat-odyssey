import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Particles } from '../shared/Particles';

export function FinalShare() {
  const { character, finalPosterDataUrl, resetGame } = useGame();

  const handleDownload = useCallback(() => {
    if (!finalPosterDataUrl) return;
    const a = document.createElement('a');
    a.href = finalPosterDataUrl;
    a.download = `${character?.name ?? 'journey'}-los-santos-bharat.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [finalPosterDataUrl, character]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied! Share your journey.');
    });
  }, []);

  return (
    <div className="min-h-screen bg-game-dark relative overflow-hidden flex flex-col">
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center, #1a0040 0%, #0a0015 40%, #0a0a0f 100%)',
        }}
      />
      <Particles count={15} color="#ff9933" />
      <Particles count={10} color="#b347ff" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center pt-16 pb-8 px-4"
      >
        <div className="hud-element text-orange-400 mb-3 tracking-[0.5em]">◈ JOURNEY COMPLETE ◈</div>
        <h2
          className="font-cinematic text-6xl md:text-8xl text-white mb-4"
          style={{ textShadow: '0 0 40px rgba(255,153,51,0.5)' }}
        >
          YOUR JOURNEY
        </h2>
        {character && (
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-500" />
            <div>
              <div className="font-cinematic text-3xl text-white">{character.name}</div>
              <div className="font-game text-sm text-orange-400">{character.title}</div>
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-500" />
          </div>
        )}
      </motion.div>

      {/* Journey summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 max-w-2xl mx-auto px-4 mb-8 w-full"
      >
        {/* Route display */}
        <div className="glass-panel p-6 mb-6" style={{ border: '1px solid rgba(255,107,53,0.3)' }}>
          <div className="hud-element text-orange-400 mb-4 text-center">◈ JOURNEY ROUTE ◈</div>
          <div className="flex items-center justify-center gap-4 text-center">
            {[
              { label: 'LOS SANTOS', icon: '🌴', color: '#b347ff' },
              { label: '↓ PORTAL ↓', icon: '✦', color: '#b347ff' },
              { label: 'MUMBAI', icon: '🏛️', color: '#ff9933' },
              { label: '↓', icon: null, color: '#ff6b35' },
              { label: 'NEW DELHI', icon: '🏛️', color: '#ff6b35' },
            ].map(({ label, icon, color }, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                {icon && <div className="text-xl">{icon}</div>}
                <div
                  className="font-game text-xs tracking-wider font-bold"
                  style={{ color, textShadow: `0 0 8px ${color}` }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final poster preview */}
        {finalPosterDataUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <div className="hud-element text-purple-400 mb-3 text-center">◈ YOUR POSTER ◈</div>
            <div
              className="rounded-lg overflow-hidden"
              style={{
                border: '2px solid rgba(179,71,255,0.4)',
                boxShadow: '0 0 40px rgba(179,71,255,0.3)',
                maxHeight: '400px',
                overflow: 'hidden',
              }}
            >
              <img
                src={finalPosterDataUrl}
                alt="Your Journey Poster"
                className="w-full object-contain"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </motion.div>
        )}

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-8"
        >
          <div className="font-cinematic text-3xl text-white mb-1">
            "SAME DREAMS.
          </div>
          <div className="font-cinematic text-3xl text-white mb-4">
            A DIFFERENT MAP."
          </div>
          <div className="font-game text-sm text-white/40">
            LOS SANTOS → BHARAT
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          {finalPosterDataUrl && (
            <button
              onClick={handleDownload}
              className="game-btn-purple py-4 text-sm"
            >
              ⬇ DOWNLOAD POSTER
            </button>
          )}
          <button
            onClick={handleCopyLink}
            className="game-btn-orange py-4 text-sm"
          >
            🔗 SHARE JOURNEY
          </button>
        </motion.div>

        {/* Restart */}
        <div className="text-center">
          <button
            onClick={resetGame}
            className="glass-panel px-8 py-3 font-game text-xs text-white/50 hover:text-white transition-colors"
          >
            ↺ RESTART JOURNEY
          </button>
        </div>
      </motion.div>

      {/* Credit strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 mt-auto py-6 text-center border-t border-purple-500/10"
      >
        <div className="font-game text-xs text-white/30 mb-2 tracking-widest">
          #BuiltWithImageEditor
        </div>
        <div className="font-game text-xs text-white/20 tracking-wider">
          Built with{' '}
          <a
            href="https://github.com/unlayer/react-image-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400/60 hover:text-purple-400 transition-colors underline"
          >
            Unlayer React Image Editor
          </a>
        </div>
        <div className="mt-1 font-game text-xs text-white/15">
          Unlayer "Build with React Image Editor Challenge" Entry
        </div>
      </motion.div>
    </div>
  );
}
