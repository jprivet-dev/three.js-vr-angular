import { Scene } from 'three';
import { Object3DDecorator } from './object-3d-decorator';

export class SceneDecorator {
  constructor(private scene: Scene) {}

  get object3D(): Scene {
    return this.scene;
  }

  add(decorator: Object3DDecorator): void {
    this.scene.add(decorator.object3D);
  }
}
