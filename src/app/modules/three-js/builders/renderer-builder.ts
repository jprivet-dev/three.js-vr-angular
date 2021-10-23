import { WebGLRenderer } from 'three';
import { CameraDecorator, ContainerDecorator, SceneDecorator } from '../decorators';
import { RendererDecorator } from '../decorators/renderer-decorator';

export abstract class RendererBuilder {
  static create(
    container: ContainerDecorator,
    scene: SceneDecorator,
    camera: CameraDecorator
  ): RendererDecorator {
    const renderer = new WebGLRenderer();
    return new RendererDecorator(container, scene, camera, renderer);
  }
}
