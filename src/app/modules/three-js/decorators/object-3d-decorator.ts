import { Object3D } from 'three';

export abstract class Object3DDecorator {
  protected constructor(private object: Object3D) {}

  object3D(): Object3D {
    return this.object;
  }

  hasAnimation() {
    return 'animate' in this;
  }
}