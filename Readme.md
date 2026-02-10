# Christian's Music Thing

Standalone browser tracker/sequencer with fractal visuals and generative rhythm tools.

## Features
- Clickable grid with resizable rows/columns (drag the corner)
- Fractal and Euclidean pattern generators
- Auto Fractal mode with phrase-based regeneration (per phrase interval)
- Swing, accent, density, and humanize controls
- Pattern A/B memory toggle
- Per-row mute/solo controls
- MIDI export (Compatible or SMPTE time-locked)
- Runs from a single `index.html` (no build required)

## Quick Start (No Build)

Open `index.html` directly in a modern browser.

**Tip:** If audio doesn't start automatically, click anywhere in the page to unlock audio playback.

**Caching note:** The service worker (for caching Tone.js + audio assets) only works over `http://` or `https://`. If you open via `file://`, caching is disabled.

**Tone.js note:** For `file://` usage, place a local `tone.min.js` in the repo (same folder as `index.html`). If you serve over `http://`, it will fall back to the CDN.

## Controls Overview
- **PLAY**: Start/stop playback.
- **CLEAR / RANDOM**: Reset or randomize the grid.
- **EUCLIDEAN**: Generates evenly-distributed rhythms (tied to current seed).
- **FRACTAL / AUTO FRACTAL**: Generate and optionally auto-regenerate fractal patterns per phrase.
- **PATTERN A/B**: Toggle between two stored patterns.
- **HUMANIZE**: Adds subtle timing, detune, and velocity variation.
- **MIDI MODE**: Toggle between Compatible (PPQ) and SMPTE (time-locked) export.
- **DOWNLOAD MIDI**: Exports the last N minutes (prompted).
- **M/S per row**: Mute or Solo each row.
