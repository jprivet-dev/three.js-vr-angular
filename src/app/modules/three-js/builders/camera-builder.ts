import { PerspectiveCamera } from 'three';
import { CameraDecorator } from '../decorators/camera-decorator';
import { ContainerDecorator } from '../decorators/container-decorator';

export class CameraBuilder {
  create(containerDecorator: ContainerDecorator): CameraDecorator {
    const camera = this.newCamera(containerDecorator);
    return new CameraDecorator(camera);
  }

  private newCamera(containerDecorator: ContainerDecorator): PerspectiveCamera {
    const camera = new PerspectiveCamera(
      50,
      containerDecorator.ratio(),
      0.1,
      10
    );

    camera.position.set( 0, 0, 5 );

    return camera;
  }
}
