import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { losSantosSVG } from './scene_los_santos';
import { mumbaiSVG } from './scene_mumbai';
import { delhiSVG } from './scene_delhi';
import { kolkataSVG } from './scene_kolkata';
import { portalSVG } from './scene_portal';

export type SceneKey = 'los-santos' | 'mumbai' | 'delhi' | 'kolkata' | 'portal';

const sceneImages: Record<SceneKey, string> = {
  'los-santos': '/assets/los_santos_beach.jpg',
  'portal':     '/assets/portal_scene.jpg',
  'mumbai':     '/assets/mumbai_taj_scene.jpg',
  'delhi':      '/assets/delhi_india_gate.jpg',
  'kolkata':    '/assets/kolkata_victoria_memorial.jpg',
};

const svgFallbacks: Record<SceneKey, string> = {
  'los-santos': losSantosSVG,
  'mumbai':     mumbaiSVG,
  'delhi':      delhiSVG,
  'kolkata':    kolkataSVG,
  'portal':     portalSVG,
};

interface SceneBgProps {
  scene: SceneKey;
  zoomDirection?: 'in' | 'out' | 'pan-left' | 'pan-right';
}

export function SceneBackground({ scene, zoomDirection = 'in' }: SceneBgProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = sceneImages[scene];

  const getAnimationTarget = () => {
    switch (zoomDirection) {
      case 'in':
        return { opacity: imageLoaded ? 1 : 0, scale: [1, 1.08] };
      case 'out':
        return { opacity: imageLoaded ? 1 : 0, scale: [1.08, 1] };
      case 'pan-left':
        return { opacity: imageLoaded ? 1 : 0, x: [0, -30], scale: 1.05 };
      case 'pan-right':
        return { opacity: imageLoaded ? 1 : 0, x: [-30, 0], scale: 1.05 };
      default:
        return { opacity: imageLoaded ? 1 : 0, scale: 1 };
    }
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      {/* SVG Underlay / Fallback */}
      <div
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
        dangerouslySetInnerHTML={{ __html: svgFallbacks[scene] }}
      />

      {/* Hi-Res Generated Direct Cinematic Image with Ken Burns animation */}
      {imageUrl && (
        <motion.div
          key={imageUrl}
          initial={{ opacity: 0 }}
          animate={getAnimationTarget()}
          transition={{
            opacity: { duration: 1.2 },
            scale: { duration: 20, repeat: Infinity, repeatType: 'reverse' },
            x: { duration: 22, repeat: Infinity, repeatType: 'reverse' },
          }}
          className="absolute inset-0 z-1"
          style={{ width: '100%', height: '100%' }}
        >
          <img
            src={imageUrl}
            alt={scene}
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      )}

      {/* Cinematic Color Grading & Vignette Overlay */}
      <div
        className="absolute inset-0 z-2"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* Ambient Lighting Tint per Scene */}
      {scene === 'portal' && (
        <div
          className="absolute inset-0 z-2 mix-blend-screen opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, #b347ff 0%, #00f5ff 50%, transparent 80%)',
          }}
        />
      )}
      {scene === 'los-santos' && (
        <div
          className="absolute inset-0 z-2 mix-blend-color-dodge opacity-15 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #ff4791 0%, #ff8c35 60%, transparent 100%)',
          }}
        />
      )}
      {scene === 'mumbai' && (
        <div
          className="absolute inset-0 z-2 mix-blend-color-dodge opacity-15 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #ff9933 0%, #ff5500 50%, transparent 100%)',
          }}
        />
      )}
      {scene === 'delhi' && (
        <div
          className="absolute inset-0 z-2 mix-blend-color-dodge opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center 60%, rgba(255,140,40,0.2) 0%, transparent 70%)',
          }}
        />
      )}
      {scene === 'kolkata' && (
        <div
          className="absolute inset-0 z-2 mix-blend-screen opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 60% 40%, rgba(120,180,255,0.25) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Subtle Scanline Overlay */}
      <div
        className="absolute inset-0 z-3 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 3px)',
        }}
      />
    </div>
  );
}
