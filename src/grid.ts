import type { GridState } from './state';

export class GridRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private buttonSize = 58;
  private gap = 2;
  private cols = 8;
  private rows = 8;

  constructor(canvas: HTMLCanvasElement, private state: GridState) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    
    // Handle clicks
    canvas.addEventListener('click', (e) => this.handleClick(e));
    
    // Redraw on state changes
    state.onChange(() => this.render());
    
    this.render();
  }

  private handleClick(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const col = Math.floor(x / (this.buttonSize + this.gap));
    const row = Math.floor(y / (this.buttonSize + this.gap));
    
    if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
      const index = row * this.cols + col;
      return index;
    }
    return -1;
  }

  onClick(callback: (index: number) => void) {
    this.canvas.addEventListener('click', (e) => {
      const index = this.handleClick(e);
      if (index >= 0) callback(index);
    });
  }

  render() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const index = row * this.cols + col;
        const button = this.state.getButton(index);
        
        const x = col * (this.buttonSize + this.gap);
        const y = row * (this.buttonSize + this.gap);
        
        // Button background
        this.ctx.fillStyle = button.color;
        this.ctx.fillRect(x, y, this.buttonSize, this.buttonSize);
        
        // Border
        this.ctx.strokeStyle = button.active ? '#fff' : '#333';
        this.ctx.lineWidth = button.active ? 2 : 1;
        this.ctx.strokeRect(x, y, this.buttonSize, this.buttonSize);
      }
    }
  }
}
