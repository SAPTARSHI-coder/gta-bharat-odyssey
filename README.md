# LOS SANTOS → BHARAT
### "Same Dreams. A Different Map."

A cinematic interactive web experience built for the **Unlayer "Build with React Image Editor Challenge"**.

## 🎮 What is this?

A short cinematic game-like web experience where you:
1. **Create your character** (name, style, stats, bio)
2. **Explore Los Santos Beach** — a fictional neon-lit coastal city at sunset
3. **Discover a mysterious portal** — glowing, animated, otherworldly
4. **Enter the portal** — dramatic warp-speed transition
5. **Arrive in Mumbai** — Gateway of India, floating lanterns, Indian flag colors
6. **Journey to New Delhi** — India Gate, fireworks, grand reveal
7. **Create your Journey Poster** — powered by **Unlayer React Image Editor**
8. **Download & Share** your personalized journey card

## 🚀 Run Locally

```sh
npm install
npm run dev
```

Then open http://localhost:3000

## 🏗️ Production Build

```sh
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** — game-themed dark UI
- **Framer Motion** — cinematic transitions, animations
- **@unlayer/react-image-editor** — the core editing experience
- **Lucide React** — icons

## 🎨 The Unlayer Editor Integration

The **Unlayer React Image Editor** is integrated in Screen 7 (Journey Editor).

The editor receives a **dynamically generated SVG poster** containing:
- The player's character name and title
- The full journey route (Los Santos → Portal → Mumbai → Delhi)
- Character stats visualization
- Tagline "Same Dreams. A Different Map."

The player can then:
- Add text overlays
- Apply filters
- Crop and resize
- Draw on the poster
- Add shapes, stickers, and frames
- Save the final result

## 📁 Project Structure

```
src/
  components/
    Landing/          — Cinematic landing screen
    CharacterCreator/ — Interactive character setup
    LosSantosScene/   — Beach scene with portal discovery
    Portal/           — Animated portal + warp transition
    MumbaiScene/      — Mumbai arrival with lanterns
    DelhiScene/       — Delhi/India Gate with fireworks
    JourneyEditor/    — Unlayer React Image Editor integration
    FinalShare/       — Download and share screen
    HUD/              — Game HUD overlay
    shared/           — Particles, SVG backgrounds
  context/
    GameContext.tsx   — Global game state
  types.ts            — TypeScript types
```

## 🌐 Environment Variables

None required. The Unlayer editor works without a project ID (all tools enabled by default).

Optional: Add `VITE_UNLAYER_PROJECT_ID` if you want to enable the AI Assistant feature:
```env
VITE_UNLAYER_PROJECT_ID=your_project_id
```

## 📝 TODOs / Improvements

- [ ] Add ambient sound effects (optional, architecture is ready)
- [ ] Mobile touch improvements for the character creator stat sliders
- [ ] More cinematic story text with typewriter effect
- [ ] Map/travel animation between Mumbai and Delhi
- [ ] Social share with Open Graph image generation
- [ ] Character avatar using canvas-generated pixel art
- [ ] More detailed SVG scene backgrounds with parallax layers
- [ ] Vercel/Netlify deployment config

## 🏆 Challenge Submission

**#BuiltWithImageEditor**

Built with [Unlayer React Image Editor](https://github.com/unlayer/react-image-editor)

---
*No copyrighted GTA/Rockstar assets were used. All visuals are original SVG artwork.*
