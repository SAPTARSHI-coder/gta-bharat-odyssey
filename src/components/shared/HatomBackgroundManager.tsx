import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WebGL3DDepthCanvas } from './WebGL3DDepthCanvas';
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
  | 'section-editor'
  | 'section-final';

interface BackgroundConfig {
  image: string;
  depth: string;
  intensity: number;
  overlayGrad: string;
  tintColor?: string;
}

const BG_CONFIGS: Record<HatomSceneId, BackgroundConfig> = {
  'section-landing': {
    image: '/assets/hero_cover_art.jpg',
    depth: '/assets/hero_cover_art_depth.jpg',
    intensity: 0.045,
    overlayGrad: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.85) 100%)',
  },
  'section-character': {
    image: '/assets/hero_cover_art.jpg',
    depth: '/assets/hero_cover_art_depth.jpg',
    intensity: 0.035,
    overlayGrad: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(10,0,25,0.9) 100%)',
    tintColor: '#b347ff',
  },
  'section-los-santos': {
    image: '/assets/los_santos_beach.jpg',
    depth: '/assets/los_santos_beach_depth.jpg',
    intensity: 0.065, // High 3D separation for protagonist & sports car
    overlayGrad: 'radial-gradient(ellipse at center, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.75) 100%)',
    tintColor: '#ff6b35',
  },
  'section-portal': {
    image: '/assets/portal_scene.jpg',
    depth: '/assets/portal_scene_depth.jpg',
    intensity: 0.060, // Strong depth vortex feel
    overlayGrad: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.8) 100%)',
    tintColor: '#b347ff',
  },
  'section-mumbai': {
    image: '/assets/mumbai_taj_scene.jpg',
    depth: '/assets/mumbai_taj_scene_depth.jpg',
    intensity: 0.065, // Balustrade and protagonist pop in front of Taj Palace
    overlayGrad: 'radial-gradient(ellipse at center, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.75) 100%)',
    tintColor: '#ff9933',
  },
  'section-delhi': {
    image: '/assets/delhi_india_gate.jpg',
    depth: '/assets/delhi_india_gate_depth.jpg',
    intensity: 0.065, // Protagonist and cars slide in front of India Gate
    overlayGrad: 'radial-gradient(ellipse at center, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.8) 100%)',
    tintColor: '#ff4400',
  },
  'section-kolkata': {
    image: '/assets/kolkata_victoria_memorial.jpg',
    depth: '/assets/kolkata_victoria_memorial_depth.jpg',
    intensity: 0.065, // Terrace and protagonist overlook the lake
    overlayGrad: 'radial-gradient(ellipse at center, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.75) 100%)',
    tintColor: '#66aaff',
  },
  'section-editor': {
    image: '/assets/journey_poster_default.jpg',
    depth: '/assets/journey_poster_default_depth.jpg',
    intensity: 0.040,
    overlayGrad: 'linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(5,0,15,0.96) 100%)',
    tintColor: '#b347ff',
  },
  'section-final': {
    image: '/assets/journey_poster_default.jpg',
    depth: '/assets/journey_poster_default_depth.jpg',
    intensity: 0.050,
    overlayGrad: 'radial-gradient(ellipse at center, rgba(10,0,30,0.85) 0%, rgba(0,0,0,0.96) 100%)',
    tintColor: '#ff9933',
  },
};

interface HatomBackgroundManagerProps {
  activeSectionId: string;
}

export function HatomBackgroundManager({ activeSectionId }: HatomBackgroundManagerProps) {
  const config = BG_CONFIGS[activeSectionId as HatomSceneId] || BG_CONFIGS['section-landing'];
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLSupported(!!gl);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      {/* 1. Real WebGL 3D Stereoscopic Depth-Displacement Canvas */}
      {webGLSupported ? (
        <AnimatePresence mode="sync">
          <motion.div
            key={config.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <WebGL3DDepthCanvas
              imageSrc={config.image}
              depthSrc={config.depth}
              intensity={config.intensity}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        /* Fallback if browser WebGL disabled */
        <img
          src={config.image}
          alt="Scene"
          className="w-full h-full object-cover object-center"
        />
      )}

      {/* --- LIVING ENVIRONMENTAL FX OVERLAYS --- */}

      {/* Los Santos: Living Ocean Waves + Birds + Sun Flares + Car Glints */}
      {activeSectionId === 'section-los-santos' && (
        <>
          <WaterRippleOverlay heightPercent={24} />
          <FlyingBirds count={6} />
          <GodRays origin="72% 78%" color="rgba(255,180,80,0.14)" />
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
          <HeadlightBeams
            beams={[
              { left: '88%', bottom: '48%', width: '90px', height: '10px', angle: -25, color: '#ffdd66' },
              { left: '92%', bottom: '42%', width: '110px', height: '12px', angle: -25, color: '#ff3333' },
            ]}
          />
        </>
      )}

      {/* New Delhi: Amar Jawan Jyoti Living Flame + Auto-Rickshaw Headlights */}
      {activeSectionId === 'section-delhi' && (
        <>
          <AmarJawanFlame />
          <GodRays origin="50% 65%" color="rgba(255,120,40,0.16)" />
          <HeadlightBeams
            beams={[
              { left: '68%', bottom: '33%', width: '140px', height: '16px', angle: -35, color: '#ffffaa' },
              { left: '84%', bottom: '31%', width: '150px', height: '16px', angle: -35, color: '#ffffaa' },
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

      {/* Atmospheric Vignette Overlay */}
      <div
        className="absolute inset-0 z-1 transition-all duration-1000 pointer-events-none"
        style={{ background: config.overlayGrad }}
      />

      {/* Ambient Color Grading Glow */}
      {config.tintColor && (
        <div
          className="absolute inset-0 z-2 mix-blend-screen opacity-15 transition-all duration-1000 pointer-events-none"
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
