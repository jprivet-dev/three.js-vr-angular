import { Mesh } from 'three';
import { Loop } from '@shared/threejs/managers/loop.model';

export class Clouds extends Mesh implements Loop {
  private rotationsYPerSecond = -0.0015;

  loop(delta: number) {
    this.rotation.y += delta * 2 * Math.PI * this.rotationsYPerSecond;
  }
}