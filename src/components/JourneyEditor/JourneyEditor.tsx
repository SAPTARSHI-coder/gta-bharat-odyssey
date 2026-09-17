import { useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import ImageEditor, { type ImageEditorRef } from '@unlayer/react-image-editor';
import { useGame } from '../../context/GameContext';
import type { Character } from '../../types';

// Generate the journey poster SVG as an object URL
function generatePosterDataUrl(character: Character): string {
  const statBars = (['tech','driving','style','street','luck'] as const).map((stat, i) => {
    const val = character.stats[stat];
    const barWidth = Math.round(val * 1.4);
    const y = 775 + i * 17;
    const colors = ['#b347ff','#ff6b35','#ff2d87','#00f5ff','#ffd700'];
    return `
    <text x="60" y="${y}" font-family="monospace" font-size="8" fill="${colors[i]}" letter-spacing="2">${stat.toUpperCase()}</text>
    <rect x="140" y="${y-11}" width="560" height="10" rx="5" fill="rgba(255,255,255,0.06)"/>
    <rect x="140" y="${y-11}" width="${barWidth}" height="10" rx="5" fill="${colors[i]}" opacity="0.85"/>
    <text x="712" y="${y}" text-anchor="end" font-family="monospace" font-size="8" fill="${colors[i]}">${val}</text>`;
  }).join('');

  const svg = `<svg viewBox="0 0 800 1000" xmlns="http://www.w3.org/2000/svg" width="800" height="1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#05000f"/>
      <stop offset="40%" stop-color="#0a0025"/>
      <stop offset="70%" stop-color="#1a0040"/>
      <stop offset="85%" stop-color="#3d1000"/>
      <stop offset="100%" stop-color="#0a2000"/>
    </linearGradient>
    <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#b347ff"/>
      <stop offset="100%" stop-color="#ff6b35"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bg)"/>
  <rect x="0" y="0" width="800" height="4" fill="url(#grad1)"/>

  <!-- Header -->
  <rect x="40" y="40" width="720" height="90" rx="4" fill="rgba(179,71,255,0.05)" stroke="rgba(179,71,255,0.3)" stroke-width="1"/>
  <text x="400" y="82" text-anchor="middle" font-family="monospace" font-size="9" fill="#b347ff" letter-spacing="8">CINEMATIC JOURNEY RECORD</text>
  <text x="400" y="118" text-anchor="middle" font-family="Impact, sans-serif" font-size="30" fill="white" letter-spacing="4">LOS SANTOS ARROW BHARAT</text>

  <!-- Character block -->
  <rect x="40" y="150" width="720" height="120" rx="4" fill="rgba(255,107,53,0.05)" stroke="rgba(255,107,53,0.3)" stroke-width="1"/>
  <text x="400" y="192" text-anchor="middle" font-family="monospace" font-size="9" fill="#ff6b35" letter-spacing="6">OPERATIVE</text>
  <text x="400" y="248" text-anchor="middle" font-family="Impact, sans-serif" font-size="52" fill="white">${character.name}</text>
  <rect x="275" y="258" width="250" height="28" rx="14" fill="rgba(179,71,255,0.2)" stroke="rgba(179,71,255,0.5)" stroke-width="1"/>
  <text x="400" y="277" text-anchor="middle" font-family="monospace" font-size="9" fill="#b347ff" letter-spacing="3">${character.title}</text>

  <!-- Journey path -->
  <!-- Los Santos -->
  <rect x="40" y="305" width="720" height="75" rx="4" fill="rgba(0,0,0,0.35)" stroke="rgba(179,71,255,0.2)" stroke-width="1"/>
  <text x="400" y="348" text-anchor="middle" font-family="Impact, sans-serif" font-size="20" fill="white">LOS SANTOS</text>
  <text x="400" y="370" text-anchor="middle" font-family="monospace" font-size="7" fill="#b347ff" letter-spacing="3">CITY OF DREAMS - PACIFIC COAST</text>

  <!-- Arrow -->
  <text x="400" y="410" text-anchor="middle" font-family="monospace" font-size="9" fill="rgba(179,71,255,0.6)" letter-spacing="3">PORTAL</text>

  <!-- Mumbai -->
  <rect x="40" y="425" width="720" height="75" rx="4" fill="rgba(0,0,0,0.35)" stroke="rgba(255,153,51,0.2)" stroke-width="1"/>
  <text x="400" y="468" text-anchor="middle" font-family="Impact, sans-serif" font-size="20" fill="white">MUMBAI</text>
  <text x="400" y="490" text-anchor="middle" font-family="monospace" font-size="7" fill="#ff9933" letter-spacing="3">GATEWAY OF INDIA - CITY OF DREAMS</text>

  <!-- Arrow -->
  <text x="400" y="530" text-anchor="middle" font-family="monospace" font-size="9" fill="rgba(255,153,51,0.6)" letter-spacing="3">NORTH</text>

  <!-- Delhi -->
  <rect x="40" y="545" width="720" height="75" rx="4" fill="rgba(0,0,0,0.35)" stroke="rgba(255,107,53,0.2)" stroke-width="1"/>
  <text x="400" y="588" text-anchor="middle" font-family="Impact, sans-serif" font-size="20" fill="white">NEW DELHI</text>
  <text x="400" y="610" text-anchor="middle" font-family="monospace" font-size="7" fill="#ff6b35" letter-spacing="3">INDIA GATE - CAPITAL OF BHARAT</text>

  <!-- Stats -->
  <rect x="40" y="650" width="720" height="145" rx="4" fill="rgba(0,0,0,0.3)" stroke="rgba(179,71,255,0.2)" stroke-width="1"/>
  <text x="400" y="678" text-anchor="middle" font-family="monospace" font-size="9" fill="#b347ff" letter-spacing="6">OPERATIVE STATS</text>
  ${statBars}

  <!-- Tagline -->
  <rect x="40" y="815" width="720" height="95" rx="4" fill="rgba(0,0,0,0.2)" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  <text x="400" y="854" text-anchor="middle" font-family="Impact, sans-serif" font-size="20" fill="white" letter-spacing="6">SAME DREAMS.</text>
  <text x="400" y="895" text-anchor="middle" font-family="Impact, sans-serif" font-size="20" fill="white" letter-spacing="6">A DIFFERENT MAP.</text>

  <!-- Footer -->
  <rect x="0" y="932" width="800" height="50" fill="rgba(0,0,0,0.5)"/>
  <text x="400" y="965" text-anchor="middle" font-family="monospace" font-size="8" fill="rgba(255,255,255,0.3)" letter-spacing="4">#BuiltWithImageEditor</text>
  <text x="400" y="980" text-anchor="middle" font-family="monospace" font-size="7" fill="rgba(255,255,255,0.2)">UNLAYER REACT IMAGE EDITOR CHALLENGE</text>

  <rect x="0" y="996" width="800" height="4" fill="url(#grad1)"/>
</svg>`;

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
}

export function JourneyEditor() {
  const { character, goToScene, setFinalPoster } = useGame();
  const editorRef = useRef<ImageEditorRef>(null);

  const posterUrl = useMemo(() => {
    if (!character) return '';
    return generatePosterDataUrl(character);
  }, [character]);

  const handleSave = useCallback(({ dataUrl }: { dataUrl: string; blob: Blob }) => {
    setFinalPoster(dataUrl);
    goToScene('final');
  }, [setFinalPoster, goToScene]);

  const handleSkip = useCallback(() => {
    const dataUrl = editorRef.current?.editor?.getImage() || posterUrl;
    if (dataUrl) setFinalPoster(dataUrl);
    goToScene('final');
  }, [posterUrl, setFinalPoster, goToScene]);

  if (!character) return null;

  return (
    <div className="min-h-screen bg-game-dark relative overflow-hidden">
      {/* BG grid */}
      <div
        className="fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(179,71,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(179,71,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center py-6 px-4"
        style={{
          borderBottom: '1px solid rgba(179,71,255,0.2)',
          background: 'linear-gradient(180deg, rgba(10,0,30,0.9) 0%, transparent 100%)',
        }}
      >
        <div className="hud-element text-purple-400 mb-2">◈ JOURNEY POSTER STUDIO ◈</div>
        <h2
          className="font-cinematic text-3xl md:text-5xl text-white"
          style={{ textShadow: '0 0 20px rgba(179,71,255,0.5)' }}
        >
          CREATE YOUR JOURNEY POSTER
        </h2>
        <p className="text-white/40 text-sm mt-2 font-game tracking-wider">
          Powered by Unlayer React Image Editor · Customize your journey card below
        </p>
      </motion.div>

      {/* Tool hints */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 px-4 py-3 flex flex-wrap gap-3 justify-center"
        style={{ borderBottom: '1px solid rgba(179,71,255,0.1)' }}
      >
        {[
          { icon: '✂️', label: 'Crop & Resize' },
          { icon: '🎨', label: 'Apply Filters' },
          { icon: '✍️', label: 'Add Text' },
          { icon: '🖊️', label: 'Draw' },
          { icon: '⭐', label: 'Shapes & Stickers' },
          { icon: '🖼️', label: 'Frames' },
        ].map(({ icon, label }) => (
          <div key={label} className="glass-panel px-3 py-1.5 flex items-center gap-2">
            <span className="text-sm">{icon}</span>
            <span className="font-game text-xs text-white/60">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* The Unlayer Editor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10"
        style={{ minHeight: '650px' }}
      >
        {posterUrl && (
          <ImageEditor
            ref={editorRef}
            image={posterUrl}
            minHeight={650}
            style={{ flex: 1 }}
            options={{
              theme: 'dark',
            }}
            onSave={handleSave}
            onCancel={handleSkip}
            onLoadError={() => console.warn('Image load error')}
            onError={(err: Error) => console.error('Editor error:', err)}
          />
        )}
      </motion.div>

      {/* Bottom bar */}
      <div
        className="relative z-10 flex justify-between items-center px-6 py-4"
        style={{
          borderTop: '1px solid rgba(179,71,255,0.2)',
          background: 'rgba(0,0,0,0.6)',
        }}
      >
        <div className="text-white/30 text-xs font-game tracking-wider">
          Use the editor tools · Click SAVE when done · Or skip to continue
        </div>
        <button
          onClick={handleSkip}
          className="glass-panel px-6 py-2 font-game text-xs text-white/60 hover:text-white transition-colors"
        >
          SKIP EDITING →
        </button>
      </div>
    </div>
  );
}
