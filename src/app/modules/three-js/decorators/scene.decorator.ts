import { Scene } from 'three';
import { Animation } from '../models';
import { Object3DDecorator } from './object-3d.decorator';
import { SkyboxDecorator } from './skybox.decorator';

export class SceneDecorator {
  private animationList: Animation[] = [];

  constructor(private scene: Scene) {}

  object3D(): Scene {
    return this.scene;
  }

  setSkybox(skybox: SkyboxDecorator): this {
    this.scene.background = skybox.cubeTexture;
    return this;
  }

  add(...decorator: Object3DDecorator[]): this {
    decorator.map((d) => {
      this.scene.add(d.object3D());

      if (d.hasAnimation()) {
        this.addObjectWithAnimation(d as unknown as Animation);
      }
    });

    return this;
  }

  animate(delta: number): void {
    this.animationList.forEach((object) => object.animate(delta));
  }

  private addObjectWithAnimation(object: Animation): void {
    this.animationList.push(object);
  }
}
