import { Animation } from '../../managers';
import { SCOAxialTilt } from './spherical-celestial-object.model';

export class SCOAnimation implements Animation {
  constructor(private object: SCOAxialTilt, private degrees: number) {}

  start() {}

  stop() {}

  animate(delta: number) {
    this.object.rotateOrbitalAxis(delta, this.degrees);
  }
}
