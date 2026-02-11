# Fractal Grid Sequencer

A standalone browser grid sequencer with fractal/Euclidean rhythm tools, per-row mixing, and built‑in synth/sample sound banks.

## Quick Start (No Build)

Open `index.html` directly in a modern browser.

**Tip:** If audio doesn’t start automatically, click anywhere in the page to unlock audio playback.

## Features
- Clickable grid with resizable rows/columns (drag the corner)
- Fractal and Euclidean pattern generators
- Auto‑Fractal mode with phrase‑based regeneration
- Swing, accent, density, and humanize controls
- Pattern A/B toggle
- Per‑row mute/solo, pan, and volume
- Per‑note pitch offsets (drag up/down on a block)
- Voice mode per row with interpolated pitch through gaps
- MIDI export (PPQ or SMPTE time‑locked)
- Synth and sample sound bank selection
- Runs from a single `index.html` (no build required)

## Controls Overview
- **PLAY**: Start/stop playback.
- **CLEAR / RANDOM**: Reset or randomize the grid.
- **EUCLIDEAN**: Generate evenly‑distributed rhythms.
- **FRACTAL / AUTO FRACTAL**: Generate and optionally auto‑regenerate fractal patterns per phrase.
- **PATTERN A/B**: Toggle between two stored patterns.
- **HUMANISE**: Adds subtle timing, detune, and velocity variation.
- **MIDI MODE**: Toggle between PPQ and SMPTE export.
- **DOWNLOAD MIDI**: Export the last N minutes (prompted).
- **SOUND BANK**: Switch between synth banks and bundled sample banks.
- **Pitch adjust**: Click‑drag up/down on a block to set pitch offset.
- **M/S per row**: Mute or Solo each row. Pan and volume sliders are to the left.
- **Voice mode**: Toggle `VN` to enable interpolated pitch through gaps on any row.

## Sound Banks
- Built‑in synth banks are defined in `index.html`.
- Sample banks live under `assets/samples/` and are bundled in this repo.

## File Formats

### Pattern File (Load Pattern File)
Used by the **Load File** button and `patternFileInput`.

**Required fields**
- `rows`: integer
- `cols`: integer
- `pattern`: boolean array of length `rows * cols`

**Optional fields**
- `settings`: object (see below)

**Ordering**
- `pattern` is **row‑major**: index = `row * cols + col`.

**Example**
```json
{
  "rows": 12,
  "cols": 24,
  "pattern": [true, false, false, "..."],
  "settings": {
    "bpm": 160,
    "primeValue": 3,
    "fractalDepth": 5,
    "swingAmount": 0,
    "accentEvery": 4,
    "autoEvery": 4,
    "autoFractal": false,
    "humanizeOn": false,
    "isLocked": false,
    "fractalDensity": 60,
    "soundBankId": "synth-classic"
  }
}
```

### Full State (LocalStorage `cmt_state_v1`)
Complete app state saved to LocalStorage.

**Top‑level fields**
- `rows`: integer
- `cols`: integer
- `rowMute`: boolean array, length `rows`
- `rowSolo`: boolean array, length `rows`
- `rowPanValues`: number array, length `rows`
- `rowGainValues`: number array, length `rows`
- `buttons`: boolean array, length `rows * cols`
- `currentPattern`: `"A"` or `"B"`
- `patternSlots`: object with optional `A` and `B` arrays
- `settings`: object (see below)

**`settings` fields**
- `bpm`: number
- `primeValue`: number
- `fractalDepth`: number
- `swingAmount`: number
- `accentEvery`: number
- `autoEvery`: number
- `autoFractal`: boolean
- `humanizeOn`: boolean
- `isLocked`: boolean
- `fractalDensity`: number
- `midiMode`: number (index into MIDI mode list)
- `soundBankId`: string

**Notes**
- Missing fields fall back to current UI defaults.
- If `patternSlots` is present, the app restores the current pattern from it.

### Schemas And Examples
- JSON Schemas: `schema/pattern.schema.json`, `schema/state.schema.json`
- Examples: `examples/pattern-example.json`, `examples/state-example.json`
- Validate: `npm run validate:schema`

## Development
- `npm run dev` for a local Vite server (optional)
- `npm run build` to build the TS/Vite bundle (optional)
- `npm run preview` to preview the build (optional)
