---
layout: default
title: Architecture
---

# Fractal Grid Sequencer Architecture

## Signal path

```mermaid
flowchart LR
    UI[Grid UI<br/>rows / columns] --> PAT[Pattern engine<br/>fractal / Euclidean rhythms]
    PAT --> MIX[Per-row mixer]
    MIX --> SND[Synth / sample banks]
    SND --> WA[Web Audio<br/>via Tone.js]
```
