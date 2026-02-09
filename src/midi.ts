export class MidiController {
  private input?: MIDIInput;
  private output?: MIDIOutput;
  private onMessage?: (note: number, velocity: number) => void;

  async init(): Promise<boolean> {
    try {
      const access = await navigator.requestMIDIAccess();
      return true;
    } catch (err) {
      console.error('Web MIDI not supported:', err);
      return false;
    }
  }

  async getDevices(): Promise<{ inputs: MIDIInput[], outputs: MIDIOutput[] }> {
    const access = await navigator.requestMIDIAccess();
    return {
      inputs: Array.from(access.inputs.values()),
      outputs: Array.from(access.outputs.values())
    };
  }

  setInput(input: MIDIInput) {
    if (this.input) {
      this.input.onmidimessage = null;
    }
    this.input = input;
    this.input.onmidimessage = (e) => this.handleMessage(e);
  }

  setOutput(output: MIDIOutput) {
    this.output = output;
  }

  onNoteEvent(callback: (note: number, velocity: number) => void) {
    this.onMessage = callback;
  }

  sendNote(note: number, velocity: number) {
    if (!this.output) return;
    const status = velocity > 0 ? 0x90 : 0x80; // Note on/off
    this.output.send([status, note, velocity]);
  }

  private handleMessage(e: MIDIMessageEvent) {
    const [status, note, velocity] = e.data;
    const msgType = status & 0xf0;
    
    if (msgType === 0x90 || msgType === 0x80) { // Note on/off
      this.onMessage?.(note, msgType === 0x90 ? velocity : 0);
    }
  }
}
