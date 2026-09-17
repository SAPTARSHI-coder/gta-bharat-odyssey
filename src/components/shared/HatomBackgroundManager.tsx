import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type HatomSceneId =
  | 'section-landing'
  | 'section-character'
  | 'section-los-santos'
  | 'section-portal'
  | 'section-mumbai'
  | 'section-delhi'
  | 'section-kolkata'
  | 'section-editor'
  | 'section-final';

interface BackgroundConfig {
  image: string;
  zoom: 'in' | 'out' | 'pan-left' | 'pan-right';
  overlayGrad: string;
  tintColor?: string;
}

const BG_CONFIGS: Record<HatomSceneId, BackgroundConfig> = {
  'section-landing': {
    image: '/assets/hero_cover_art.jpg',
    zoom: 'out',
    overlayGrad: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.85) 100%)',
  },
  'section-character': {
    image: '/assets/hero_cover_art.jpg',
    zoom: 'in',
    overlayGrad: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(10,0,25,0.9) 100%)',
    tintColor: '#b347ff',
  },
  'section-los-santos': {
    image: '/assets/los_santos_beach.jpg',
    zoom: 'in',
    overlayGrad: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.75) 100%)',
    tintColor: '#ff6b35',
  },
  'section-portal': {
    image: '/assets/portal_scene.jpg',
    zoom: 'out',
    overlayGrad: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.8) 100%)',
    tintColor: '#b347ff',
  },
  'section-mumbai': {
    image: '/assets/mumbai_taj_scene.jpg',
    zoom: 'pan-right',
    overlayGrad: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.75) 100%)',
    tintColor: '#ff9933',
  },
  'section-delhi': {
    image: '/assets/delhi_india_gate.jpg',
    zoom: 'in',
    overlayGrad: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.8) 100%)',
    tintColor: '#ff4400',
  },
  'section-kolkata': {
    image: '/assets/kolkata_victoria_memorial.jpg',
    zoom: 'pan-left',
    overlayGrad: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.75) 100%)',
    tintColor: '#66aaff',
  },
  'section-editor': {
    image: '/assets/journey_poster_default.jpg',
    zoom: 'out',
    overlayGrad: 'linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(5,0,15,0.96) 100%)',
    tintColor: '#b347ff',
  },
  'section-final': {
    image: '/assets/journey_poster_default.jpg',
    zoom: 'in',
    overlayGrad: 'radial-gradient(ellipse at center, rgba(10,0,30,0.85) 0%, rgba(0,0,0,0.96) 100%)',
    tintColor: '#ff9933',
  },
};

interface HatomBackgroundManagerProps {
  activeSectionId: string;
}

export function HatomBackgroundManager({ activeSectionId }: HatomBackgroundManagerProps) {
  const config = BG_CONFIGS[activeSectionId as HatomSceneId] || BG_CONFIGS['section-landing'];

  const getZoomAnimation = () => {
    switch (config.zoom) {
      case 'in':
        return { scale: [1, 1.07] };
      case 'out':
        return { scale: [1.07, 1] };
      case 'pan-left':
        return { x: [0, -25], scale: 1.05 };
      case 'pan-right':
        return { x: [-25, 0], scale: 1.05 };
      default:
        return { scale: 1 };
    }
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={config.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, ...getZoomAnimation() }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.0, ease: 'easeInOut' },
            scale: { duration: 24, repeat: Infinity, repeatType: 'reverse', ease: 'linear' },
            x: { duration: 24, repeat: Infinity, repeatType: 'reverse', ease: 'linear' },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={config.image}
            alt="Cinematic Background"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Vignette Overlay */}
      <div
        className="absolute inset-0 z-1 transition-all duration-1000"
        style={{ background: config.overlayGrad }}
      />

      {/* Ambient Color Grading Glow */}
      {config.tintColor && (
        <div
          className="absolute inset-0 z-2 mix-blend-screen opacity-15 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at center, ${config.tintColor} 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Subtle Scanlines */}
      <div
        className="absolute inset-0 z-3 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 3px)',
        }}
      />
    </div>
  );
}
