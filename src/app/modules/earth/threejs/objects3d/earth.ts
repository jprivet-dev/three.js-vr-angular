import { Mesh } from 'three';
import { Loop } from '../../models/loop.model';

export class Earth extends Mesh implements Loop {
  private rotationsYPerSecond = 0.01;

  loop(delta: number) {
    this.rotation.y += delta * 2 * Math.PI * this.rotationsYPerSecond;
  }
}
