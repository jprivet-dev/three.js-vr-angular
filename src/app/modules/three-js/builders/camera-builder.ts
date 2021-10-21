import { PerspectiveCamera } from 'three';
import { CameraDecorator } from '../decorators/camera-decorator';
import { ContainerDecorator } from '../decorators/container-decorator';

export class CameraBuilder {
  private decorator!: CameraDecorator;

  createDecorator(containerDecorator: ContainerDecorator): CameraDecorator {
    const camera: PerspectiveCamera = new PerspectiveCamera(
      75,
      containerDecorator.ratio(),
      0.1,
      1000
    );
    camera.position.z = 5;

    this.decorator = new CameraDecorator(containerDecorator, camera);
    return this.decorator;
  }
}
