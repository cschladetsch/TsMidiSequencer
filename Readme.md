# TypeScript MIDI Sequencer

Visual simulator of an AKAI-style 8x8 grid controller. Works standalone, no hardware required.

## Features
- 8x8 clickable button grid (64 buttons)
- Click to toggle buttons on/off (green = active)
- Optional: Connect real MIDI devices via Web MIDI API
- Simple state management, no framework overhead
- ~200 lines of clean TypeScript

## Quick Start (WSL2 or Native)

```bash
npm install
npm run dev
```

Open Chrome/Edge on Windows at `http://localhost:5173`

**That's it.** Click buttons, they light up. No MIDI hardware needed.

## WSL2 Usage
- Run `npm run dev` in WSL2 (serves on 0.0.0.0:5173)
- Open browser on **Windows** (not inside WSL2)
- Navigate to `http://localhost:5173`
- If you connect MIDI devices, Web MIDI API runs in Windows browser with full hardware access

## Optional: Connect MIDI Hardware
1. Plug in MIDI device (USB)
2. Select device from dropdowns in the UI
3. Buttons sync bidirectionally with hardware

## Project Structure
```
src/
  main.ts   - Entry point, MIDI init
  grid.ts   - Canvas renderer, click handling
  state.ts  - Button state (64 buttons)
  midi.ts   - Web MIDI API wrapper (optional)
```

## Build for Production
```bash
npm run build
```

Deploy the `dist/` folder to any static host (GitHub Pages, Netlify, etc.)
