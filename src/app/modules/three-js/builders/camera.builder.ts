import { PerspectiveCamera } from 'three';
import { CameraDecorator, ContainerDecorator } from '../decorators';

export abstract class CameraBuilder {
  static create(container: ContainerDecorator): CameraDecorator {
    return new CameraDecorator(container, this.newCamera(container));
  }

  private static newCamera(container: ContainerDecorator): PerspectiveCamera {
    const camera = new PerspectiveCamera(80, container.ratio(), 1, 8000);
    camera.position.set(0, 0, 10);

    return camera;
  }
}
