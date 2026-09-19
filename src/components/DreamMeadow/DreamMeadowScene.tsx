import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { sounds } from '../../utils/audio';

// Poetic, cinematic dialogues between the two lovers in the meadow
const ROMANTIC_WHISPERS = [
  {
    speaker: 'OUTLAW 01',
    text: 'Beyond the sirens of Vinewood and Interpol red notices... this is the only treasure I never want to escape.',
    tag: 'WHISPER · 01',
  },
  {
    speaker: 'OUTLAW 02',
    text: 'They built seven wonders of stone, marble, and gold. But two souls sitting in silence under this moon... that\'s the real eighth wonder.',
    tag: 'WHISPER · 02',
  },
  {
    speaker: 'OUTLAW 01',
    text: 'From the neon highways of Los Santos to the ancient rifts of Bharat, I would cross every dimension again just to sit right here with you.',
    tag: 'WHISPER · 03',
  },
  {
    speaker: 'OUTLAW 02',
    text: 'Listen to the tall grass in the wind. No radar, no helicopters, no bounties. Five billion stars, and you.',
    tag: 'WHISPER · 04',
  },
  {
    speaker: 'OUTLAW 01',
    text: 'Let the syndicates fight for bullion. Some moments were never meant to be stolen—only lived.',
    tag: 'WHISPER · 05',
  },
  {
    speaker: 'OUTLAW 02',
    text: 'If our journey is a wanted poster, your hand in mine is the only reward that ever mattered.',
    tag: 'WHISPER · 06',
  },
];

interface FireflyParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  xDrift: number;
  yDrift: number;
}

interface SparkleClick {
  id: number;
  x: number;
  y: number;
  icon: string;
}

export function DreamMeadowScene() {
  const { setSelectedTemplateId } = useGame();
  const [whisperIndex, setWhisperIndex] = useState(0);
  const [isWhisperOpen, setIsWhisperOpen] = useState(true);
  const [isSerenadePlaying, setIsSerenadePlaying] = useState(false);
  const [wishActive, setWishActive] = useState(false);
  const [heartConstellation, setHeartConstellation] = useState(false);
  const [extraFireflies, setExtraFireflies] = useState<FireflyParticle[]>([]);
  const [clickSparkles, setClickSparkles] = useState<SparkleClick[]>([]);
  const [isTheaterOpen, setIsTheaterOpen] = useState(false);

  const scrollToWonders = useCallback(() => {
    sounds.playClick();
    document.getElementById('section-wonders')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToKolkata = useCallback(() => {
    sounds.playClick();
    document.getElementById('section-kolkata')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Keyboard shortcut [Enter] or [Space] to advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTheaterOpen) {
        setIsTheaterOpen(false);
        return;
      }
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      const section = document.getElementById('section-dream-meadow');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
      if (!inView) return;

      if (e.key === 'Enter' || e.key === ' ') {
        if (e.key === ' ') e.preventDefault();
        scrollToWonders();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTheaterOpen, scrollToWonders]);

  // Web Audio Synth for ambient dream serenade (wind tone + peaceful harmonics)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Base persistent fireflies
  const baseFireflies: FireflyParticle[] = useRef(
    Array.from({ length: 42 }, (_, i) => ({
      id: i,
      x: 10 + ((i * 19) % 80),
      y: 45 + ((i * 13) % 48),
      size: 3 + (i % 4) * 1.5,
      color: ['#bbf7d0', '#fef08a', '#a7f3d0', '#fde047', '#fed7aa'][i % 5],
      duration: 4.5 + (i % 5) * 1.2,
      delay: (i * 0.3) % 4,
      xDrift: ((i % 3) - 1) * 35,
      yDrift: -40 - (i % 4) * 15,
    }))
  ).current;

  // Auto-cycle whispers every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setWhisperIndex(prev => (prev + 1) % ROMANTIC_WHISPERS.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  // Web Audio ambient soothing night serenade synthesizer
  const toggleSerenade = useCallback(() => {
    if (isSerenadePlaying) {
      // Stop
      try {
        oscillatorsRef.current.forEach(osc => osc.stop());
        oscillatorsRef.current = [];
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close();
        }
      } catch {
        // ignore
      }
      setIsSerenadePlaying(false);
    } else {
      // Start ethereal dream synth
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Dream chords: peaceful soft sine waves (E3, B3, G#4, E4 harmonics)
        const freqs = [164.81, 246.94, 329.63, 415.30, 493.88];
        const oscs: OscillatorNode[] = [];

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
          const oscGain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Gentle vibrato
          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          oscGain.gain.setValueAtTime(0.18 / freqs.length, ctx.currentTime);

          if (panner) {
            panner.pan.setValueAtTime((idx % 2 === 0 ? -1 : 1) * 0.35, ctx.currentTime);
            osc.connect(oscGain);
            oscGain.connect(panner);
            panner.connect(masterGain);
          } else {
            osc.connect(oscGain);
            oscGain.connect(masterGain);
          }

          osc.start();
          oscs.push(osc);
        });

        oscillatorsRef.current = oscs;
        setIsSerenadePlaying(true);
        sounds.playClick();
      } catch (err) {
        console.warn('Web Audio Serenade unavailable:', err);
      }
    }
  }, [isSerenadePlaying]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      try {
        oscillatorsRef.current.forEach(osc => osc.stop());
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close();
        }
      } catch {
        // ignore
      }
    };
  }, []);

  // Make a Wish: trigger shooting star
  const handleMakeWish = () => {
    sounds.playClick();
    setWishActive(true);
    setTimeout(() => setWishActive(false), 2400);
  };

  // Summon Firefly Swarm
  const handleSummonFireflies = () => {
    sounds.playClick();
    const batch: FireflyParticle[] = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: 35 + (Math.random() * 30),
      y: 55 + (Math.random() * 25),
      size: 3.5 + Math.random() * 3,
      color: ['#ffd700', '#f472b6', '#a7f3d0', '#fde047'][i % 4],
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 1.5,
      xDrift: (Math.random() - 0.5) * 80,
      yDrift: -120 - Math.random() * 60,
    }));
    setExtraFireflies(batch);
    setTimeout(() => setExtraFireflies([]), 7000);
  };

  // Heart of Starlight
  const handleHeartConstellation = () => {
    sounds.playClick();
    setHeartConstellation(true);
    setTimeout(() => setHeartConstellation(false), 4500);
  };

  // Interactive mouse click creates romantic sparkle
  const handleMeadowClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const icons = ['✨', '💖', '⭐', '💫', '🌙'];
    const newSparkle: SparkleClick = {
      id: Date.now() + Math.random(),
      x,
      y,
      icon: icons[Math.floor(Math.random() * icons.length)],
    };
    setClickSparkles(prev => [...prev.slice(-12), newSparkle]);
    setTimeout(() => {
      setClickSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 1800);
  };

  const currentWhisper = ROMANTIC_WHISPERS[whisperIndex];

  return (
    <div
      onClick={handleMeadowClick}
      className="relative min-h-screen w-full flex flex-col justify-between select-none overflow-hidden bg-[#02020a] text-white pt-20 pb-6 px-4 md:px-12 cursor-pointer"
    >
      {/* 1. MASTER CINEMATIC FULL-BLEED BACKGROUND ARTWORK */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.img
          src="/assets/dream_meadow_gta.jpg"
          alt="The 8th Wonder: Eternal Dream Meadow"
          animate={{
            scale: [1, 1.04, 1],
            x: [0, -12, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-full h-full object-cover object-center"
        />

        {/* Ethereal Luminous Full Moon Halo Bloom */}
        <motion.div
          className="absolute top-[12%] right-[22%] -translate-y-1/2 translate-x-1/2 w-[520px] h-[520px] rounded-full pointer-events-none mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(255,250,230,0.38) 0%, rgba(255,230,160,0.14) 40%, rgba(180,210,255,0.06) 65%, transparent 80%)',
            filter: 'blur(22px)',
          }}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.75, 1, 0.75],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* 2. PARALLAX DRIFTING NIGHT CLOUDS */}
        <motion.div
          className="absolute top-[18%] left-0 w-[200%] h-48 pointer-events-none opacity-35 mix-blend-screen"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(200,225,255,0.3) 0%, rgba(160,190,240,0.1) 50%, transparent 80%)',
            filter: 'blur(30px)',
          }}
          animate={{ x: ['-20%', '10%', '-20%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[28%] left-0 w-[220%] h-56 pointer-events-none opacity-25 mix-blend-screen"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(220,235,255,0.25) 0%, rgba(140,170,230,0.08) 55%, transparent 85%)',
            filter: 'blur(36px)',
          }}
          animate={{ x: ['10%', '-25%', '10%'] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* 3. SHOOTING STAR TRIGGER */}
        <AnimatePresence>
          {wishActive && (
            <motion.div
              initial={{ x: '20vw', y: '10vh', opacity: 1, scale: 0.8 }}
              animate={{ x: '75vw', y: '45vh', opacity: [1, 1, 0], scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="absolute w-36 h-[2.5px] origin-left rotate-[32deg] pointer-events-none mix-blend-screen"
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, #fef08a 35%, #f472b6 70%, transparent 100%)',
                boxShadow: '0 0 15px #fef08a, 0 0 30px #ffffff',
              }}
            />
          )}
        </AnimatePresence>

        {/* 4. HEART CONSTELLATION OVER THE MEADOW */}
        <AnimatePresence>
          {heartConstellation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 3.5, ease: 'easeInOut' }}
              className="absolute top-[26%] left-[34%] -translate-x-1/2 pointer-events-none flex flex-col items-center gap-1 z-20"
            >
              <div
                className="text-6xl text-pink-300 drop-shadow-[0_0_35px_#f472b6] animate-pulse"
                style={{ textShadow: '0 0 20px #f472b6, 0 0 45px #ec4899' }}
              >
                💖
              </div>
              <span className="font-game text-[11px] text-pink-200 tracking-widest font-bold px-2 py-0.5 rounded bg-black/60 border border-pink-400/40">
                ★ CONSTELLATION OF TRUE OUTLAWS ★
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. LIVING DANCING BIOLUMINESCENT FIREFLIES */}
        {baseFireflies.map(f => (
          <motion.div
            key={f.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: f.size,
              height: f.size,
              backgroundColor: f.color,
              boxShadow: `0 0 10px ${f.color}, 0 0 20px ${f.color}`,
            }}
            animate={{
              y: [0, f.yDrift, f.yDrift * 0.4, f.yDrift * 0.8, 0],
              x: [0, f.xDrift, -f.xDrift * 0.6, f.xDrift * 0.8, 0],
              opacity: [0.25, 0.95, 0.4, 1, 0.25],
              scale: [0.8, 1.35, 0.9, 1.2, 0.8],
            }}
            transition={{
              duration: f.duration,
              delay: f.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Extra Summoned Fireflies */}
        {extraFireflies.map(f => (
          <motion.div
            key={f.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: f.size,
              height: f.size,
              backgroundColor: f.color,
              boxShadow: `0 0 14px ${f.color}, 0 0 28px ${f.color}`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              y: [0, f.yDrift],
              x: [0, f.xDrift],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.5, 0.8],
            }}
            transition={{
              duration: f.duration,
              delay: f.delay,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Interactive Click Sparkles */}
        {clickSparkles.map(s => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ opacity: 0, scale: 1.8, y: -45 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            style={{ left: s.x, top: s.y }}
            className="absolute text-xl pointer-events-none select-none z-30"
          >
            {s.icon}
          </motion.div>
        ))}

        {/* Cinematic Vignette Gradients (Keeps center unobstructed) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(2,2,10,0.85) 0%, rgba(2,2,10,0.15) 30%, rgba(2,2,10,0.15) 70%, rgba(2,2,10,0.92) 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(2,2,10,0.8) 100%)',
          }}
        />
      </div>

      {/* TOP HEADER: Chapter Badge + Celestial Bounty + Ambient Serenade Button */}
      <div className="relative z-20 w-full flex flex-wrap items-center justify-between gap-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-pink-400 animate-pulse shadow-[0_0_12px_#ec4899]" />
          <span className="hud-element text-pink-300 text-xs md:text-sm tracking-[0.35em] font-bold">
            ★ CHAPTER 08: THE 8TH WONDER OF THE WORLD // UNCHARTED SANCTUARY ★
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio Serenade Synthesizer */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSerenade();
            }}
            className={`glass-panel px-3.5 py-1.5 border flex items-center gap-2 cursor-pointer transition-all ${
              isSerenadePlaying
                ? 'border-pink-400 bg-pink-950/70 text-pink-200 shadow-[0_0_16px_rgba(236,72,153,0.6)]'
                : 'border-white/20 hover:border-pink-300 text-white/80 hover:text-white bg-black/70'
            }`}
            title="Toggle Ambient Moonlight Serenade (Synthesized via Web Audio)"
          >
            <span>{isSerenadePlaying ? '🔊' : '🎵'}</span>
            <span className="font-game text-xs font-bold">
              {isSerenadePlaying ? 'SERENADE PLAYING' : 'MOONLIGHT SERENADE'}
            </span>
          </button>

          {/* Bounty Tag */}
          <div className="glass-panel px-3.5 py-1.5 border border-pink-500/50 flex items-center gap-2 bg-black/70 backdrop-blur-md">
            <span className="font-game text-[10px] sm:text-[11px] text-white/70">BOUNTY VALUATION:</span>
            <span className="font-cinematic text-base sm:text-lg text-pink-300" style={{ textShadow: '0 0 12px #ec4899' }}>
              PRICELESS / UNCONDITIONAL
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsWhisperOpen(prev => !prev);
            }}
            className={`glass-panel px-3 py-1.5 text-xs font-game border flex items-center gap-1.5 cursor-pointer transition-all ${
              isWhisperOpen
                ? 'border-pink-400 bg-pink-950/60 text-pink-200'
                : 'border-white/20 hover:border-pink-300 text-white/80 hover:text-white bg-black/70'
            }`}
            title="Toggle Romantic Whispers"
          >
            <span>💬</span>
            <span className="hidden sm:inline">{isWhisperOpen ? 'HIDE WHISPERS' : 'SHOW WHISPERS'}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsTheaterOpen(true);
            }}
            className="glass-panel px-3 py-1.5 text-xs font-game border border-white/20 hover:border-pink-300 text-white/80 hover:text-white cursor-pointer transition-all flex items-center gap-1.5 bg-black/70"
            title="Open 4K Moonlight Theater"
          >
            <span>⛶</span>
            <span className="hidden sm:inline">4K VIEW</span>
          </button>
        </div>
      </div>

      {/* CENTER AREA: Kept 100% CLEAR so lovers, moon, clouds & grassland are unobstructed */}
      <div className="relative z-10 my-auto pointer-events-none flex flex-col items-center justify-center text-center">
        {/* Subtle Ethereal Watermark Title at Center-Bottom of Horizon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="select-none"
        >
          <span className="font-game text-xs text-pink-300/80 tracking-[0.4em] font-bold uppercase block mb-1">
            THE UNCOPIABLE WONDER
          </span>
          <h1
            className="font-cinematic text-3xl sm:text-5xl md:text-6xl text-white tracking-widest"
            style={{
              textShadow: '0 4px 30px rgba(0,0,0,1), 0 0 45px rgba(236,72,153,0.5)',
            }}
          >
            ETERNAL DREAM MEADOW
          </h1>
          <p className="font-game text-xs sm:text-sm text-pink-100/70 max-w-lg mx-auto mt-1 tracking-wider">
            Valley of Whispers · Under the Full Moon with Two Outlaws
          </p>
        </motion.div>
      </div>

      {/* ROMANTIC WHISPERS & MAGIC PANEL: Positioned at Bottom-Right out of the way of Moon & Outlaws */}
      <div
        onClick={e => e.stopPropagation()}
        className="absolute bottom-28 right-4 sm:right-8 md:right-12 z-30 max-w-xs sm:max-w-sm pointer-events-auto"
      >
        <AnimatePresence mode="wait">
          {isWhisperOpen ? (
            <motion.div
              key={whisperIndex}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-950/92 backdrop-blur-2xl p-4 sm:p-5 rounded-2xl border border-pink-500/40 shadow-[0_15px_45px_rgba(0,0,0,0.9)] space-y-3"
              style={{
                borderLeft: '4px solid #ec4899',
                boxShadow: '0 0 30px rgba(236,72,153,0.3), 0 20px 40px rgba(0,0,0,0.9)',
              }}
            >
              {/* Intel Card Header with Next & Minimize */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌙</span>
                  <span className="font-game text-[10px] tracking-widest font-bold px-2 py-0.5 rounded bg-pink-950/80 text-pink-300 border border-pink-500/40">
                    {currentWhisper.tag}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setWhisperIndex((prev) => (prev + 1) % ROMANTIC_WHISPERS.length);
                    }}
                    className="font-game text-[10px] text-pink-300 hover:text-white px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer transition-all"
                    title="Next Dialogue"
                  >
                    NEXT ›
                  </button>
                  <button
                    onClick={() => setIsWhisperOpen(false)}
                    className="font-game text-[10px] text-white/50 hover:text-white px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 border border-white/10 cursor-pointer transition-all"
                    title="Minimize Whispers"
                  >
                    HIDE ▾
                  </button>
                </div>
              </div>

              {/* Speaker & Dialogue */}
              <div>
                <div className="font-game text-[11px] text-pink-400 font-bold uppercase tracking-wider mb-1">
                  {currentWhisper.speaker}
                </div>
                <p className="font-game text-xs sm:text-sm text-white font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                  "{currentWhisper.text}"
                </p>
              </div>

              {/* Interactive Romantic Moments Buttons */}
              <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2">
                <button
                  onClick={handleMakeWish}
                  className="text-[11px] font-game px-2.5 py-1.5 rounded-lg bg-pink-900/40 hover:bg-pink-800/60 border border-pink-400/40 text-pink-200 hover:text-white font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(236,72,153,0.3)]"
                  title="Trigger Shooting Star"
                >
                  <span>💫</span>
                  <span>MAKE A WISH</span>
                </button>

                <button
                  onClick={handleSummonFireflies}
                  className="text-[11px] font-game px-2.5 py-1.5 rounded-lg bg-amber-900/40 hover:bg-amber-800/60 border border-amber-400/40 text-amber-200 hover:text-white font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                  title="Release 30 Radiant Fireflies"
                >
                  <span>✨</span>
                  <span>SWARM FIREFLIES</span>
                </button>

                <button
                  onClick={handleHeartConstellation}
                  className="text-[11px] font-game px-2.5 py-1.5 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 border border-purple-400/40 text-purple-200 hover:text-white font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                  title="Illuminate Heart Constellation"
                >
                  <span>💖</span>
                  <span>HEART STAR</span>
                </button>
              </div>

              {/* Call to Action: Unlayer Poster Lab */}
              <button
                onClick={() => {
                  sounds.playClick();
                  setSelectedTemplateId('dream-meadow');
                  document.getElementById('section-editor')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full game-btn-purple text-xs py-2 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(236,72,153,0.6)]"
              >
                <span>🎨</span>
                <span className="font-bold tracking-wider">
                  FORGE MOONLIGHT POSTER IN CRIME LAB
                </span>
              </button>
            </motion.div>
          ) : (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setIsWhisperOpen(true)}
              className="ml-auto glass-panel px-4 py-2 rounded-xl border border-pink-400/50 bg-neutral-950/90 hover:bg-neutral-900 text-pink-200 hover:text-white flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all"
            >
              <span className="text-base">🌙</span>
              <span className="font-game text-xs font-bold tracking-wider">OUTLAW WHISPERS & MAGIC</span>
              <span className="text-[10px] text-pink-300 font-mono px-1.5 py-0.5 rounded bg-pink-900/60">
                OPEN ▴
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM ACTION CONTROLS: Identical layout to Mumbai, Delhi, and Kolkata scenes */}
      <div
        onClick={e => e.stopPropagation()}
        className="relative z-30 flex flex-col items-center gap-2 mt-auto"
      >
        <motion.button
          onClick={scrollToWonders}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="game-btn-purple px-10 py-4 text-base md:text-lg flex items-center gap-3 cursor-pointer shadow-[0_0_40px_rgba(236,72,153,0.85)] border border-pink-400/50"
        >
          <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs border border-white/30 font-bold text-pink-300">
            ENTER / SPACE
          </span>
          <span className="font-bold tracking-wider">RAID THE 7 WONDERS HEIST BOARD [SCROLL DOWN] →</span>
        </motion.button>

        <div className="flex items-center gap-4 text-[11px] font-game text-white/50 tracking-widest">
          <button
            onClick={scrollToKolkata}
            className="text-white/40 hover:text-pink-300 transition-colors cursor-pointer"
          >
            ‹ BACK TO KOLKATA
          </button>
          <span>•</span>
          <span>VALLEY OF WHISPERS // NEXT CHECKPOINT: INTERPOL RED NOTICE BOARD</span>
          <span>•</span>
          <span className="text-pink-300/60 hidden sm:inline">CLICK SCREEN FOR SPARKS</span>
        </div>
      </div>

      {/* FULLSCREEN 4K ROMANTIC THEATER LIGHTBOX */}
      <AnimatePresence>
        {isTheaterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col justify-between p-6 select-none"
            onClick={() => setIsTheaterOpen(false)}
          >
            <div className="flex items-center justify-between z-10" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌙</span>
                <div>
                  <div className="font-cinematic text-3xl text-white tracking-wider">
                    THE 8TH WONDER: ETERNAL DREAM MEADOW
                  </div>
                  <div className="font-game text-xs text-pink-300/70">
                    Valley of Whispers · Priceless Sanctuary
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/assets/dream_meadow_gta.jpg"
                  download="8th_wonder_dream_meadow_gta.jpg"
                  className="game-btn-orange text-xs px-4 py-2 font-bold cursor-pointer"
                  onClick={e => e.stopPropagation()}
                >
                  ⬇ DOWNLOAD 4K ARTWORK
                </a>

                <button
                  onClick={() => setIsTheaterOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/30 text-white flex items-center justify-center font-bold text-lg cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div
              className="relative my-auto max-w-6xl w-full mx-auto rounded-xl overflow-hidden shadow-2xl border border-pink-500/30"
              onClick={e => e.stopPropagation()}
            >
              <img
                src="/assets/dream_meadow_gta.jpg"
                alt="Eternal Dream Meadow 4K"
                className="w-full max-h-[78vh] object-contain mx-auto bg-black"
              />
            </div>

            <div className="flex items-center justify-between z-10 text-xs font-game text-white/60" onClick={e => e.stopPropagation()}>
              <span>THE ONLY HEIST YOU NEVER WANT TO ESCAPE</span>
              <button
                onClick={() => {
                  setIsTheaterOpen(false);
                  setSelectedTemplateId('dream-meadow');
                  document.getElementById('section-editor')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="game-btn-purple text-xs px-6 py-2 font-bold cursor-pointer"
              >
                🎨 EDIT IN UNLAYER POSTER STUDIO
              </button>
              <span className="text-pink-300">★ 5 STARS IMMORTAL VALUATION</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
