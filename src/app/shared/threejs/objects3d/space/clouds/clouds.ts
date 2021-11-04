import { Loop } from '../../../managers';
import { Planet } from '../../../models';

export class Clouds extends Planet implements Loop {
  loop(delta: number) {
    this.rotateOrbitalAxis(delta, 4);
  }
}
