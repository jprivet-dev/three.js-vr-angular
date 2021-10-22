import { Scene } from 'three';
import { SceneDecorator } from '../decorators/scene-decorator';

export class SceneBuilder {
  create(): SceneDecorator {
    const scene = new Scene();
    return new SceneDecorator(scene);
  }
}
