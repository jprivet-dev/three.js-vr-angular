import { DirectionalLight } from 'three';
import { Object3DDecorator } from './object-3d-decorator';

export class SunDecorator extends Object3DDecorator {
  constructor(light: DirectionalLight) {
    super(light);
  }
}
