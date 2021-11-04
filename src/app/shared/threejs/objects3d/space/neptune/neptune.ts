import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { Material } from 'three/src/materials/Material';
import { AxialTilt } from '../../../../constants';
import { Loop } from '../../../managers/loop.model';
import { Planet } from '../../../models';

export class Neptune extends Planet implements Loop {
  constructor(geometry: BufferGeometry, material: Material) {
    super(geometry, material);
    this.setAxialTilt(AxialTilt.Neptune);
  }

  loop(delta: number) {
    this.rotateOrbitalAxis(delta, 5);
  }
}
