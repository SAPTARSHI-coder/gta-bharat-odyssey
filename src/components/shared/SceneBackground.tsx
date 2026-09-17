import React, { useEffect, useRef } from 'react';

interface ParallaxBgProps {
  scene: 'los-santos' | 'mumbai' | 'delhi' | 'portal';
}

// SVG-based scene backgrounds - no external images needed
const scenes = {
  'los-santos': `
    <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0a0015"/>
          <stop offset="30%" stop-color="#1a0030"/>
          <stop offset="55%" stop-color="#5a1060"/>
          <stop offset="75%" stop-color="#c04020"/>
          <stop offset="90%" stop-color="#ff8c35"/>
          <stop offset="100%" stop-color="#ffb84d"/>
        </linearGradient>
        <linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a3060"/>
          <stop offset="100%" stop-color="#0a1830"/>
        </linearGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="2"/></filter>
        <radialGradient id="sun" cx="70%" cy="72%" r="15%">
          <stop offset="0%" stop-color="#fff5cc" stop-opacity="0.9"/>
          <stop offset="40%" stop-color="#ffb84d" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#ff6b35" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Sky -->
      <rect width="1440" height="900" fill="url(#sky)"/>
      <!-- Sun glow -->
      <ellipse cx="1010" cy="648" rx="200" ry="100" fill="url(#sun)"/>
      <!-- Distant skyline silhouette -->
      <g fill="#0a0020" opacity="0.8">
        <rect x="0" y="500" width="80" height="200"/>
        <rect x="20" y="460" width="40" height="240"/>
        <rect x="80" y="520" width="60" height="180"/>
        <rect x="100" y="490" width="30" height="210"/>
        <rect x="150" y="480" width="50" height="220"/>
        <rect x="170" y="450" width="25" height="250"/>
        <rect x="900" y="490" width="70" height="210"/>
        <rect x="920" y="460" width="35" height="240"/>
        <rect x="960" y="510" width="55" height="190"/>
        <rect x="1050" y="470" width="80" height="230"/>
        <rect x="1070" y="440" width="40" height="260"/>
        <rect x="1140" y="500" width="60" height="200"/>
        <rect x="1200" y="480" width="45" height="220"/>
        <rect x="1260" y="470" width="70" height="230"/>
        <rect x="1300" y="450" width="30" height="250"/>
        <rect x="1350" y="490" width="90" height="210"/>
      </g>
      <!-- Palm trees left -->
      <g fill="#0d1a0a">
        <rect x="100" y="580" width="12" height="200" rx="4"/>
        <ellipse cx="106" cy="578" rx="50" ry="20" fill="#0d2a0a"/>
        <ellipse cx="106" cy="568" rx="40" ry="15" fill="#0d2a0a" transform="rotate(-20,106,568)"/>
        <ellipse cx="106" cy="573" rx="40" ry="15" fill="#0d2a0a" transform="rotate(20,106,573)"/>
        <rect x="250" y="560" width="10" height="180" rx="4"/>
        <ellipse cx="255" cy="558" rx="45" ry="18" fill="#0d2a0a"/>
        <ellipse cx="255" cy="548" rx="35" ry="13" fill="#0d2a0a" transform="rotate(-25,255,548)"/>
        <ellipse cx="255" cy="553" rx="35" ry="13" fill="#0d2a0a" transform="rotate(25,255,553)"/>
      </g>
      <!-- Palm trees right -->
      <g fill="#0d1a0a">
        <rect x="1300" y="570" width="12" height="200" rx="4"/>
        <ellipse cx="1306" cy="568" rx="50" ry="20" fill="#0d2a0a"/>
        <ellipse cx="1306" cy="558" rx="40" ry="15" fill="#0d2a0a" transform="rotate(-20,1306,558)"/>
        <ellipse cx="1306" cy="563" rx="40" ry="15" fill="#0d2a0a" transform="rotate(20,1306,563)"/>
      </g>
      <!-- Ocean -->
      <rect x="0" y="700" width="1440" height="200" fill="url(#ocean)"/>
      <!-- Ocean shimmer -->
      <rect x="900" y="700" width="300" height="200" fill="url(#sun)" opacity="0.3"/>
      <!-- Road -->
      <rect x="0" y="750" width="1440" height="150" fill="#0a0a0a"/>
      <rect x="690" y="760" width="60" height="20" fill="#555" rx="2"/>
      <rect x="690" y="800" width="60" height="20" fill="#555" rx="2"/>
      <rect x="690" y="840" width="60" height="20" fill="#555" rx="2"/>
      <!-- Beach sand -->
      <rect x="0" y="690" width="1440" height="70" fill="#c8a96e" opacity="0.4"/>
      <!-- Neon sign hints -->
      <rect x="300" y="490" width="8" height="80" fill="#ff2d87" opacity="0.8"/>
      <rect x="320" y="510" width="8" height="60" fill="#b347ff" opacity="0.8"/>
      <rect x="1100" y="480" width="8" height="70" fill="#00f5ff" opacity="0.6"/>
    </svg>
  `,
  'mumbai': `
    <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="msky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#05001a"/>
          <stop offset="40%" stop-color="#120030"/>
          <stop offset="70%" stop-color="#2a1050"/>
          <stop offset="90%" stop-color="#ff9933" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#ffb84d" stop-opacity="0.6"/>
        </linearGradient>
        <radialGradient id="mglow" cx="50%" cy="60%" r="30%">
          <stop offset="0%" stop-color="#ff9933" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
      </defs>
      <!-- Sky -->
      <rect width="1440" height="900" fill="url(#msky)"/>
      <!-- Glow -->
      <ellipse cx="720" cy="540" rx="400" ry="200" fill="url(#mglow)"/>
      <!-- Gateway of India inspired arch -->
      <g fill="#1a0a00" opacity="0.9">
        <!-- Main arch -->
        <rect x="580" y="400" width="280" height="300"/>
        <rect x="560" y="380" width="320" height="40"/>
        <!-- Arch cutout -->
        <ellipse cx="720" cy="460" rx="80" ry="100" fill="#05001a"/>
        <!-- Side towers -->
        <rect x="550" y="360" width="50" height="340"/>
        <rect x="840" y="360" width="50" height="340"/>
        <!-- Tower tops -->
        <polygon points="550,360 575,320 600,360" fill="#1a0a00"/>
        <polygon points="840,360 865,320 890,360" fill="#1a0a00"/>
        <!-- Dome -->
        <ellipse cx="720" cy="380" rx="100" ry="60" fill="#1a0a00"/>
        <ellipse cx="720" cy="360" rx="60" ry="40" fill="#1a0a00"/>
      </g>
      <!-- Taj Mahal Palace Hotel inspired building -->
      <g fill="#0a0515" opacity="0.85">
        <rect x="200" y="450" width="300" height="350"/>
        <rect x="240" y="430" width="40" height="40"/>
        <rect x="300" y="420" width="40" height="50"/>
        <rect x="360" y="430" width="40" height="40"/>
        <ellipse cx="310" cy="420" rx="30" ry="30" fill="#0a0515"/>
      </g>
      <!-- City buildings right -->
      <g fill="#050010" opacity="0.9">
        <rect x="950" y="380" width="80" height="420"/>
        <rect x="1040" y="420" width="60" height="380"/>
        <rect x="1110" y="400" width="90" height="400"/>
        <rect x="1210" y="440" width="70" height="360"/>
        <rect x="1290" y="390" width="100" height="410"/>
        <rect x="1400" y="430" width="80" height="370"/>
      </g>
      <!-- Neon lights on buildings -->
      <rect x="960" y="400" width="4" height="60" fill="#ff9933" opacity="0.8"/>
      <rect x="1050" y="440" width="4" height="50" fill="#ff9933" opacity="0.6"/>
      <rect x="1120" y="420" width="4" height="70" fill="#ff9933" opacity="0.7"/>
      <!-- Water / waterfront -->
      <rect x="0" y="760" width="1440" height="140" fill="#05010a"/>
      <rect x="600" y="760" width="400" height="140" fill="#ff9933" opacity="0.05"/>
      <!-- Indian flag colors subtle hint -->
      <rect x="0" y="890" width="1440" height="4" fill="#ff9933"/>
      <rect x="0" y="894" width="1440" height="4" fill="#ffffff"/>
      <rect x="0" y="898" width="1440" height="4" fill="#138808"/>
    </svg>
  `,
  'delhi': `
    <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#00001a"/>
          <stop offset="40%" stop-color="#0a0020"/>
          <stop offset="70%" stop-color="#15004a"/>
          <stop offset="90%" stop-color="#8b1a00"/>
          <stop offset="100%" stop-color="#ff6b00"/>
        </linearGradient>
        <radialGradient id="dglow" cx="50%" cy="75%" r="25%">
          <stop offset="0%" stop-color="#ff6b00" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#dsky)"/>
      <ellipse cx="720" cy="675" rx="350" ry="150" fill="url(#dglow)"/>
      <!-- India Gate inspired monument -->
      <g fill="#0d0005" opacity="0.95">
        <!-- Main arch -->
        <rect x="640" y="380" width="160" height="420"/>
        <!-- Arch cutout -->
        <ellipse cx="720" cy="480" rx="50" ry="70" fill="#00001a"/>
        <!-- Top arch layer -->
        <rect x="620" y="360" width="200" height="40"/>
        <rect x="600" y="340" width="240" height="30"/>
        <!-- Side pillars -->
        <rect x="600" y="340" width="40" height="460"/>
        <rect x="800" y="340" width="40" height="460"/>
        <!-- Top dome/platform -->
        <rect x="680" y="300" width="80" height="70"/>
        <rect x="660" y="280" width="120" height="30"/>
        <!-- Flame/light on top -->
        <ellipse cx="720" cy="278" rx="15" ry="20" fill="#ff6b00" opacity="0.9"/>
        <ellipse cx="720" cy="268" rx="8" ry="14" fill="#ff9933" opacity="0.9"/>
      </g>
      <!-- Rajpath road leading to gate -->
      <polygon points="580,900 860,900 780,800 660,800" fill="#0a0005" opacity="0.8"/>
      <!-- Flanking buildings -->
      <g fill="#050005" opacity="0.8">
        <rect x="0" y="500" width="200" height="400"/>
        <rect x="1240" y="500" width="200" height="400"/>
        <rect x="1100" y="520" width="150" height="380"/>
        <rect x="180" y="530" width="150" height="370"/>
      </g>
      <!-- Stars -->
      <g fill="white">
        <circle cx="100" cy="80" r="1.5" opacity="0.8"/>
        <circle cx="250" cy="50" r="1" opacity="0.6"/>
        <circle cx="400" cy="120" r="1.5" opacity="0.7"/>
        <circle cx="600" cy="60" r="1" opacity="0.5"/>
        <circle cx="800" cy="90" r="1.5" opacity="0.8"/>
        <circle cx="1000" cy="40" r="1" opacity="0.6"/>
        <circle cx="1200" cy="80" r="1.5" opacity="0.7"/>
        <circle cx="1380" cy="100" r="1" opacity="0.5"/>
        <circle cx="150" cy="200" r="1" opacity="0.4"/>
        <circle cx="350" cy="180" r="1.5" opacity="0.6"/>
        <circle cx="550" cy="140" r="1" opacity="0.5"/>
        <circle cx="750" cy="160" r="1.5" opacity="0.7"/>
        <circle cx="950" cy="120" r="1" opacity="0.4"/>
        <circle cx="1150" cy="170" r="1.5" opacity="0.6"/>
        <circle cx="1350" cy="150" r="1" opacity="0.5"/>
      </g>
      <!-- Ground -->
      <rect x="0" y="790" width="1440" height="110" fill="#050005"/>
      <!-- Flag strip -->
      <rect x="0" y="896" width="1440" height="3" fill="#ff9933"/>
      <rect x="0" y="899" width="1440" height="3" fill="#138808"/>
    </svg>
  `,
  'portal': `
    <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="portalBg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1a0030"/>
          <stop offset="60%" stop-color="#0a0015"/>
          <stop offset="100%" stop-color="#000005"/>
        </radialGradient>
        <radialGradient id="portalCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="20%" stop-color="#e0c0ff"/>
          <stop offset="50%" stop-color="#8800ff"/>
          <stop offset="80%" stop-color="#4400aa"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#portalBg)"/>
      <!-- Stars scattered -->
      <g fill="white" opacity="0.6">
        <circle cx="100" cy="100" r="1.5"/><circle cx="300" cy="200" r="1"/><circle cx="500" cy="80" r="1.5"/>
        <circle cx="700" cy="150" r="1"/><circle cx="900" cy="60" r="1.5"/><circle cx="1100" cy="180" r="1"/>
        <circle cx="1300" cy="90" r="1.5"/><circle cx="200" cy="400" r="1"/><circle cx="1200" cy="350" r="1.5"/>
        <circle cx="50" cy="600" r="1"/><circle cx="1400" cy="500" r="1.5"/><circle cx="150" cy="750" r="1"/>
        <circle cx="1350" cy="700" r="1.5"/>
      </g>
      <!-- Portal outer ring effect -->
      <ellipse cx="720" cy="450" rx="220" ry="220" fill="none" stroke="#b347ff" stroke-width="3" opacity="0.4"/>
      <ellipse cx="720" cy="450" rx="200" ry="200" fill="none" stroke="#8800ff" stroke-width="6" opacity="0.6"/>
      <ellipse cx="720" cy="450" rx="180" ry="180" fill="none" stroke="#cc66ff" stroke-width="2" opacity="0.5"/>
      <!-- Portal core glow -->
      <ellipse cx="720" cy="450" rx="160" ry="160" fill="url(#portalCore)" opacity="0.8"/>
    </svg>
  `,
};

export function SceneBackground({ scene }: ParallaxBgProps) {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      dangerouslySetInnerHTML={{
        __html: scenes[scene].trim(),
      }}
    />
  );
}
