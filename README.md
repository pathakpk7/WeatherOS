# WeatherOS

> **An atmospheric weather operating system built with rich tactile CSS, an interactive 3D celestial orb, real-time ephemeris, and procedural audio.**

[![Live Demo](https://img.shields.io/badge/demo-online-emerald.svg)](https://pathakpk7.github.io/WeatherOS/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)]()
[![Pure Vanilla](https://img.shields.io/badge/tech-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-orange.svg)]()

---

## Overview

**WeatherOS** is a high-fidelity weather dashboard designed from the ground up to eliminate generic template aesthetics. Built with pure Vanilla JavaScript, modern GPU-accelerated CSS, and zero external runtime dependencies, it turns live atmospheric data into a tactile, living digital experience.

---

## Key Features

### 1. 3D Interactive Celestial Weather Orb
- **Dynamic Gyro Physics**: Smoothly tilts and tracks cursor or touch movements in 3D perspective (`perspective: 1200px`).
- **Celestial Orbital Rings**: Concentric equatorial and inclined rings rotating in 3D space with dashed light trails.
- **Internal Weather Simulation**: Renders condition-specific particle dynamics inside the sphere (falling raindrops, crystalline snow, lightning sparks, solar embers).
- **Glass Specular Lighting**: Realistic curved specular highlights and a breathing atmospheric corona.

### 2. Celestial Ephemeris (Sun & Moon Systems)
- **Parabolic Solar Trajectory Arc**: Computes a real-time quadratic bezier curve for the sun's daylight path from sunrise to sunset with a traveling luminous sun marker and live countdown (*"Sunset in 2h 45m"*).
- **Photorealistic Moon Phase**: True synodic lunar cycle computation displaying illuminated lunar crescents, crater textures, and illumination percentage.

### 3. Living Atmospheric Background & Particle Engine
- **Contextual Environmental Shifting**: The interface automatically transitions color temperature and lighting based on the active condition (Clear Day, Clear Night, Rain, Thunderstorm with ambient lightning flashes, Snow, Clouds, Fog).
- **Multi-Depth Particle System**: Realistic diagonal rain streaks, drifting snowflakes with sinusoidal sway, and twinkling stars with shooting star meteors.
- **Organic Noise Texture**: Integrated SVG fractal noise overlay to eliminate gradient banding and provide an organic paper-like tactile grain.

### 4. Forecast Visualizations
- **24-Hour Temperature Sparkline**: Smooth cubic bezier curve with gradient fill and hoverable temperature points.
- **7-Day Spectrum Range Bars**: Apple Weather-style horizontal temperature spectrum bars displaying that day's range relative to the entire week's bounds, plus a glowing current-temperature pip on Today's bar.

### 5. Aerodynamic Gauges & Tactile Metrics
- **Wind Compass Rose**: Precision dial with cardinal headings (N, E, S, W) and an eased magnetic needle.
- **Circular AQI Gauge**: SVG circular progress meter with glowing stroke-dashoffset animation.
- **UV Index Segmented Bar**: Multi-tier color gradient meter with health advisory tags.
- **Cursor Spotlight Sheen**: Every frosted glass card features dynamic cursor spotlight lighting that follows the mouse across card surfaces (`--spotlight-x`, `--spotlight-y`).

### 6. Procedural Web Audio Ambient Soundscapes
- **Zero Audio Assets Required**: Uses the native Web Audio API to procedurally synthesize gentle rain, wind sweeps, distant soft thunder rumbles, and calm sunny pads.
- **Header Soundwave Equalizer**: Instant 1-click toggle with animated equalizer visualizer bars.

### 7. Vedic Panchang (पंचांग) & Dual-Language Horoscope (राशिफल)
- **Top Sidebar Cosmic Drawer**: Integrated cleanly at the top of the sidebar section with quick-access navigation pills (`[🕉️ Panchang]`, `[🔮 Horoscope]`, `[⚙️ Settings]`).
- **Real-Time Vedic Almanac**: Computes exact Tithi (and Paksha), Vaar with planetary lord & presiding deity, Nakshatra with Pada, Yoga, Karana, Samvat (Vikram Samvat 2083, Shaka 1948, Masa, Ritu, Ayana), dynamic Muhurats (Rahu Kaal, Abhijit Muhurat, Brahma Muhurat, Yamaganda, Amrit Kaal, Godhuli), and Sun/Moon signs.
- **Bilingual Dual-Language Horoscope**: Comprehensive Daily, Weekly, Monthly, and Yearly readings for all 12 zodiac signs (Aries through Pisces / मेष through मीन) in English & Hindi across 4 life domains (Cosmic Overview, Career & Wealth, Love & Relationships, Health & Vitality) with Lucky Traits, Harmony Scores, Compatibility, and Gemstones.

### 8. World Clock Hub & Global Search
- Real-time global clocks with local times, day/night ambient badges, and user-relative time offsets.
- Instant location search with geocoding autocomplete and keyboard navigation (`/` or `Ctrl+K` / `Cmd+K` shortcut).

---

## Getting Started

### Local Setup
Since WeatherOS uses pure vanilla web standards with no build step required:

```bash
# Clone the repository
git clone https://github.com/pathakpk7/WeatherOS.git
cd WeatherOS

# Open in your browser or run a lightweight server
# Example with Python:
python -m http.server 8000
# Or with Node.js:
npx serve .
```

Then visit `http://localhost:8000` in any modern web browser.

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `/` or `Ctrl+K` / `Cmd+K` | Open Location Search drawer |
| `Escape` | Dismiss active drawers (Search / Settings) |
| `↑` / `↓` | Navigate autocomplete search suggestions |
| `Enter` | Select highlighted location |

---

## Project Structure

```
WeatherOS/
├── .github/workflows/
│   └── pages.yml          # Automated GitHub Pages CI/CD workflow
├── css/
│   ├── animations.css     # Hardware-accelerated keyframe animations
│   ├── style.css          # Core design system, variables & glass layout
│   ├── cinematic.css      # 3D orb, celestial arc, moon & custom gauges
│   ├── themes.css         # Contextual weather & time-of-day palettes
│   └── responsive.css     # Fluid breakpoints for mobile, tablet & desktop
├── js/
│   ├── panchang.js        # Indian Vedic Panchang astronomical calculation engine
│   ├── horoscope.js       # Dual-language (EN/HI) 12-sign daily/weekly/monthly/yearly horoscope engine
│   ├── weather-orb.js     # 3D Weather Orb with gyro mouse physics
│   ├── micro-animations.js# Eased numeric counters & card spotlight sheen
│   ├── scroll-controller.js# Viewport triggers & subtle mouse parallax
│   ├── audio-engine.js    # Procedural Web Audio API soundscape synthesis
│   └── app.js             # Core OS controller, Open-Meteo feeds & ephemeris
├── index.html             # Semantic accessible application shell
└── README.md
```

---

## License

This project is open source and available under the [MIT License](LICENSE).
