import { Object3D } from 'three';

export class Object3DDecorator {
  constructor(private object: Object3D) {}

  object3D(): Object3D {
    return this.object;
  }

  hasAnimation() {
    return 'animate' in this;
  }
}
