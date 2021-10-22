import { PerspectiveCamera } from 'three';
import { CameraDecorator } from '../decorators/camera-decorator';
import { ContainerDecorator } from '../decorators/container-decorator';

export class CameraBuilder {
  private decorator!: CameraDecorator;

  create(containerDecorator: ContainerDecorator): CameraDecorator {
    const camera = this.newCamera(containerDecorator);
    this.decorator = new CameraDecorator(camera);
    return this.decorator;
  }

  private newCamera(containerDecorator: ContainerDecorator): PerspectiveCamera {
    const camera = new PerspectiveCamera(
      75,
      containerDecorator.ratio(),
      0.1,
      1000
    );

    camera.position.z = 5;

    return camera;
  }
}
