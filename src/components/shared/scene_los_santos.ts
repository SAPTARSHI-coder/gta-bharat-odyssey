export const losSantosSVG = `<svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
<defs>
  <linearGradient id="ls_sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#04000e"/>
    <stop offset="18%" stop-color="#120022"/>
    <stop offset="38%" stop-color="#3d0055"/>
    <stop offset="55%" stop-color="#8b1560"/>
    <stop offset="70%" stop-color="#d43820"/>
    <stop offset="83%" stop-color="#ff7020"/>
    <stop offset="93%" stop-color="#ffaa40"/>
    <stop offset="100%" stop-color="#ffd060"/>
  </linearGradient>
  <radialGradient id="ls_sun" cx="72%" cy="78%" r="22%">
    <stop offset="0%" stop-color="#fff5aa"/>
    <stop offset="15%" stop-color="#ffcc33" stop-opacity="0.9"/>
    <stop offset="40%" stop-color="#ff8820" stop-opacity="0.6"/>
    <stop offset="100%" stop-color="transparent"/>
  </radialGradient>
  <linearGradient id="ls_ocean" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#1a3a6a"/>
    <stop offset="100%" stop-color="#060e22"/>
  </linearGradient>
  <filter id="ls_glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="1440" height="900" fill="url(#ls_sky)"/>
<ellipse cx="1036" cy="702" rx="260" ry="130" fill="url(#ls_sun)"/>
<circle cx="1036" cy="702" r="44" fill="#ffe066" opacity="0.95" filter="url(#ls_glow)"/>
<g opacity="0.22" fill="none" stroke="#ff7755" stroke-width="20">
  <line x1="0" y1="170" x2="600" y2="150"/>
  <line x1="400" y1="130" x2="1100" y2="100"/>
  <line x1="600" y1="250" x2="1440" y2="210"/>
</g>
<g opacity="0.4" fill="#180830">
  <rect x="0" y="490" width="70" height="210"/><rect x="25" y="440" width="35" height="260"/>
  <rect x="62" y="510" width="55" height="190"/><rect x="105" y="458" width="45" height="242"/>
  <rect x="135" y="425" width="30" height="275"/><rect x="175" y="468" width="60" height="232"/>
  <rect x="210" y="442" width="28" height="258"/><rect x="240" y="478" width="65" height="222"/>
  <rect x="295" y="448" width="42" height="252"/><rect x="330" y="462" width="75" height="238"/>
  <rect x="800" y="452" width="70" height="248"/><rect x="840" y="413" width="40" height="287"/>
  <rect x="870" y="438" width="60" height="262"/><rect x="920" y="423" width="80" height="277"/>
  <rect x="975" y="448" width="35" height="252"/><rect x="1015" y="457" width="70" height="243"/>
  <rect x="1080" y="432" width="55" height="268"/><rect x="1120" y="413" width="90" height="287"/>
  <rect x="1190" y="452" width="45" height="248"/><rect x="1230" y="438" width="70" height="262"/>
  <rect x="1280" y="423" width="50" height="277"/><rect x="1340" y="448" width="100" height="252"/>
</g>
<g fill="#100525">
  <rect x="0" y="542" width="90" height="358"/><rect x="15" y="492" width="50" height="408"/>
  <rect x="1050" y="502" width="100" height="398"/><rect x="1070" y="462" width="55" height="438"/>
  <rect x="1140" y="522" width="80" height="378"/><rect x="1170" y="477" width="40" height="423"/>
  <rect x="1230" y="512" width="90" height="388"/><rect x="1260" y="467" width="50" height="433"/>
  <rect x="1330" y="497" width="110" height="403"/>
</g>
<g fill="#ffdd88" opacity="0.4" filter="url(#ls_glow)">
  <rect x="8" y="508" width="7" height="5"/><rect x="22" y="508" width="7" height="5"/>
  <rect x="8" y="522" width="7" height="5"/><rect x="22" y="536" width="7" height="5"/>
  <rect x="8" y="550" width="7" height="5"/><rect x="1060" y="478" width="7" height="5"/>
  <rect x="1075" y="492" width="7" height="5"/><rect x="1155" y="538" width="7" height="5"/>
  <rect x="1175" y="495" width="7" height="5"/><rect x="1240" y="528" width="7" height="5"/>
  <rect x="1270" y="483" width="7" height="5"/><rect x="1345" y="513" width="7" height="5"/>
  <rect x="1360" y="527" width="7" height="5"/>
</g>
<g filter="url(#ls_glow)">
  <rect x="30" y="492" width="3" height="50" fill="#ff2d87"/>
  <rect x="36" y="492" width="40" height="3" fill="#ff2d87"/>
  <rect x="36" y="539" width="40" height="3" fill="#ff2d87"/>
  <rect x="72" y="492" width="3" height="50" fill="#ff2d87"/>
  <rect x="140" y="470" width="55" height="3" fill="#b347ff"/>
  <rect x="140" y="485" width="55" height="3" fill="#b347ff"/>
  <text x="167" y="480" text-anchor="middle" font-family="monospace" font-size="5" fill="#b347ff">LUXE</text>
  <rect x="1090" y="465" width="3" height="55" fill="#00f5ff"/>
  <rect x="1093" y="465" width="50" height="3" fill="#00f5ff"/>
  <rect x="1093" y="517" width="50" height="3" fill="#00f5ff"/>
  <rect x="1140" y="465" width="3" height="55" fill="#00f5ff"/>
  <text x="1118" y="497" text-anchor="middle" font-family="monospace" font-size="6" fill="#00f5ff">OCEAN</text>
  <rect x="1180" y="478" width="55" height="3" fill="#ffd700"/>
  <text x="1207" y="487" text-anchor="middle" font-family="monospace" font-size="5" fill="#ffd700">GOLD</text>
</g>
<g fill="#05150a">
  <rect x="345" y="572" width="14" height="228" rx="5"/>
  <ellipse cx="352" cy="570" rx="60" ry="22" fill="#052010" transform="rotate(-5,352,570)"/>
  <ellipse cx="352" cy="556" rx="50" ry="18" fill="#052010" transform="rotate(-30,352,556)"/>
  <ellipse cx="352" cy="562" rx="50" ry="18" fill="#052010" transform="rotate(28,352,562)"/>
  <ellipse cx="352" cy="548" rx="38" ry="14" fill="#052010" transform="rotate(-55,352,548)"/>
  <rect x="448" y="592" width="12" height="198" rx="5"/>
  <ellipse cx="454" cy="590" rx="55" ry="20" fill="#052010" transform="rotate(6,454,590)"/>
  <ellipse cx="454" cy="576" rx="46" ry="16" fill="#052010" transform="rotate(-32,454,576)"/>
  <ellipse cx="454" cy="582" rx="46" ry="16" fill="#052010" transform="rotate(30,454,582)"/>
  <rect x="1000" y="577" width="13" height="223" rx="5"/>
  <ellipse cx="1007" cy="575" rx="58" ry="21" fill="#052010" transform="rotate(-4,1007,575)"/>
  <ellipse cx="1007" cy="561" rx="48" ry="17" fill="#052010" transform="rotate(-28,1007,561)"/>
  <ellipse cx="1007" cy="567" rx="48" ry="17" fill="#052010" transform="rotate(26,1007,567)"/>
  <rect x="1095" y="597" width="11" height="203" rx="5"/>
  <ellipse cx="1101" cy="595" rx="52" ry="19" fill="#052010" transform="rotate(8,1101,595)"/>
  <ellipse cx="1101" cy="581" rx="44" ry="15" fill="#052010" transform="rotate(-35,1101,581)"/>
</g>
<rect x="0" y="700" width="1440" height="55" fill="#c0924a" opacity="0.5"/>
<g stroke="#b88040" stroke-width="0.8" opacity="0.3" fill="none">
  <path d="M100,730 Q400,724 700,732 Q1000,740 1300,728"/>
  <path d="M50,744 Q350,738 650,746 Q950,754 1350,742"/>
</g>
<rect x="0" y="755" width="1440" height="145" fill="url(#ls_ocean)"/>
<g opacity="0.35" fill="#ffcc33">
  <polygon points="800,755 1440,755 1440,900 900,900"/>
</g>
<g stroke="#3a6090" stroke-width="1.2" opacity="0.4" fill="none">
  <path d="M0,770 Q180,764 360,772 Q540,780 720,772 Q900,764 1080,772 Q1260,780 1440,772"/>
  <path d="M0,792 Q200,786 400,794 Q600,802 800,794 Q1000,786 1200,794 Q1400,802 1440,792"/>
  <path d="M0,814 Q220,808 440,816 Q660,824 880,816 Q1100,808 1320,816 Q1400,822 1440,816"/>
</g>
<rect x="0" y="800" width="1440" height="100" fill="#121212"/>
<g fill="#555" opacity="0.8">
  <rect x="670" y="810" width="100" height="10" rx="3"/>
  <rect x="670" y="830" width="100" height="10" rx="3"/>
  <rect x="670" y="850" width="100" height="10" rx="3"/>
  <rect x="670" y="870" width="100" height="10" rx="3"/>
</g>
<rect x="0" y="800" width="1440" height="2" fill="#ffffff" opacity="0.12"/>
<g opacity="0.85">
  <rect x="155" y="822" width="90" height="38" rx="6" fill="#1a0a35"/>
  <rect x="168" y="814" width="60" height="22" rx="4" fill="#2a1050"/>
  <rect x="162" y="822" width="16" height="6" fill="#ffee88" opacity="0.9"/>
  <rect x="225" y="822" width="16" height="6" fill="#ff4444" opacity="0.9"/>
  <circle cx="172" cy="860" r="10" fill="#111"/><circle cx="172" cy="860" r="6" fill="#333"/>
  <circle cx="228" cy="860" r="10" fill="#111"/><circle cx="228" cy="860" r="6" fill="#333"/>
  <rect x="160" y="858" width="85" height="3" fill="#b347ff" opacity="0.6"/>
  <rect x="620" y="818" width="120" height="45" rx="5" fill="#0a1a0a"/>
  <rect x="630" y="810" width="95" height="24" rx="4" fill="#0d200d"/>
  <rect x="624" y="818" width="18" height="8" fill="#ffee88" opacity="0.8"/>
  <rect x="718" y="818" width="18" height="8" fill="#ff4444" opacity="0.8"/>
  <circle cx="640" cy="865" r="11" fill="#111"/><circle cx="640" cy="865" r="6" fill="#333"/>
  <circle cx="724" cy="865" r="11" fill="#111"/><circle cx="724" cy="865" r="6" fill="#333"/>
  <rect x="1200" y="810" width="170" height="55" rx="4" fill="#120808"/>
  <rect x="1200" y="810" width="50" height="55" rx="4" fill="#1a0c0c"/>
  <rect x="1202" y="813" width="16" height="10" fill="#ffee88" opacity="0.9"/>
  <circle cx="1220" cy="867" r="12" fill="#111"/><circle cx="1220" cy="867" r="7" fill="#333"/>
  <circle cx="1350" cy="867" r="12" fill="#111"/><circle cx="1350" cy="867" r="7" fill="#333"/>
</g>
<g filter="url(#ls_glow)">
  <circle cx="400" cy="730" r="5" fill="#ffe866" opacity="0.8"/>
  <circle cx="900" cy="728" r="5" fill="#ffe866" opacity="0.8"/>
</g>
<rect x="0" y="680" width="1440" height="80" fill="#ff7722" opacity="0.05"/>
</svg>`;
