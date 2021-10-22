import { Object3D } from 'three';

export class Object3DDecorator {
  constructor(private object: Object3D) {}

  get object3D(): Object3D {
    return this.object;
  }

  hasAnimation() {
    return 'animate' in this;
  }
}
