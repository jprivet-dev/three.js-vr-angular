import { PerspectiveCamera } from 'three';
import { CameraDecorator } from '../decorators/camera-decorator';
import { ContainerDecorator } from '../decorators/container-decorator';

export abstract class CameraBuilder {
  static create(container: ContainerDecorator): CameraDecorator {
    return new CameraDecorator(container, this.newCamera(container));
  }

  private static newCamera(container: ContainerDecorator): PerspectiveCamera {
    const camera = new PerspectiveCamera(50, container.ratio(), 0.1, 10);

    camera.position.set(0, 0, 5);

    return camera;
  }
}
