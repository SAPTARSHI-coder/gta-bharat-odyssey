export const portalSVG = `<svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
<defs>
  <radialGradient id="p_bg" cx="50%" cy="50%" r="70%">
    <stop offset="0%" stop-color="#1a0035"/>
    <stop offset="40%" stop-color="#0e0022"/>
    <stop offset="75%" stop-color="#060010"/>
    <stop offset="100%" stop-color="#010005"/>
  </radialGradient>
  <radialGradient id="p_core" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#ffffff"/>
    <stop offset="15%" stop-color="#eeddff" stop-opacity="0.95"/>
    <stop offset="35%" stop-color="#aa44ff" stop-opacity="0.8"/>
    <stop offset="60%" stop-color="#6600cc" stop-opacity="0.5"/>
    <stop offset="100%" stop-color="transparent"/>
  </radialGradient>
  <filter id="p_glow"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="1440" height="900" fill="url(#p_bg)"/>
<g opacity="0.1">
  <ellipse cx="300" cy="200" rx="280" ry="120" fill="#aa44ff" transform="rotate(-20,300,200)"/>
  <ellipse cx="1100" cy="700" rx="250" ry="100" fill="#ff4488" transform="rotate(15,1100,700)"/>
  <ellipse cx="200" cy="700" rx="200" ry="80" fill="#4444ff" transform="rotate(-10,200,700)"/>
  <ellipse cx="1200" cy="200" rx="220" ry="90" fill="#aa44ff" transform="rotate(12,1200,200)"/>
</g>
<g fill="white">
  <circle cx="80" cy="60" r="1.5" opacity="0.9"/><circle cx="180" cy="120" r="1.0" opacity="0.7"/>
  <circle cx="320" cy="50" r="1.3" opacity="0.8"/><circle cx="480" cy="90" r="0.9" opacity="0.6"/>
  <circle cx="600" cy="40" r="1.4" opacity="0.9"/><circle cx="820" cy="80" r="1.0" opacity="0.7"/>
  <circle cx="960" cy="30" r="0.8" opacity="0.5"/><circle cx="1100" cy="70" r="1.3" opacity="0.8"/>
  <circle cx="1280" cy="50" r="1.0" opacity="0.6"/><circle cx="1400" cy="100" r="1.4" opacity="0.9"/>
  <circle cx="140" cy="250" r="0.9" opacity="0.5"/><circle cx="340" cy="300" r="1.2" opacity="0.6"/>
  <circle cx="540" cy="220" r="0.8" opacity="0.5"/><circle cx="700" cy="280" r="1.1" opacity="0.7"/>
  <circle cx="900" cy="240" r="0.9" opacity="0.5"/><circle cx="1060" cy="290" r="1.2" opacity="0.8"/>
  <circle cx="1240" cy="250" r="0.8" opacity="0.5"/><circle cx="60" cy="450" r="1.0" opacity="0.6"/>
  <circle cx="240" cy="600" r="1.3" opacity="0.7"/><circle cx="1200" cy="550" r="1.0" opacity="0.6"/>
  <circle cx="1380" cy="400" r="1.3" opacity="0.8"/><circle cx="100" cy="750" r="0.9" opacity="0.5"/>
  <circle cx="1340" cy="750" r="1.1" opacity="0.7"/>
</g>
<circle cx="720" cy="450" r="235" fill="none" stroke="#6600cc" stroke-width="2" opacity="0.3"/>
<circle cx="720" cy="450" r="215" fill="none" stroke="#9922ee" stroke-width="4" opacity="0.45"/>
<circle cx="720" cy="450" r="195" fill="none" stroke="#bb44ff" stroke-width="6" opacity="0.6"/>
<circle cx="720" cy="450" r="175" fill="none" stroke="#dd88ff" stroke-width="4" opacity="0.7"/>
<circle cx="720" cy="450" r="155" fill="none" stroke="#ff99ff" stroke-width="2" opacity="0.5"/>
<circle cx="720" cy="450" r="145" fill="url(#p_core)" opacity="0.9"/>
<g stroke="rgba(180,100,255,0.12)" stroke-width="1" fill="none">
  <line x1="0" y1="450" x2="1440" y2="450"/>
  <line x1="720" y1="0" x2="720" y2="900"/>
  <line x1="0" y1="0" x2="1440" y2="900"/>
  <line x1="1440" y1="0" x2="0" y2="900"/>
</g>
</svg>`;
