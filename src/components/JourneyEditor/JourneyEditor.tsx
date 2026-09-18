import React, { useRef, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ImageEditor, { type ImageEditorRef } from '@unlayer/react-image-editor';
import { useGame } from '../../context/GameContext';
import { sounds } from '../../utils/audio';
import type { Character } from '../../types';

interface TemplateOption {
  id: string;
  name: string;
  icon: string;
  path: string;
  description: string;
}

const TEMPLATES: TemplateOption[] = [
  {
    id: 'official-poster',
    name: 'Official GTA Travel Poster',
    icon: '🌟',
    path: '/assets/journey_poster_default.jpg',
    description: 'Split-world retro travel poster with custom operative stats',
  },
  {
    id: 'cover-art',
    name: 'Key Art Split Panoramic',
    icon: '✨',
    path: '/assets/hero_cover_art.jpg',
    description: 'Los Santos to Bharat cinematic game key visual',
  },
  {
    id: 'los-santos',
    name: 'Los Santos Beach Sunset',
    icon: '🌴',
    path: '/assets/los_santos_beach.jpg',
    description: 'Pacific Coast Hwy with red sports car & pier',
  },
  {
    id: 'portal',
    name: 'The Cosmic Portal',
    icon: '🌀',
    path: '/assets/portal_scene.jpg',
    description: 'Neon alleyway with swirling dimensional rift',
  },
  {
    id: 'mumbai',
    name: 'Mumbai Taj Palace',
    icon: '🏛️',
    path: '/assets/mumbai_taj_scene.jpg',
    description: 'Arabian Sea harbor with Taj Mahal Hotel & Gateway',
  },
  {
    id: 'delhi',
    name: 'New Delhi India Gate',
    icon: '🇮🇳',
    path: '/assets/delhi_india_gate.jpg',
    description: 'Kartavya Path with illuminated India Gate & taxis',
  },
  {
    id: 'kolkata',
    name: 'Kolkata Victoria Memorial',
    icon: '👑',
    path: '/assets/kolkata_victoria_memorial.jpg',
    description: 'Victoria Memorial lake reflection & Howrah Bridge',
  },
  {
    id: 'great-wall',
    name: 'Great Wall of China (Wonder)',
    icon: '🇨🇳',
    path: '/assets/great_wall_gta.jpg',
    description: 'Badaling Ridge District · Beijing, China · $280K Bounty',
  },
  {
    id: 'christ-redeemer',
    name: 'Christ the Redeemer (Wonder)',
    icon: '🇧🇷',
    path: '/assets/christ_redeemer_gta.jpg',
    description: 'Corcovado Summit · Rio de Janeiro, Brazil · $195K Bounty',
  },
  {
    id: 'colosseum',
    name: 'The Colosseum (Wonder)',
    icon: '🇮🇹',
    path: '/assets/colosseum_gta.jpg',
    description: 'Gladiator Arena District · Rome, Italy · $320K Bounty',
  },
  {
    id: 'chichen-itza',
    name: 'Chichen Itza (Wonder)',
    icon: '🇲🇽',
    path: '/assets/chichen_itza_gta.jpg',
    description: 'Kukulcan Pyramid · Yucatan, Mexico · $160K Bounty',
  },
  {
    id: 'taj-mahal',
    name: 'Taj Mahal Eternal (Wonder)',
    icon: '🕌',
    path: '/assets/taj_mahal_gta.jpg',
    description: 'Eternal Shrine · Agra, India · $240K Bounty',
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu (Wonder)',
    icon: '🇵🇪',
    path: '/assets/machu_picchu_gta.jpg',
    description: 'Lost Incan Citadel · Andes, Peru · $145K Bounty',
  },
  {
    id: 'petra',
    name: 'Petra Rose-Red City (Wonder)',
    icon: '🇯🇴',
    path: '/assets/petra_gta.jpg',
    description: 'Al-Khazneh Treasury · Ma\'an, Jordan · $210K Bounty',
  },
];

// Canvas-based poster customizer: stamps character details cleanly onto high-res base art
function createPersonalizedPoster(
  character: Character | null,
  baseImagePath: string = '/assets/journey_poster_default.jpg'
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 1200;
      canvas.height = img.naturalHeight || 1600;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(baseImagePath);
        return;
      }
      // 1. Draw base poster
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 2. Overlay personalized operative info if character exists
      if (character) {
        const w = canvas.width;
        const h = canvas.height;

        ctx.save();
        // Operative badge pill
        const badgeY = h * 0.44;
        const badgeW = Math.min(w * 0.52, 600);
        const badgeH = 78;
        const badgeX = (w - badgeW) / 2;

        ctx.fillStyle = 'rgba(5, 2, 15, 0.82)';
        ctx.strokeStyle = '#b347ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 14);
        ctx.fill();
        ctx.stroke();

        ctx.shadowColor = '#b347ff';
        ctx.shadowBlur = 20;

        ctx.fillStyle = '#ff9933';
        ctx.font = 'bold 16px "Orbitron", monospace, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('◈ OPERATIVE DOSSIER ◈', w / 2, badgeY + 28);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Impact, sans-serif';
        ctx.letterSpacing = '2px';
        ctx.fillText(character.name.toUpperCase(), w / 2, badgeY + 60);

        // Stats ribbon above footer
        const statsY = h * 0.895;
        const statsW = w * 0.90;
        const statsH = 46;
        const statsX = (w - statsW) / 2;

        ctx.fillStyle = 'rgba(8, 0, 20, 0.88)';
        ctx.strokeStyle = '#ff6b35';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(statsX, statsY, statsW, statsH, 10);
        ctx.fill();
        ctx.stroke();

        ctx.shadowColor = '#ff6b35';
        ctx.shadowBlur = 12;
        ctx.font = 'bold 15px "Orbitron", monospace, sans-serif';
        ctx.fillStyle = '#00f5ff';
        ctx.textAlign = 'center';
        ctx.fillText(
          `CLASS: ${character.title.toUpperCase()}  |  DRIVING: ${character.stats.driving}  •  TECH: ${character.stats.tech}  •  STYLE: ${character.stats.style}`,
          w / 2,
          statsY + 29
        );

        ctx.restore();
      }

      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      resolve(baseImagePath);
    };
    img.src = baseImagePath;
  });
}

export function JourneyEditor() {
  const { character, goToScene, setFinalPoster } = useGame();
  const editorRef = useRef<ImageEditorRef>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState('official-poster');
  const [activeImageUrl, setActiveImageUrl] = useState<string>('/assets/journey_poster_default.jpg');
  const [isRendering, setIsRendering] = useState(false);

  // Generate personalized poster when template or character changes
  useEffect(() => {
    const selected = TEMPLATES.find(t => t.id === selectedTemplateId) || TEMPLATES[0];
    if (selected.id === 'official-poster') {
      setIsRendering(true);
      createPersonalizedPoster(character, selected.path).then((url) => {
        setActiveImageUrl(url);
        setIsRendering(false);
      });
    } else {
      setActiveImageUrl(selected.path);
    }
  }, [selectedTemplateId, character]);

  const handleSave = useCallback(({ dataUrl }: { dataUrl: string; blob: Blob }) => {
    sounds.playCameraShutter();
    setFinalPoster(dataUrl);
    // Smooth scroll to final debrief section
    const finalSec = document.getElementById('section-final');
    if (finalSec) {
      finalSec.scrollIntoView({ behavior: 'smooth' });
    } else {
      goToScene('final');
    }
  }, [setFinalPoster, goToScene]);

  const handleSkip = useCallback(() => {
    const currentImg = editorRef.current?.editor?.getImage() || activeImageUrl;
    if (currentImg) setFinalPoster(currentImg);
    const finalSec = document.getElementById('section-final');
    if (finalSec) {
      finalSec.scrollIntoView({ behavior: 'smooth' });
    } else {
      goToScene('final');
    }
  }, [activeImageUrl, setFinalPoster, goToScene]);

  return (
    <div className="relative min-h-screen bg-black/85 backdrop-blur-md text-white flex flex-col justify-between select-none py-10 px-4 md:px-8">
      {/* Background Matrix */}
      <div
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(179,71,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(179,71,255,0.25) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Header Banner */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-6">
        <div className="hud-element text-purple-400 mb-1.5 font-bold tracking-[0.4em]">
          ◈ UNLAYER REACT IMAGE EDITOR · WANTED POSTER STUDIO ◈
        </div>
        <h2
          className="font-cinematic text-4xl sm:text-5xl md:text-6xl text-white tracking-wide leading-tight mb-2"
          style={{ textShadow: '0 0 35px rgba(179,71,255,0.7)' }}
        >
          STAMP YOUR LEGEND
        </h2>
        <p className="text-white/70 text-xs sm:text-sm font-game max-w-2xl mx-auto leading-relaxed">
          Every criminal needs a calling card. Pick your landmark below, then use the Unlayer editor to
          add text, filters, crop, draw, and frame your masterpiece. Hit <strong>SAVE</strong> when your poster is ready to go viral.
        </p>
      </div>

      {/* Template Selector Rail */}
      <div className="relative z-10 max-w-5xl mx-auto w-full mb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplateId === tmpl.id;
            return (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplateId(tmpl.id)}
                className={`px-3.5 py-2 rounded-lg font-game text-xs tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-purple-600 border-purple-300 text-white shadow-[0_0_20px_rgba(179,71,255,0.8)] font-bold scale-105'
                    : 'bg-black/60 border-white/15 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-base">{tmpl.icon}</span>
                <span>{tmpl.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Unlayer Image Editor Viewport */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 rounded-xl overflow-hidden border-2 border-purple-500/30 shadow-[0_0_50px_rgba(0,0,0,0.9)] bg-neutral-950 flex flex-col min-h-[660px]">
        {isRendering ? (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[660px] text-center p-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mb-4"
            />
            <div className="font-cinematic text-2xl text-white">GENERATING CUSTOM POSTER...</div>
            <div className="font-game text-xs text-white/50 mt-1">Stamping operative dossier and travel route...</div>
          </div>
        ) : (
          <ImageEditor
            key={activeImageUrl}
            ref={editorRef}
            image={activeImageUrl}
            minHeight={660}
            style={{ flex: 1, minHeight: '660px' }}
            options={{
              theme: 'dark',
            }}
            onSave={handleSave}
            onCancel={handleSkip}
            onLoadError={() => console.warn('Poster load warning')}
            onError={(err: Error) => console.error('Editor runtime error:', err)}
          />
        )}
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 max-w-6xl mx-auto w-full mt-4 flex flex-wrap items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-2 text-white/60 font-game text-xs">
          <span className="text-emerald-400">●</span>
          <span>Click <strong>SAVE</strong> in the editor toolbar to lock in your art and advance to the Mission Debrief.</span>
        </div>

        <button
          onClick={handleSkip}
          className="glass-panel px-6 py-2.5 font-game text-xs text-white/80 hover:text-white transition-colors cursor-pointer border border-white/20"
        >
          SKIP TO DEBRIEF — I'M ALREADY LEGENDARY →
        </button>
      </div>
    </div>
  );
}
