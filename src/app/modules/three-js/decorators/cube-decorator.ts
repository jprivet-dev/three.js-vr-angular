import { Mesh } from 'three';
import { Animation } from '../models/animation';
import { Object3DDecorator } from './object-3d-decorator';

export class CubeDecorator extends Object3DDecorator implements Animation {
  constructor(cube: Mesh) {
    super(cube);
  }

  animate(): void {
    this.object3D().rotation.x += 0.01;
    this.object3D().rotation.y += 0.01;
  }
}
