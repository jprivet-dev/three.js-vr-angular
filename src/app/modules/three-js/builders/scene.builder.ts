import { Scene } from 'three';
import { SceneDecorator } from '../decorators';

// Here abstract is it a good idea ?
export abstract class SceneBuilder {
  static create(): SceneDecorator {
    const scene = new Scene();
    return new SceneDecorator(scene);
  }
}
