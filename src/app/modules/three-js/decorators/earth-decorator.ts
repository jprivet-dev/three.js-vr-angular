import { Mesh } from 'three';
import { Animation } from '../models/three-js.model';
import { Object3DDecorator } from './object-3d-decorator';

export class EarthDecorator extends Object3DDecorator implements Animation {
  constructor(mesh: Mesh) {
    super(mesh);
  }

  animate(delta: number): void {}
}
