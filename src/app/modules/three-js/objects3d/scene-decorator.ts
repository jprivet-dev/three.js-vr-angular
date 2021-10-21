import { Scene } from 'three';

export class SceneDecorator {
  constructor(private _scene: Scene) {}

  get scene(): Scene {
    return this._scene;
  }
}
