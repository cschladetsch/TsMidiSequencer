# Fractal Grid Sequencer

Standalone browser tracker/sequencer with generative rhythm tools and a subtle animated background.

## Features
- Clickable grid with resizable rows/columns (drag the corner)
- Fractal and Euclidean pattern generators
- Auto Fractal mode with phrase-based regeneration (per phrase interval)
- Swing, accent, density, and humanize controls
- Synth and sample sound bank selection
- Pattern A/B memory toggle
- Per-row mute/solo controls plus pan + volume sliders
- Per-note pitch offsets (drag up/down on a block)
- Voice row (last row) with glide/merge behavior across gaps
- MIDI export (Compatible or SMPTE time-locked)
- Runs from a single `index.html` (no build required)

## Quick Start (No Build)

Open `index.html` directly in a modern browser.

**Tip:** If audio doesn't start automatically, click anywhere in the page to unlock audio playback.

## Controls Overview
- **PLAY**: Start/stop playback.
- **CLEAR / RANDOM**: Reset or randomize the grid.
- **EUCLIDEAN**: Generates evenly-distributed rhythms (tied to current seed).
- **FRACTAL / AUTO FRACTAL**: Generate and optionally auto-regenerate fractal patterns per phrase.
- **PATTERN A/B**: Toggle between two stored patterns.
- **HUMANIZE**: Adds subtle timing, detune, and velocity variation.
- **MIDI MODE**: Toggle between Compatible (PPQ) and SMPTE (time-locked) export.
- **DOWNLOAD MIDI**: Exports the last N minutes (prompted).
- **SOUND BANK**: Switch between synth banks and bundled sample banks.
- **Pitch adjust**: Click-drag up/down on any block to set pitch offset (line marker).
- **M/S per row**: Mute or Solo each row. Pan and volume sliders are to the left.
- **Voice row**: The last row uses a formant-style synth that fades to zero between runs and ramps into the next pitch.

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
- `pattern` is **row-major**: index = `row * cols + col`.

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
This is the complete app state saved to LocalStorage. You can export/import it if you want full restoration.

**Top-level fields**
- `rows`: integer
- `cols`: integer
- `rowMute`: boolean array, length `rows`
- `rowSolo`: boolean array, length `rows`
- `rowPanValues`: number array, length `rows` (typically -1..1)
- `rowGainValues`: number array, length `rows` (typically 0..1)
- `buttons`: boolean array, length `rows * cols` (same ordering as `pattern`)
- `currentPattern`: `"A"` or `"B"`
- `patternSlots`: object with optional `A` and `B` arrays (boolean array length `rows * cols`)
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
- `soundBankId`: string
- `midiMode`: number (index into MIDI mode list)

**Notes**
- Missing fields fall back to current UI defaults.
- If `patternSlots` is present, the app will restore the current pattern from it.

### Schemas And Examples
- JSON Schemas: `schema/pattern.schema.json`, `schema/state.schema.json`
- Examples: `examples/pattern-example.json`, `examples/state-example.json`
- Validate: `npm run validate:schema`

### Sound Banks
- Built-in synth banks are defined in `index.html`.
- Sample banks live under `assets/samples/` and are bundled in this repo.
