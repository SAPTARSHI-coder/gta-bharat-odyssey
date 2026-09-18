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
  'section-landing':    { location: 'DEL PERRO PIER, LOS SANTOS', zone: 'beach' },
  'section-character':  { location: 'LSPD BOOKING // RAP SHEET', zone: 'urban' },
  'section-los-santos': { location: '2-STAR HEAT · DEL PERRO',   zone: 'beach' },
  'section-portal':     { location: 'COSMIC SINGULARITY [RIFT]', zone: 'gateway' },
  'section-mumbai':     { location: 'COLABA HARBOR, MUMBAI',     zone: 'beach' },
  'section-delhi':      { location: 'KARTAVYA PATH, NEW DELHI',  zone: 'monument' },
  'section-kolkata':    { location: 'VICTORIA MEMORIAL, WB',     zone: 'monument' },
  'section-wonders':    { location: 'INTERPOL RED NOTICE BOARD', zone: 'monument' },
  'section-editor':     { location: 'UNLAYER CRIME LAB STUDIO',  zone: 'urban' },
  'section-final':      { location: 'MISSION PASSED // BLEETER', zone: 'monument' },
};

const SECTION_MISSION: Record<string, { title: string; subtitle?: string; badge: string }> = {
  'section-character': {
    badge: '★ MISSION: FORGE YOUR RAP SHEET ★',
    title: 'Create your criminal alias.',
    subtitle: 'Pick street threads, assign heist skills, and write your police record.',
  },
  'section-los-santos': {
    badge: '★ MISSION: DITCH THE VINEWOOD HEAT ★',
    title: 'Sirens blaring on Del Perro.',
    subtitle: 'Police cruisers closing the net. Find the alley anomaly before you get cuffed.',
  },
  'section-portal': {
    badge: '★ MISSION: PUNCH THE RIFT ★',
    title: 'Press E to jump the singularity.',
    subtitle: 'Space-time torn in two. No radar, no rules. Warp coordinates set to Bharat.',
  },
  'section-mumbai': {
    badge: '★ MISSION: MAXIMUM CITY TAKEOVER ★',
    title: 'Touchdown on Colaba Pier.',
    subtitle: 'Taj Mahal Palace, Arabian Sea, and 21 million hustlers. Blend into the madness.',
  },
  'section-delhi': {
    badge: '★ MISSION: CORRIDORS OF POWER ★',
    title: 'Cut through Kartavya Path.',
    subtitle: 'Ten lanes of VIP asphalt, armed commandos, and the eternal flame at India Gate.',
  },
  'section-kolkata': {
    badge: '★ MISSION: REBEL CITY SAFEHOUSE ★',
    title: 'Victoria Memorial heist ground.',
    subtitle: 'Yellow taxis, colonial marble, and the Howrah Bridge. Your rep is international.',
  },
  'section-wonders': {
    badge: '★ MISSION: INTERPOL RED NOTICES ★',
    title: 'Seven planetary heist targets.',
    subtitle: 'The rift tore open seven world wonders. Select your target and collect the bounty.',
  },
  'section-editor': {
    badge: '★ MISSION: FORGE YOUR MUGSHOT ★',
    title: 'Powered by @unlayer/react-image-editor.',
    subtitle: 'Slap on high-contrast filters, text typography, and fake passport stamps.',
  },
  'section-final': {
    badge: '★ MISSION PASSED ★ RESPECT +100 ★',
    title: 'Most Wanted across two dimensions.',
    subtitle: 'Download your 4K poster. Leak it to Bleeter. Let the federals seethe.',
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
