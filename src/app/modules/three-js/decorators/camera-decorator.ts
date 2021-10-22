import { PerspectiveCamera } from 'three';
import { Resize } from '../models/resize';
import { ContainerDecorator } from './container-decorator';

export class CameraDecorator implements Resize {
  constructor(
    private camera: PerspectiveCamera
  ) {}

  get object3D(): PerspectiveCamera {
    return this.camera;
  }

  resize(container: ContainerDecorator) {
    this.camera.aspect = container.ratio();
    this.camera.updateProjectionMatrix();
  }
}
