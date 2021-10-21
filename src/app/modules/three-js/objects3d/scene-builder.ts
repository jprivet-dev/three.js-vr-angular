import { Scene } from 'three';
import { SceneDecorator } from './scene-decorator';

export class SceneBuilder {
  private decorator!: SceneDecorator;

  createDecorator(): SceneDecorator {
    const scene: Scene = new Scene();
    this.decorator = new SceneDecorator(scene);
    return this.decorator;
  }
}
