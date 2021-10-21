import { WebGLRenderer } from 'three';
import { CameraDecorator } from './camera-decorator';
import { RendererDecorator } from './renderer-decorator';
import { SceneDecorator } from './scene-decorator';

export class RendererBuilder {
  private decorator!: RendererDecorator;

  constructor(
    private window: Window,
    private container: Element,
    private sceneDecorator: SceneDecorator,
    private cameraDecorator: CameraDecorator
  ) {}

  createDecorator(): RendererDecorator {
    const renderer: WebGLRenderer = new WebGLRenderer();
    this.decorator = new RendererDecorator(this.sceneDecorator, this.cameraDecorator, renderer);
    return this.decorator;
  }
}
