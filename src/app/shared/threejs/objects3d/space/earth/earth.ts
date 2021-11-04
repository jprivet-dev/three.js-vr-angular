import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { Material } from 'three/src/materials/Material';
import { AxialTilt } from '../../../../constants';
import { Loop } from '../../../managers';
import { Planet } from '../../../models';

export class Earth extends Planet implements Loop {
  constructor(geometry: BufferGeometry, material: Material) {
    super(geometry, material);
    this.setAxialTilt(AxialTilt.Earth);
  }

  loop(delta: number) {
    this.rotateOrbitalAxis(delta, 5);
  }
}
