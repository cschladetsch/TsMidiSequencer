export type ButtonState = {
  note: number;
  color: string;
  active: boolean;
  velocity: number;
};

export class GridState {
  private buttons: ButtonState[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    // Initialize 8x8 grid (64 buttons, notes 0-63)
    for (let i = 0; i < 64; i++) {
      this.buttons[i] = {
        note: i,
        color: '#2a2a2a',  // Visible dark gray instead of nearly black
        active: false,
        velocity: 0
      };
    }
  }

  getButton(index: number): ButtonState {
    return this.buttons[index];
  }

  setButton(index: number, color: string, active: boolean, velocity: number = 127) {
    this.buttons[index] = { ...this.buttons[index], color, active, velocity };
    this.notify();
  }

  toggleButton(index: number) {
    const btn = this.buttons[index];
    const newState = !btn.active;
    this.setButton(
      index,
      newState ? '#0f0' : '#2a2a2a',  // Green when active, visible gray when off
      newState,
      newState ? 127 : 0
    );
  }

  clear() {
    for (let i = 0; i < 64; i++) {
      this.setButton(i, '#2a2a2a', false, 0);
    }
  }

  onChange(callback: () => void) {
    this.listeners.add(callback);
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }
}
