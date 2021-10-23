import { PerspectiveCamera } from 'three';
import { Resize } from '../models/three-js.model';
import { ContainerDecorator } from './container.decorator';

export class CameraDecorator implements Resize {
  constructor(
    private container: ContainerDecorator,
    private camera: PerspectiveCamera
  ) {}

  object3D(): PerspectiveCamera {
    return this.camera;
  }

  resize() {
    this.camera.aspect = this.container.ratio();
    this.camera.updateProjectionMatrix();
  }
}
