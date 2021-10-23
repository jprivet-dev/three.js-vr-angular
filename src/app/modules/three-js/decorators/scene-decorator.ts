import { Color, CubeTexture, Scene, Texture } from 'three';
import { Animation } from '../models/three-js.model';
import { Object3DDecorator } from './object-3d-decorator';
import { SkyboxDecorator } from './skybox-decorator';

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

  animate(delta: number): void {
    this.animationList.forEach((object) => object.animate(delta));
  }

  addCubeTexture(cubeTexture: CubeTexture): void {
    this.scene.background = cubeTexture;
  }

  private addObjectWithAnimation(object: Animation): void {
    this.animationList.push(object);
  }
}
