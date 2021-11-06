import { Mesh as ThreeMesh } from 'three';
import { Loop, LoopCallback } from '../managers';

export class Mesh extends ThreeMesh implements Loop {
  protected loopCallback!: LoopCallback;

  setLoopCallback(callback: LoopCallback): void {
    this.loopCallback = callback;
  }

  hasLoopCallback(): boolean {
    return this.loopCallback !== undefined;
  }

  loop(delta: number): void {
    this.loopCallback(delta);
  }
}
