import { Mesh } from 'three';
import { Animation } from '../models/three-js.model';
import { Object3DDecorator } from './object-3d.decorator';

export class CubeDecorator extends Object3DDecorator implements Animation {
  constructor(mesh: Mesh) {
    super(mesh);
  }

  animate(delta: number): void {
    const step = delta * 0.1;
    this.object3D().rotation.x += step;
    this.object3D().rotation.y += step;
  }
}
