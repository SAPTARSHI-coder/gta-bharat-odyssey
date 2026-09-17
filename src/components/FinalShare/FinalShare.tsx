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
    a.download = `${character?.name.toLowerCase().replace(/\s+/g, '_') ?? 'journey'}_los_santos_bharat.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [finalPosterDataUrl, character]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard! Share your epic journey.');
    });
  }, []);

  return (
    <div className="min-h-screen bg-game-dark relative overflow-hidden flex flex-col select-none">
      {/* Dark Translucent Backdrop */}
      <div
        className="absolute inset-0 z-0 bg-black/80 backdrop-blur-md"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(24,0,53,0.7) 0%, rgba(10,0,24,0.85) 45%, rgba(5,5,10,0.95) 100%)',
        }}
      />
      <Particles count={20} color="#ff9933" />
      <Particles count={15} color="#b347ff" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center pt-12 pb-6 px-4"
      >
        <div className="hud-element text-amber-400 mb-2 tracking-[0.5em] font-bold">
          ◈ MISSION ACCOMPLISHED ◈
        </div>
        <h2
          className="font-cinematic text-5xl md:text-8xl text-white mb-2"
          style={{ textShadow: '0 0 45px rgba(255,153,51,0.5)' }}
        >
          YOUR BHARAT ODYSSEY
        </h2>
        {character && (
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-purple-500" />
            <div className="text-center">
              <span className="font-cinematic text-2xl md:text-3xl text-white mr-2">
                {character.name}
              </span>
              <span className="font-game text-xs text-orange-400 px-2 py-0.5 rounded bg-orange-400/10 border border-orange-400/30">
                {character.title}
              </span>
            </div>
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-purple-500" />
          </div>
        )}
      </motion.div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 w-full flex-1 flex flex-col pb-12">
        {/* Full 5-Stop Route Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-panel p-4 mb-6 border border-white/15"
        >
          <div className="hud-element text-orange-400 mb-3 text-center text-xs tracking-widest font-bold">
            ◈ COMPLETE EXPEDITION ROUTE ◈
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-center">
            {[
              { label: 'LOS SANTOS', icon: '🌴', color: '#b347ff' },
              { label: '→ PORTAL →', icon: '🌀', color: '#cc88ff' },
              { label: 'MUMBAI', icon: '🏛️', color: '#ff9933' },
              { label: '→', icon: null, color: '#ff6b35' },
              { label: 'NEW DELHI', icon: '🇮🇳', color: '#ff6b35' },
              { label: '→', icon: null, color: '#66aaff' },
              { label: 'KOLKATA', icon: '👑', color: '#66aaff' },
            ].map(({ label, icon, color }, i) => (
              <div key={i} className="flex items-center gap-1">
                {icon && <span className="text-base">{icon}</span>}
                <span
                  className="font-game text-xs tracking-wider font-bold"
                  style={{ color, textShadow: `0 0 8px ${color}` }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Card Preview (Matching concept art Panel 7) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-panel p-5 mb-6 border border-purple-500/30 shadow-[0_0_40px_rgba(0,0,0,0.8)] max-w-2xl mx-auto w-full"
        >
          {/* Social Post Header */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-orange-500 flex items-center justify-center font-bold text-white text-lg shadow-md">
              {character?.name?.[0]?.toUpperCase() || 'P'}
            </div>
            <div>
              <div className="font-game text-sm font-bold text-white flex items-center gap-1.5">
                <span>{character?.name || 'Operative'}</span>
                <span className="text-cyan-400 text-xs">✓</span>
              </div>
              <div className="font-game text-xs text-white/40">
                @{character?.name?.toLowerCase().replace(/\s+/g, '') || 'player'} · Just now
              </div>
            </div>
            <div className="ml-auto font-game text-xs text-purple-400 border border-purple-400/30 px-2 py-0.5 rounded">
              #BuiltWithImageEditor
            </div>
          </div>

          {/* User's Created / Edited Poster */}
          {finalPosterDataUrl ? (
            <div className="rounded-lg overflow-hidden border border-white/20 shadow-2xl bg-black mb-4">
              <img
                src={finalPosterDataUrl}
                alt="Final Journey Card"
                className="w-full max-h-[420px] object-contain mx-auto"
              />
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden border border-white/20 shadow-2xl bg-black mb-4">
              <img
                src="/assets/hero_cover_art.jpg"
                alt="Journey Poster"
                className="w-full max-h-[380px] object-cover mx-auto"
              />
            </div>
          )}

          {/* Social Post Text */}
          <p className="font-game text-sm text-white/90 mb-3">
            "Same dreams. A different map." Just finished my cross-continental journey from Los Santos to Bharat! 🌴🌀🇮🇳
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-game text-cyan-400 mb-4">
            <span>#BuiltWithImageEditor</span>
            <span>#Unlayer</span>
            <span>#GTA6</span>
            <span>#Bharat</span>
            <span>#Kolkata</span>
          </div>

          {/* Social Engagement Metrics */}
          <div className="flex items-center gap-6 pt-3 border-t border-white/10 text-xs font-game text-white/50">
            <span className="flex items-center gap-1.5 hover:text-red-400 transition-colors cursor-pointer">
              ❤️ <strong className="text-white/80">1.4K</strong>
            </span>
            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer">
              💬 <strong className="text-white/80">188</strong>
            </span>
            <span className="flex items-center gap-1.5 hover:text-green-400 transition-colors cursor-pointer">
              🔄 <strong className="text-white/80">142</strong>
            </span>
            <span className="ml-auto text-amber-400 font-bold">★ VERIFIED SUBMISSION</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-6"
        >
          {finalPosterDataUrl && (
            <button
              onClick={handleDownload}
              className="game-btn-purple py-4 px-8 text-sm md:text-base font-bold flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(179,71,255,0.6)]"
            >
              <span>⬇</span>
              <span>DOWNLOAD HIGH-RES POSTER</span>
            </button>
          )}

          <button
            onClick={handleCopyLink}
            className="game-btn-orange py-4 px-8 text-sm md:text-base font-bold flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(255,107,53,0.6)]"
          >
            <span>🔗</span>
            <span>COPY SHAREABLE LINK</span>
          </button>

          <button
            onClick={resetGame}
            className="glass-panel px-6 py-4 font-game text-xs md:text-sm text-white/70 hover:text-white transition-colors cursor-pointer border border-white/20"
          >
            ↺ PLAY AGAIN
          </button>
        </motion.div>

        {/* Footer Challenge Signature */}
        <div className="mt-auto text-center font-game text-xs text-white/30 pt-4 border-t border-white/10">
          <div>Built for the <strong>Unlayer "Build with React Image Editor Challenge"</strong></div>
          <div className="text-[11px] text-white/20 mt-1">#BuiltWithImageEditor · Production Quality Web Experience</div>
        </div>
      </div>
    </div>
  );
}
