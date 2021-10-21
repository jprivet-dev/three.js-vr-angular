import { WebGLRenderer } from 'three';
import { CameraDecorator } from './camera-decorator';
import { SceneDecorator } from './scene-decorator';

export class RendererDecorator {
  constructor(
    private sceneDecorator: SceneDecorator,
    private cameraDecorator: CameraDecorator,
    private _renderer: WebGLRenderer
  ) {}

  get renderer(): WebGLRenderer {
    return this._renderer;
  }

  render(): void {
    this._renderer.render(this.sceneDecorator.scene, this.cameraDecorator.camera);
  }
}
