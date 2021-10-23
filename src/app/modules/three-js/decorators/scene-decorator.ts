import { Scene } from 'three';
import { Animation } from '../models/three-js.model';
import { Object3DDecorator } from './object-3d-decorator';

export class SceneDecorator {
  private animationList: Animation[] = [];

  constructor(private scene: Scene) {}

  get object3D(): Scene {
    return this.scene;
  }

  add(decorator: Object3DDecorator): void {
    this.scene.add(decorator.object3D);

    if (decorator.hasAnimation()) {
      this.addObjectWithAnimation(decorator as unknown as Animation);
    }
  }

  addObjectWithAnimation(object: Animation): void {
    this.animationList.push(object);
  }

  animate(delta: number): void {
    this.animationList.forEach((object) => object.animate(delta));
  }
}
