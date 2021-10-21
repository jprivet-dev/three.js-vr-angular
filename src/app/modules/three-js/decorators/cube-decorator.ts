import { Mesh } from 'three';
import { Animation } from '../models/animation';

export class CubeDecorator implements Animation {
  constructor(private _cube: Mesh) {}

  get cube(): Mesh {
    return this._cube;
  }

  animate(): void {
    this._cube.rotation.x += 0.01;
    this._cube.rotation.y += 0.01;
  }
}
