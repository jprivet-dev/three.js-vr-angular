import { PerspectiveCamera } from 'three';
import { CameraDecorator, ContainerDecorator } from '../decorators';

// Here abstract is it a good idea ?
export abstract class CameraFactory {
  static create(container: ContainerDecorator): CameraDecorator {
    return new CameraDecorator(container, this.newCamera(container));
  }

  private static newCamera(container: ContainerDecorator): PerspectiveCamera {
    const camera = new PerspectiveCamera(80, container.ratio(), 1, 8000);
    camera.position.set(0, 0, 5);

    return camera;
  }
}
