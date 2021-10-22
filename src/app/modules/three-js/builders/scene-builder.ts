import { Scene } from 'three';
import { SceneDecorator } from '../decorators/scene-decorator';

export class SceneBuilder {
  private decorator!: SceneDecorator;

  create(): SceneDecorator {
    const scene: Scene = new Scene();
    this.decorator = new SceneDecorator(scene);
    return this.decorator;
  }
}
