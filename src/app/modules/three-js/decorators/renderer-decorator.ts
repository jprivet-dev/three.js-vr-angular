import { WebGLRenderer } from 'three';
import { Resize } from '../models/resize';
import { CameraDecorator } from './camera-decorator';
import { ContainerDecorator } from './container-decorator';
import { SceneDecorator } from './scene-decorator';

export class RendererDecorator implements Resize {
  constructor(
    private containerDecorator: ContainerDecorator,
    private sceneDecorator: SceneDecorator,
    private cameraDecorator: CameraDecorator,
    private _renderer: WebGLRenderer
  ) {}

  get renderer(): WebGLRenderer {
    return this._renderer;
  }

  render(): void {
    this._renderer.render(
      this.sceneDecorator.scene,
      this.cameraDecorator.camera
    );
  }

  resize(): void {
    this._renderer.setSize(
      this.containerDecorator.width(),
      this.containerDecorator.height()
    )
  }
}
