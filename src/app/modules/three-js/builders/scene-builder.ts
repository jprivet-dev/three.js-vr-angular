import { Scene } from 'three';
import { SceneDecorator } from '../decorators/scene-decorator';

export abstract class SceneBuilder {
  static create(): SceneDecorator {
    const scene = new Scene();
    return new SceneDecorator(scene);
  }
}
