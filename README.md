# 🌴 LOS SANTOS ➔ BHARAT 🇮🇳
### *"Same Dreams. A Different Map."*

[![Built With React Image Editor](https://img.shields.io/badge/Built%20With-React%20Image%20Editor-b347ff?style=for-the-badge&logo=react)](https://github.com/unlayer/react-image-editor)
[![Unlayer Challenge](https://img.shields.io/badge/Unlayer%20Challenge-GTA%20VI%20Inspired-ff6b35?style=for-the-badge)](https://www.linkedin.com/posts/builtwithimageeditor-ugcPost-7501266289240240128-5qRa/)
[![Built for 1st Prize](https://img.shields.io/badge/Contest%20Entry-%23BuiltWithImageEditor-00f5ff?style=for-the-badge)](https://github.com/unlayer/react-image-editor)
[![Tech Stack](https://img.shields.io/badge/Vite-React%2019%20%7C%20TypeScript%20%7C%20Tailwind-138808?style=for-the-badge)](https://vitejs.dev/)

An award-grade, cinematic open-world interactive story built for the **Unlayer "Build with React Image Editor Challenge" ($1,000 Prize Pool)**.

---

## 🎮 The Concept

What if the open-world ambition and grit of **GTA VI** crossed dimensions from the neon-drenched shores of **Los Santos Beach** into the vibrant, historic, cultural powerhouse of **Bharat (India)**?

Players step into the shoes of a customizable protagonist who discovers a pulsating cosmic rift on the Pacific coast. Stepping through the anomaly launches an epic cross-continental odyssey through three of India’s most iconic historic landmarks:
1. **Mumbai Harbor**: Taj Mahal Palace Hotel & Gateway of India at dusk.
2. **New Delhi**: The grand Kartavya Path avenue and India Gate with the eternal flame.
3. **Kolkata**: The grand white marble Victoria Memorial reflecting upon the lake and the illuminated Howrah Bridge.
4. **Unlayer Poster Studio**: Where players customize, stamp, filter, and export their official journey poster using `@unlayer/react-image-editor`!

---

## ✨ Key Innovations & Standout Features

### 1. 📜 Hatom-Style Scrollytelling Architecture (Awwwards-Inspired)
- **Continuous Fluid Journey**: The entire game is a seamless vertical scroll experience. You can glide effortlessly through all 9 chapters with your mouse wheel, trackpad, or swipe gestures.
- **Fixed Cinematic Background Manager**: Seamless cross-fades between high-resolution 8K concept scenes with continuous **Ken Burns parallax camera motion** and dynamic city color grading.
- **Vertical Chapter Navigation Rail (`01` to `09`)**: Pinned to the right with glowing indicators, chapter tooltips, and one-click smooth scrolling to any landmark.
- **Live Top Progress Bar**: Dynamic completion percentage indicator ($0\% \rightarrow 100\%$) and interactive route breadcrumbs.

### 2. 🎯 Authentic GTA In-Game HUD Elements
- **Dynamic GTA Minimap Radar**: Pinned circular radar scanner with player orientation arrow, compass **N**, real-time district GPS tags (`DEL PERRO BEACH`, `COLABA HARBOR`, `KARTAVYA PATH`, `VICTORIA MEMORIAL`), and health/armor status bars.
- **GTA Mission Objective Banner**: Slides in automatically from the top-left upon entering each chapter (`STORY MISSION`, `DIMENSIONAL EVENT`, `JOURNEY CLIMAX`).
- **Full Keyboard Navigation**: Tap <kbd>E</kbd> or <kbd>Space</kbd> to interact with objectives or warp through portals.

### 3. 🎨 Core Integration: Unlayer React Image Editor Studio
The Unlayer React Image Editor is not an afterthought—it is the **pinnacle of the gameplay journey**:
- **Dynamic Canvas Personalization Engine**: Automatically generates a high-resolution base travel poster (`journey_poster_default.jpg`) stamping the player's custom operative name, class title, and attribute stats (Driving, Tech, Style, Luck) directly onto the artwork before loading into Unlayer.
- **Interactive Landmark Template Rail**: Lets players switch between:
  - 🌟 **Official GTA Travel Poster** (personalized operative dossier)
  - ✨ **Key Art Split Panoramic Cover**
  - 🌴 **Los Santos Beach Sunset**
  - 🌀 **The Cosmic Portal**
  - 🏛️ **Mumbai Taj Palace**
  - 🇮🇳 **New Delhi India Gate**
  - 👑 **Kolkata Victoria Memorial**
- **Full Creative Power**: Players can apply filters (Cinematic, Vintage, B&W), crop, draw, add text typography, stickers, and frames using Unlayer's native tools.
- **Live Social Card & Export**: Generates a verified Twitter/X-style social debrief card with instant high-res PNG download and shareable link copying.

### 4. 🔊 Procedural Web Audio Synthesizer
- Built using the native **Web Audio API** (`AudioContext`).
- Zero external MP3 downloads, 0ms latency, zero copyright issues.
- Includes realistic button clicks, cosmic portal warp frequencies, camera shutter clicks on save, and triumphant mission success chimes.
- Accessible mute/unmute toggle in the top bar.

---

## 🕹️ Story Flow & Chapters

| Chapter | Location | Experience |
|---|---|---|
| **01** | **Title Screen** | Grand cinematic split-screen key visual & challenge brief badges |
| **02** | **Operative Lab** | Custom character creation (Name, Archetype, Stat distribution) |
| **03** | **Los Santos Coast** | Del Perro beach at sunset, red sports car, mysterious portal discovery |
| **04** | **The Cosmic Portal** | Neon urban alleyway rift, electric purple lightning & warp tunnel |
| **05** | **Mumbai Harbor** | Gateway of India, Taj Mahal Palace Hotel, floating lanterns |
| **06** | **New Delhi** | Kartavya Path, glowing India Gate war memorial, fireworks |
| **07** | **Kolkata** | Victoria Memorial lake reflection, Howrah Bridge, city of joy |
| **08** | **Poster Studio** | Powered by **@unlayer/react-image-editor** |
| **09** | **Mission Debrief** | Verified social preview card, stats recap, high-res download |

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
- Node.js 18+ installed

```bash
# Clone the repository
git clone https://github.com/your-username/los-santos-bharat.git

# Navigate into project directory
cd los-santos-bharat

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Deployment

```bash
# Type check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

### Deploy in 1-Click:
- **Vercel**: Push to GitHub and import repository on Vercel. (The included `vercel.json` handles all SPA rewrites automatically).
- **Netlify**: Connect your GitHub repo, set build command `npm run build` and publish directory `dist`.

---

## 🛠️ Tech Stack & Dependencies

- **Core Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v3 + Custom GTA Glass & Neon Design System
- **Animation & Motion**: Framer Motion
- **Image Editor**: `@unlayer/react-image-editor` (v1.0.2)
- **Icons**: Lucide React
- **Audio**: Native Web Audio API Synthesizer

---

## 🏆 Unlayer Challenge Submission Details

- **Event**: Build with React Image Editor Challenge ($1,000 Prize Pool)
- **Organizer**: Unlayer (YC W22)
- **Tag**: `#BuiltWithImageEditor`
- **Official GitHub**: [https://github.com/unlayer/react-image-editor](https://github.com/unlayer/react-image-editor)
- **Contest Announcement**: [LinkedIn Announcement Post](https://www.linkedin.com/posts/builtwithimageeditor-ugcPost-7501266289240240128-5qRa/)

---

*Disclaimer: All artwork, concepts, and narratives are 100% original creations inspired by open-world adventure games. No copyrighted Rockstar Games or Take-Two Interactive assets or logos were utilized.*
