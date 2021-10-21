import { WebGLRenderer } from 'three';
import { CameraDecorator } from '../decorators/camera-decorator';
import { ContainerDecorator } from '../decorators/container-decorator';
import { RendererDecorator } from '../decorators/renderer-decorator';
import { SceneDecorator } from '../decorators/scene-decorator';

export class RendererBuilder {
  private decorator!: RendererDecorator;

  createDecorator(
    window: Window,
    containerDecorator: ContainerDecorator,
    sceneDecorator: SceneDecorator,
    cameraDecorator: CameraDecorator
  ): RendererDecorator {
    const renderer: WebGLRenderer = new WebGLRenderer();
    this.decorator = new RendererDecorator(
      containerDecorator,
      sceneDecorator,
      cameraDecorator,
      renderer
    );
    return this.decorator;
  }
}
