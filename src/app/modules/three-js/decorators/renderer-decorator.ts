import { WebGLRenderer } from 'three';
import { Resize } from '../models/resize';
import { CameraDecorator } from './camera-decorator';
import { ContainerDecorator } from './container-decorator';
import { SceneDecorator } from './scene-decorator';

export class RendererDecorator implements Resize {
  constructor(private _renderer: WebGLRenderer) {}

  get renderer(): WebGLRenderer {
    return this._renderer;
  }

  start(
    containerDecorator: ContainerDecorator,
    sceneDecorator: SceneDecorator,
    cameraDecorator: CameraDecorator
  ): void {
    this.resize(containerDecorator);
    this.render(sceneDecorator, cameraDecorator);
    containerDecorator.appendChild(this._renderer.domElement);
  }

  render(
    sceneDecorator: SceneDecorator,
    cameraDecorator: CameraDecorator
  ): void {
    this._renderer.render(sceneDecorator.scene, cameraDecorator.camera);
  }

  resize(containerDecorator: ContainerDecorator): void {
    this._renderer.setSize(
      containerDecorator.width(),
      containerDecorator.height()
    );
  }
}
