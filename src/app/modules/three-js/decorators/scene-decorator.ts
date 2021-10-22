import { Object3D, Scene } from 'three';

export class SceneDecorator {
  constructor(private _scene: Scene) {}

  get scene(): Scene {
    return this._scene;
  }

  add(object: Object3D): void {
    this._scene.add(object);
  }
}
