import { GridState } from './state';
import { GridRenderer } from './grid';
import { MidiController } from './midi';

const state = new GridState();
const midi = new MidiController();

const canvas = document.getElementById('grid') as HTMLCanvasElement;
const midiInSelect = document.getElementById('midiIn') as HTMLSelectElement;
const midiOutSelect = document.getElementById('midiOut') as HTMLSelectElement;
const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;
const statusEl = document.getElementById('status') as HTMLSpanElement;

const grid = new GridRenderer(canvas, state);

// Handle grid clicks
grid.onClick((index) => {
  state.toggleButton(index);
  const btn = state.getButton(index);
  midi.sendNote(btn.note, btn.velocity);
});

// Handle incoming MIDI
midi.onNoteEvent((note, velocity) => {
  if (note >= 0 && note < 64) {
    state.setButton(
      note,
      velocity > 0 ? '#0f0' : '#111',
      velocity > 0,
      velocity
    );
  }
});

// Initialize MIDI
async function initMidi() {
  const supported = await midi.init();
  if (!supported) {
    statusEl.textContent = 'Web MIDI not supported';
    statusEl.style.color = '#f00';
    return;
  }

  const devices = await midi.getDevices();
  
  // Populate dropdowns
  midiInSelect.innerHTML = '<option>Select MIDI Input</option>';
  devices.inputs.forEach(input => {
    const option = document.createElement('option');
    option.value = input.id;
    option.textContent = input.name || 'Unknown';
    midiInSelect.appendChild(option);
  });

  midiOutSelect.innerHTML = '<option>Select MIDI Output</option>';
  devices.outputs.forEach(output => {
    const option = document.createElement('option');
    option.value = output.id;
    option.textContent = output.name || 'Unknown';
    midiOutSelect.appendChild(option);
  });

  // Handle device selection
  midiInSelect.addEventListener('change', () => {
    const input = devices.inputs.find(d => d.id === midiInSelect.value);
    if (input) {
      midi.setInput(input);
      statusEl.textContent = `Input: ${input.name}`;
      statusEl.style.color = '#0f0';
    }
  });

  midiOutSelect.addEventListener('change', () => {
    const output = devices.outputs.find(d => d.id === midiOutSelect.value);
    if (output) {
      midi.setOutput(output);
      statusEl.textContent = `Output: ${output.name}`;
      statusEl.style.color = '#0f0';
    }
  });

  statusEl.textContent = 'Ready';
  statusEl.style.color = '#0f0';
}

clearBtn.addEventListener('click', () => state.clear());

initMidi();
