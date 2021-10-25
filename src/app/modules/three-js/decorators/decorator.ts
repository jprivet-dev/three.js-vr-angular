import { Object3D } from 'three';

// Here abstract is it a good idea ?
export abstract class Decorator {
  protected constructor(private _object: Object3D) {}

  object(): Object3D {
    return this._object;
  }

  add(decorator: Decorator) {
    this._object.add(decorator.object());
  }

  hasAnimation() {
    return 'animate' in this;
  }
}
