import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  WaterRippleOverlay,
  FlyingBirds,
  GodRays,
  PortalLightning,
  AmarJawanFlame,
  HeadlightBeams,
  RiverMist,
} from './LivingSceneFX';

export type HatomSceneId =
  | 'section-landing'
  | 'section-character'
  | 'section-los-santos'
  | 'section-portal'
  | 'section-mumbai'
  | 'section-delhi'
  | 'section-kolkata'
  | 'section-dream-meadow'
  | 'section-wonders'
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
  'section-dream-meadow': {
    image: '/assets/dream_meadow_gta.jpg',
    zoom: 'out',
    overlayGrad: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.85) 100%)',
    tintColor: '#ec4899',
  },
  'section-wonders': {
    image: '/assets/taj_mahal_gta.jpg',
    zoom: 'out',
    overlayGrad: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(20,5,30,0.92) 100%)',
    tintColor: '#ff2d87',
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
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // 2.5D Interactive Mouse Parallax
  useEffect(() => {
    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        setMouseOffset({ x: nx, y: ny });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const getZoomAnimation = () => {
    switch (config.zoom) {
      case 'in':
        return { scale: [1.02, 1.08] };
      case 'out':
        return { scale: [1.08, 1.02] };
      case 'pan-left':
        return { x: [0, -25], scale: 1.06 };
      case 'pan-right':
        return { x: [-25, 0], scale: 1.06 };
      default:
        return { scale: 1.04 };
    }
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      {/* 2.5D Tilt Perspective Container */}
      <div
        className="w-full h-full relative"
        style={{
          perspective: '1200px',
          transform: `perspective(1200px) rotateY(${mouseOffset.x * 2.2}deg) rotateX(${-mouseOffset.y * 2.2}deg) translate3d(${mouseOffset.x * -16}px, ${mouseOffset.y * -12}px, 0)`,
          transition: 'transform 0.18s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={config.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, ...getZoomAnimation() }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.9, ease: 'easeInOut' },
              scale: { duration: 24, repeat: Infinity, repeatType: 'reverse', ease: 'linear' },
              x: { duration: 24, repeat: Infinity, repeatType: 'reverse', ease: 'linear' },
            }}
            className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)]"
          >
            <img
              src={config.image}
              alt="Cinematic Background"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* --- LIVING ENVIRONMENTAL FX PER SCENE --- */}

        {/* Los Santos: Living Ocean Waves + Birds + Sun Flares + Car Glints */}
        {activeSectionId === 'section-los-santos' && (
          <>
            <WaterRippleOverlay heightPercent={24} />
            <FlyingBirds count={6} />
            <GodRays origin="72% 78%" color="rgba(255,180,80,0.14)" />
            {/* Ferrari Headlight Glints */}
            <HeadlightBeams
              beams={[
                { left: '78%', bottom: '26%', width: '120px', height: '14px', angle: -15, color: '#ffea70' },
              ]}
            />
          </>
        )}

        {/* The Portal: Electric Lightning Arcs + Inflowing Particles */}
        {activeSectionId === 'section-portal' && (
          <PortalLightning />
        )}

        {/* Mumbai: Arabian Sea Wave Ripples + Sea Birds + Harbor Lights */}
        {activeSectionId === 'section-mumbai' && (
          <>
            <WaterRippleOverlay heightPercent={28} />
            <FlyingBirds count={8} />
            <GodRays origin="68% 40%" color="rgba(255,150,50,0.12)" />
            {/* Marine Drive Promenade light beams */}
            <HeadlightBeams
              beams={[
                { left: '88%', bottom: '48%', width: '90px', height: '10px', angle: -25, color: '#ffdd66' },
                { left: '92%', bottom: '42%', width: '110px', height: '12px', angle: -25, color: '#ff3333' },
              ]}
            />
          </>
        )}

        {/* New Delhi: Auto-Rickshaw & VIP Ambassador Headlights + Soft Twilight Rays */}
        {activeSectionId === 'section-delhi' && (
          <>
            <GodRays origin="50% 65%" color="rgba(255,120,40,0.16)" />
            <HeadlightBeams
              beams={[
                // Auto-rickshaws headlights
                { left: '68%', bottom: '33%', width: '140px', height: '16px', angle: -35, color: '#ffffaa' },
                { left: '84%', bottom: '31%', width: '150px', height: '16px', angle: -35, color: '#ffffaa' },
                // Ambassador VIP cars
                { left: '16%', bottom: '31%', width: '130px', height: '16px', angle: 35, color: '#ff3333' },
                { left: '38%', bottom: '36%', width: '100px', height: '12px', angle: -30, color: '#ffffaa' },
              ]}
            />
          </>
        )}

        {/* Kolkata: Victoria Memorial Lake Caustics + Rolling River Mist + Howrah Bridge Glow */}
        {activeSectionId === 'section-kolkata' && (
          <>
            <WaterRippleOverlay heightPercent={28} />
            <RiverMist />
            <GodRays origin="78% 28%" color="rgba(120,180,255,0.12)" />
            {/* Yellow Taxi Headlight Streaks on curved road */}
            <HeadlightBeams
              beams={[
                { left: '66%', bottom: '22%', width: '120px', height: '14px', angle: -30, color: '#ffee88' },
                { left: '79%', bottom: '27%', width: '110px', height: '12px', angle: -35, color: '#ffee88' },
                { left: '88%', bottom: '37%', width: '90px', height: '10px', angle: -40, color: '#ff4444' },
              ]}
            />
          </>
        )}

        {/* Landing: Distant Sky Birds + Cinematic Horizon Flares */}
        {activeSectionId === 'section-landing' && (
          <>
            <FlyingBirds count={4} />
            <GodRays origin="25% 42%" color="rgba(255,160,60,0.1)" />
          </>
        )}
      </div>

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
