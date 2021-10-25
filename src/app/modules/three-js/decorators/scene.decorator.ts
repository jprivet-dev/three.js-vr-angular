import { Scene } from 'three';
import { Animation } from '../models';
import { Decorator } from './decorator';
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

  add(...decorator: Decorator[]): this {
    decorator.map((d) => {
      this.scene.add(d.object());

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
