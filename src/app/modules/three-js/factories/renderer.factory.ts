import { WebGLRenderer } from 'three';
import {
  CameraDecorator,
  ContainerDecorator,
  RendererDecorator,
  SceneDecorator,
} from '../decorators';

// Here abstract is it a good idea ?
export abstract class RendererFactory {
  static create(
    container: ContainerDecorator,
    scene: SceneDecorator,
    camera: CameraDecorator
  ): RendererDecorator {
    const renderer = new WebGLRenderer();
    return new RendererDecorator(container, scene, camera, renderer);
  }
}
