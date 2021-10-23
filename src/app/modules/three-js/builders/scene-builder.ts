import { Scene } from 'three';
import { SceneDecorator } from '../decorators';

export abstract class SceneBuilder {
  static create(): SceneDecorator {
    const scene = new Scene();
    return new SceneDecorator(scene);
  }
}
