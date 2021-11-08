import { Mesh } from 'three';
import { LoopWithCallback, LoopCallback } from '../managers';

export class MeshWithCallback extends Mesh implements LoopWithCallback {
  protected loopCallback!: LoopCallback;

  setLoopCallback(callback: LoopCallback): void {
    this.loopCallback = callback;
  }

  loop(delta: number): void {
    this.loopCallback(delta);
  }
}
