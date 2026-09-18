import React, { useState, useEffect, useRef } from 'react';
import { useGame } from './context/GameContext';
import { Landing } from './components/Landing/Landing';
import { CharacterCreator } from './components/CharacterCreator/CharacterCreator';
import { LosSantosScene } from './components/LosSantosScene/LosSantosScene';
import { Portal } from './components/Portal/Portal';
import { MumbaiScene } from './components/MumbaiScene/MumbaiScene';
import { DelhiScene } from './components/DelhiScene/DelhiScene';
import { KolkataScene } from './components/KolkataScene/KolkataScene';
import { SevenWondersBoard } from './components/SevenWonders/SevenWondersBoard';
import { JourneyEditor } from './components/JourneyEditor/JourneyEditor';
import { FinalShare } from './components/FinalShare/FinalShare';
import { HatomBackgroundManager } from './components/shared/HatomBackgroundManager';
import { HatomTopBar } from './components/HUD/HatomTopBar';
import { HatomNavRail, CHAPTERS } from './components/HUD/HatomNavRail';
import { GTAMinimap } from './components/HUD/GTAMinimap';
import { GTAMissionBox } from './components/HUD/GTAMissionBox';

const SECTION_MINIMAP: Record<string, { location: string; zone: 'beach' | 'urban' | 'monument' | 'gateway' }> = {
  'section-landing':    { location: 'PACIFIC COAST, LS',       zone: 'beach' },
  'section-character':  { location: 'CUSTOMIZATION LAB',       zone: 'urban' },
  'section-los-santos': { location: 'DEL PERRO BEACH, LS',     zone: 'beach' },
  'section-portal':     { location: 'COSMIC RIFT [ANOMALY]',   zone: 'gateway' },
  'section-mumbai':     { location: 'COLABA HARBOR, MUMBAI',   zone: 'beach' },
  'section-delhi':      { location: 'KARTAVYA PATH, DELHI',    zone: 'monument' },
  'section-kolkata':    { location: 'VICTORIA MEMORIAL, WB',   zone: 'monument' },
  'section-wonders':    { location: 'GLOBAL WANTED BOARD',     zone: 'monument' },
  'section-editor':     { location: 'REACT IMAGE EDITOR',      zone: 'urban' },
  'section-final':      { location: 'MISSION DEBRIEF',         zone: 'monument' },
};

const SECTION_MISSION: Record<string, { title: string; subtitle?: string; badge: string }> = {
  'section-character': {
    badge: 'STAGE 1: BUILD YOUR CRIMINAL',
    title: 'Construct your operative.',
    subtitle: 'Street alias, look, origins, and skill allocation. Make it count.',
  },
  'section-los-santos': {
    badge: 'STAGE 2: DEL PERRO, LOS SANTOS',
    title: 'Something strange near the pier.',
    subtitle: 'Pacific waves, five-star heat, and an anomaly you can\'t explain.',
  },
  'section-portal': {
    badge: 'STAGE 3: THE DIMENSIONAL RIFT',
    title: 'Press E to jack the rift.',
    subtitle: 'GPS reads: DESTINATION UNKNOWN. Warp coordinates set to Bharat.',
  },
  'section-mumbai': {
    badge: 'STAGE 4: COLABA HARBOR, MUMBAI',
    title: 'Maximum City. New rules.',
    subtitle: 'Gateway of India & Taj Mahal Palace across the Arabian Sea.',
  },
  'section-delhi': {
    badge: 'STAGE 5: KARTAVYA PATH, NEW DELHI',
    title: 'The seat of power.',
    subtitle: 'India Gate burns eternal at the end of the most famous road in Bharat.',
  },
  'section-kolkata': {
    badge: 'STAGE 6: VICTORIA MEMORIAL, KOLKATA',
    title: 'End of the road. Start of the legend.',
    subtitle: 'City of Joy. Marble. History. Your final chapter awaits.',
  },
  'section-wonders': {
    badge: 'STAGE 7: 7 WONDERS OF THE WORLD',
    title: 'Global heists unlocked.',
    subtitle: 'The rift shattered reality across 7 global landmarks. Choose your target.',
  },
  'section-editor': {
    badge: 'STAGE 8: UNLAYER POSTER STUDIO',
    title: 'Stamp your legend.',
    subtitle: 'Customize your wanted poster with Unlayer React Image Editor.',
  },
  'section-final': {
    badge: 'STAGE 9: MISSION DEBRIEF',
    title: 'Five-star legend unlocked.',
    subtitle: 'Download your poster. Share your legacy. The world needs to know.',
  },
};

export default function App() {
  const { currentScene } = useGame();
  const [activeSectionId, setActiveSectionId] = useState<string>('section-landing');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to target section
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll Progress & Active Section Observer (Hatom Style)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Detect which section is currently centered in the viewport
      const center = window.scrollY + window.innerHeight * 0.45;
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el && el.offsetTop <= center) {
          setActiveSectionId(CHAPTERS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const minimapInfo = SECTION_MINIMAP[activeSectionId] || SECTION_MINIMAP['section-los-santos'];
  const missionInfo = SECTION_MISSION[activeSectionId];

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white">
      {/* 1. Hatom-Style Fixed Background Manager with Seamless Cross-Fading */}
      <HatomBackgroundManager activeSectionId={activeSectionId} />

      {/* 2. Top Navigation & Progress Bar */}
      <HatomTopBar
        activeSectionId={activeSectionId}
        progressPercent={scrollProgress}
        onNavigate={handleScrollToSection}
      />

      {/* 3. Right-Side Vertical Chapter Rail (Hatom Awwwards Style) */}
      <HatomNavRail
        activeSectionId={activeSectionId}
        scrollProgress={scrollProgress / 100}
        onSelectChapter={handleScrollToSection}
      />

      {/* 4. Pinned Dynamic GTA Minimap (visible across gameplay sections) */}
      {activeSectionId !== 'section-landing' && activeSectionId !== 'section-character' && (
        <GTAMinimap
          locationName={minimapInfo.location}
          zoneType={minimapInfo.zone}
        />
      )}

      {/* 5. Pinned Dynamic GTA Mission Box (slides in when entering a chapter) */}
      {missionInfo && (
        <GTAMissionBox
          key={activeSectionId}
          badge={missionInfo.badge}
          title={missionInfo.title}
          subtitle={missionInfo.subtitle}
        />
      )}

      {/* 6. Continuous Vertical Scrollytelling Sections */}
      <main className="relative z-10 w-full flex flex-col">
        {/* Section 01: Landing Cover */}
        <section id="section-landing" className="relative w-full min-h-screen">
          <Landing />
        </section>

        {/* Section 02: Character Customization */}
        <section id="section-character" className="relative w-full min-h-screen">
          <CharacterCreator />
        </section>

        {/* Section 03: Los Santos Beach */}
        <section id="section-los-santos" className="relative w-full min-h-screen">
          <LosSantosScene />
        </section>

        {/* Section 04: The Cosmic Portal */}
        <section id="section-portal" className="relative w-full min-h-screen">
          <Portal />
        </section>

        {/* Section 05: Mumbai Gateway & Taj Palace */}
        <section id="section-mumbai" className="relative w-full min-h-screen">
          <MumbaiScene />
        </section>

        {/* Section 06: New Delhi India Gate */}
        <section id="section-delhi" className="relative w-full min-h-screen">
          <DelhiScene />
        </section>

        {/* Section 07: Kolkata Victoria Memorial */}
        <section id="section-kolkata" className="relative w-full min-h-screen">
          <KolkataScene />
        </section>

        {/* Section 08: Seven Wonders Global Wanted Board */}
        <section id="section-wonders" className="relative w-full min-h-screen">
          <SevenWondersBoard />
        </section>

        {/* Section 09: Unlayer React Image Editor Studio */}
        <section id="section-editor" className="relative w-full min-h-screen">
          <JourneyEditor />
        </section>

        {/* Section 10: Final Share & Debrief */}
        <section id="section-final" className="relative w-full min-h-screen">
          <FinalShare />
        </section>
      </main>
    </div>
  );
}
