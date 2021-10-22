import { WebGLRenderer } from 'three';
import { Resize } from '../models/resize';
import { CameraDecorator } from './camera-decorator';
import { ContainerDecorator } from './container-decorator';
import { SceneDecorator } from './scene-decorator';

export class RendererDecorator implements Resize {
  constructor(private webGLRenderer: WebGLRenderer) {}

  start(
    container: ContainerDecorator,
    scene: SceneDecorator,
    camera: CameraDecorator
  ): void {
    this.resize(container);
    this.render(scene, camera);
    container.appendChild(this.webGLRenderer.domElement);
  }

  render(
    scene: SceneDecorator,
    camera: CameraDecorator
  ): void {
    this.webGLRenderer.render(scene.object3D, camera.object3D);
  }

  resize(container: ContainerDecorator): void {
    this.webGLRenderer.setSize(
      container.width(),
      container.height()
    );
  }
}
