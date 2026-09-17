/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: { purple: '#b347ff', orange: '#ff6b35', pink: '#ff2d87', cyan: '#00f5ff', gold: '#ffd700' },
        game: { dark: '#0a0a0f', darker: '#050508', panel: 'rgba(10,10,20,0.85)', border: 'rgba(179,71,255,0.3)' }
      },
      fontFamily: { game: ['Orbitron','monospace'], cinematic: ['Bebas Neue','Impact','sans-serif'], body: ['Inter','sans-serif'] },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'portal-spin': 'portalSpin 4s linear infinite',
        'flicker': 'flicker 3s linear infinite',
      },
      keyframes: {
        pulseGlow: { '0%,100%': {boxShadow:'0 0 20px rgba(179,71,255,0.5)'}, '50%': {boxShadow:'0 0 60px rgba(179,71,255,1)'} },
        float: { '0%,100%': {transform:'translateY(0px)'}, '50%': {transform:'translateY(-10px)'} },
        portalSpin: { '0%': {transform:'rotate(0deg)'}, '100%': {transform:'rotate(360deg)'} },
        flicker: { '0%,100%': {opacity:'1'}, '50%': {opacity:'0.85'} },
      },
    },
  },
  plugins: [],
}
