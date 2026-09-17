import { useRef, useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ImageEditor, { type ImageEditorRef } from '@unlayer/react-image-editor';
import { useGame } from '../../context/GameContext';
import type { Character } from '../../types';

// Generate the journey poster SVG as an object URL
function generatePosterDataUrl(character: Character): string {
  const statBars = (['tech','driving','style','street','luck'] as const).map((stat, i) => {
    const val = character.stats[stat];
    const barWidth = Math.round(val * 1.4);
    const y = 805 + i * 17;
    const colors = ['#b347ff','#ff6b35','#ff2d87','#00f5ff','#ffd700'];
    return `
    <text x="60" y="${y}" font-family="monospace" font-size="8" fill="${colors[i]}" letter-spacing="2">${stat.toUpperCase()}</text>
    <rect x="140" y="${y-11}" width="560" height="10" rx="5" fill="rgba(255,255,255,0.06)"/>
    <rect x="140" y="${y-11}" width="${barWidth}" height="10" rx="5" fill="${colors[i]}" opacity="0.85"/>
    <text x="712" y="${y}" text-anchor="end" font-family="monospace" font-size="8" fill="${colors[i]}">${val}</text>`;
  }).join('');

  const svg = `<svg viewBox="0 0 800 1080" xmlns="http://www.w3.org/2000/svg" width="800" height="1080">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#04000f"/>
      <stop offset="35%" stop-color="#0c0022"/>
      <stop offset="65%" stop-color="#18003a"/>
      <stop offset="85%" stop-color="#2a0c00"/>
      <stop offset="100%" stop-color="#061208"/>
    </linearGradient>
    <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#b347ff"/>
      <stop offset="50%" stop-color="#ff6b35"/>
      <stop offset="100%" stop-color="#00f5ff"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1080" fill="url(#bg)"/>
  <rect x="0" y="0" width="800" height="4" fill="url(#grad1)"/>

  <!-- Header -->
  <rect x="40" y="30" width="720" height="85" rx="4" fill="rgba(179,71,255,0.05)" stroke="rgba(179,71,255,0.3)" stroke-width="1"/>
  <text x="400" y="65" text-anchor="middle" font-family="monospace" font-size="9" fill="#b347ff" letter-spacing="8">CINEMATIC JOURNEY RECORD</text>
  <text x="400" y="98" text-anchor="middle" font-family="Impact, sans-serif" font-size="28" fill="white" letter-spacing="4">LOS SANTOS TO BHARAT</text>

  <!-- Character block -->
  <rect x="40" y="130" width="720" height="110" rx="4" fill="rgba(255,107,53,0.05)" stroke="rgba(255,107,53,0.3)" stroke-width="1"/>
  <text x="400" y="165" text-anchor="middle" font-family="monospace" font-size="9" fill="#ff6b35" letter-spacing="6">PROTAGONIST OPERATIVE</text>
  <text x="400" y="215" text-anchor="middle" font-family="Impact, sans-serif" font-size="46" fill="white">${character.name.toUpperCase()}</text>
  <rect x="275" y="222" width="250" height="24" rx="12" fill="rgba(179,71,255,0.2)" stroke="rgba(179,71,255,0.5)" stroke-width="1"/>
  <text x="400" y="238" text-anchor="middle" font-family="monospace" font-size="8" fill="#b347ff" letter-spacing="3">${character.title}</text>

  <!-- Journey Route Section -->
  <!-- 1. Los Santos -->
  <rect x="40" y="260" width="720" height="65" rx="4" fill="rgba(0,0,0,0.35)" stroke="rgba(179,71,255,0.25)" stroke-width="1"/>
  <text x="400" y="295" text-anchor="middle" font-family="Impact, sans-serif" font-size="18" fill="white">1. LOS SANTOS BEACH</text>
  <text x="400" y="313" text-anchor="middle" font-family="monospace" font-size="7" fill="#b347ff" letter-spacing="3">PACIFIC COAST - SANTA MONICA PIER</text>

  <text x="400" y="342" text-anchor="middle" font-family="monospace" font-size="8" fill="rgba(179,71,255,0.6)">↓ COSMIC RIFT PORTAL ↓</text>

  <!-- 2. Mumbai -->
  <rect x="40" y="355" width="720" height="65" rx="4" fill="rgba(0,0,0,0.35)" stroke="rgba(255,153,51,0.25)" stroke-width="1"/>
  <text x="400" y="390" text-anchor="middle" font-family="Impact, sans-serif" font-size="18" fill="white">2. MUMBAI HARBOR</text>
  <text x="400" y="408" text-anchor="middle" font-family="monospace" font-size="7" fill="#ff9933" letter-spacing="3">GATEWAY OF INDIA - TAJ MAHAL PALACE</text>

  <text x="400" y="437" text-anchor="middle" font-family="monospace" font-size="8" fill="rgba(255,153,51,0.6)">↓ 1,400 KM NORTH ↓</text>

  <!-- 3. New Delhi -->
  <rect x="40" y="450" width="720" height="65" rx="4" fill="rgba(0,0,0,0.35)" stroke="rgba(255,107,53,0.25)" stroke-width="1"/>
  <text x="400" y="485" text-anchor="middle" font-family="Impact, sans-serif" font-size="18" fill="white">3. NEW DELHI (CAPITAL)</text>
  <text x="400" y="503" text-anchor="middle" font-family="monospace" font-size="7" fill="#ff6b35" letter-spacing="3">KARTAVYA PATH - INDIA GATE - AMAR JAWAN JYOTI</text>

  <text x="400" y="532" text-anchor="middle" font-family="monospace" font-size="8" fill="rgba(100,160,255,0.6)">↓ 1,500 KM EAST ↓</text>

  <!-- 4. Kolkata -->
  <rect x="40" y="545" width="720" height="65" rx="4" fill="rgba(0,0,0,0.35)" stroke="rgba(100,160,255,0.25)" stroke-width="1"/>
  <text x="400" y="580" text-anchor="middle" font-family="Impact, sans-serif" font-size="18" fill="white">4. KOLKATA (CITY OF JOY)</text>
  <text x="400" y="598" text-anchor="middle" font-family="monospace" font-size="7" fill="#66aaff" letter-spacing="3">VICTORIA MEMORIAL - HOWRAH BRIDGE - HOOGHLY RIVER</text>

  <!-- Stats Section -->
  <rect x="40" y="685" width="720" height="150" rx="4" fill="rgba(0,0,0,0.35)" stroke="rgba(179,71,255,0.2)" stroke-width="1"/>
  <text x="400" y="715" text-anchor="middle" font-family="monospace" font-size="9" fill="#b347ff" letter-spacing="6">OPERATIVE ATTRIBUTES</text>
  ${statBars}

  <!-- Tagline -->
  <rect x="40" y="855" width="720" height="85" rx="4" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <text x="400" y="890" text-anchor="middle" font-family="Impact, sans-serif" font-size="20" fill="white" letter-spacing="6">"SAME DREAMS.</text>
  <text x="400" y="920" text-anchor="middle" font-family="Impact, sans-serif" font-size="20" fill="white" letter-spacing="6">A DIFFERENT MAP."</text>

  <!-- Footer -->
  <rect x="0" y="1025" width="800" height="55" fill="rgba(0,0,0,0.6)"/>
  <text x="400" y="1052" text-anchor="middle" font-family="monospace" font-size="8" fill="rgba(255,255,255,0.4)" letter-spacing="4">#BuiltWithImageEditor</text>
  <text x="400" y="1068" text-anchor="middle" font-family="monospace" font-size="7" fill="rgba(255,255,255,0.25)">UNLAYER REACT IMAGE EDITOR CHALLENGE 2026</text>

  <rect x="0" y="1076" width="800" height="4" fill="url(#grad1)"/>
</svg>`;

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
}

const TEMPLATES = [
  { id: 'custom-poster', name: '📋 Journey Infographic', icon: '📋' },
  { id: 'hero-cover',    name: '✨ Full Cover Art',       icon: '✨', path: '/assets/hero_cover_art.jpg' },
  { id: 'los-santos',    name: '🌴 Los Santos Beach',    icon: '🌴', path: '/assets/los_santos_beach.jpg' },
  { id: 'portal',        name: '🌀 The Cosmic Portal',    icon: '🌀', path: '/assets/portal_scene.jpg' },
  { id: 'mumbai',        name: '🏛️ Mumbai Taj Palace',   icon: '🏛️', path: '/assets/mumbai_taj_scene.jpg' },
  { id: 'delhi',         name: '🇮🇳 Delhi India Gate',    icon: '🇮🇳', path: '/assets/delhi_india_gate.jpg' },
  { id: 'kolkata',       name: '👑 Kolkata Victoria',    icon: '👑', path: '/assets/kolkata_victoria_memorial.jpg' },
];

export function JourneyEditor() {
  const { character, goToScene, setFinalPoster } = useGame();
  const editorRef = useRef<ImageEditorRef>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('custom-poster');

  const dynamicPosterUrl = useMemo(() => {
    if (!character) return '';
    return generatePosterDataUrl(character);
  }, [character]);

  const currentImageUrl = useMemo(() => {
    const t = TEMPLATES.find(t => t.id === selectedTemplate);
    if (t?.path) return t.path;
    return dynamicPosterUrl;
  }, [selectedTemplate, dynamicPosterUrl]);

  const handleSave = useCallback(({ dataUrl }: { dataUrl: string; blob: Blob }) => {
    setFinalPoster(dataUrl);
    goToScene('final');
  }, [setFinalPoster, goToScene]);

  const handleSkip = useCallback(() => {
    const dataUrl = editorRef.current?.editor?.getImage() || currentImageUrl;
    if (dataUrl) setFinalPoster(dataUrl);
    goToScene('final');
  }, [currentImageUrl, setFinalPoster, goToScene]);

  if (!character) return null;

  return (
    <div className="min-h-screen bg-game-dark relative overflow-hidden flex flex-col select-none">
      {/* Background Matrix Grid */}
      <div
        className="fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(179,71,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(179,71,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center py-4 px-4 border-b border-purple-500/20 bg-black/60 backdrop-blur-md"
      >
        <div className="hud-element text-purple-400 mb-1 font-bold">
          ◈ REACT IMAGE EDITOR STUDIO ◈
        </div>
        <h2
          className="font-cinematic text-3xl md:text-5xl text-white leading-tight"
          style={{ textShadow: '0 0 25px rgba(179,71,255,0.6)' }}
        >
          CUSTOMIZE YOUR JOURNEY POSTER
        </h2>
        <p className="text-white/60 text-xs md:text-sm font-game tracking-wider">
          Powered by <strong className="text-purple-300 font-semibold">@unlayer/react-image-editor</strong> · Select a base template below, apply filters, add stickers, text & frames!
        </p>
      </motion.div>

      {/* Template Selector Pills */}
      <div className="relative z-10 px-4 py-2 bg-black/40 border-b border-white/10 flex items-center justify-center gap-2 overflow-x-auto">
        <span className="font-game text-[11px] text-white/50 uppercase font-bold mr-2 hidden sm:inline">
          TEMPLATE:
        </span>
        {TEMPLATES.map((tmpl) => {
          const isSelected = selectedTemplate === tmpl.id;
          return (
            <button
              key={tmpl.id}
              onClick={() => setSelectedTemplate(tmpl.id)}
              className={`px-3 py-1.5 rounded-full font-game text-xs tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_15px_rgba(179,71,255,0.7)] font-bold'
                  : 'bg-white/5 border-white/15 text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tmpl.icon}</span>
              <span>{tmpl.name}</span>
            </button>
          );
        })}
      </div>

      {/* Unlayer Image Editor Core Component */}
      <div className="relative z-10 flex-1 flex flex-col min-h-[640px]">
        {currentImageUrl && (
          <ImageEditor
            key={currentImageUrl}
            ref={editorRef}
            image={currentImageUrl}
            minHeight={640}
            style={{ flex: 1, minHeight: '640px' }}
            options={{
              theme: 'dark',
            }}
            onSave={handleSave}
            onCancel={handleSkip}
            onLoadError={() => console.warn('Image load issue')}
            onError={(err: Error) => console.error('Editor error:', err)}
          />
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="relative z-10 flex flex-wrap justify-between items-center px-6 py-3 border-t border-white/15 bg-black/70 backdrop-blur-md gap-3">
        <div className="text-white/50 text-xs font-game tracking-wider">
          💡 Click <strong className="text-emerald-400 font-semibold">SAVE</strong> inside the editor to finalize · Or skip directly to download
        </div>
        <button
          onClick={handleSkip}
          className="glass-panel px-6 py-2 font-game text-xs text-white/80 hover:text-white transition-colors cursor-pointer border border-white/20"
        >
          SKIP TO SHARE SCREEN →
        </button>
      </div>
    </div>
  );
}
