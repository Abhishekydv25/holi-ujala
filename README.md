# 🎨 Happy Holi — Ujala

A beautiful interactive Holi greeting app built with React + Vite.

---

## 📁 Project Structure

```
holi-ujala/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              ← React entry point
    ├── App.jsx               ← Master controller (phases, particles, petals)
    ├── index.css             ← Global animations & reset
    │
    ├── utils/
    │   ├── constants.js      ← Colors, captions, song ID, emojis
    │   └── helpers.js        ← rnd(), generateBurst(), generatePetal()
    │
    └── components/
        ├── Particle.jsx         ← Single color burst particle
        ├── Petal.jsx            ← Single falling flower petal
        ├── ParticleCanvas.jsx   ← Renders all particles + petals
        ├── StarField.jsx        ← Twinkling stars (intro background)
        ├── IntroScreen.jsx      ← Opening screen with Ujala name + button
        ├── BloomTransition.jsx  ← 🌸 bloom animation between intro & gallery
        ├── PhotoSlider.jsx      ← Photo carousel with nav + dots
        ├── ShayariCard.jsx      ← Hindi shayari message card
        ├── MusicPlayer.jsx      ← Hidden auto-play audio + indicator badge
        ├── FloatingEmojis.jsx   ← Bottom animated emoji row
        └── GalleryScreen.jsx    ← Combines all gallery components
```

---

## 🚀 Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

---

## ✨ Features

| Feature | Component |
|---|---|
| Twinkling starfield intro | `StarField.jsx` |
| Animated "Ujala" shimmer text | `IntroScreen.jsx` |
| Color burst on click anywhere | `App.jsx` → `burst()` |
| 🌸 Bloom transition animation | `BloomTransition.jsx` |
| Auto-sliding photo gallery | `PhotoSlider.jsx` + `GalleryScreen.jsx` |
| Rainbow glow border on photos | `PhotoSlider.jsx` |
| Falling colored petals | `App.jsx` (petal physics) + `Petal.jsx` |
| Hindi shayari card | `ShayariCard.jsx` |
| Auto-play background music | `MusicPlayer.jsx` |
| Animated music bars indicator | `MusicPlayer.jsx` |
| Floating emoji row | `FloatingEmojis.jsx` |

---

Made with 💖 for Ujala — Happy Holi! 🎊
