import { Scene } from 'three';
import { Object3DDecorator } from './object-3d-decorator';

export class SceneDecorator {
  constructor(private _scene: Scene) {}

  get scene(): Scene {
    return this._scene;
  }

  add(decorator: Object3DDecorator): void {
    this._scene.add(decorator.object3D());
  }
}
