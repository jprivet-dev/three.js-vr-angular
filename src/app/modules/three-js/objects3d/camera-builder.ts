import { PerspectiveCamera } from 'three';
import { CameraDecorator } from './camera-decorator';

export class CameraBuilder {
  private decorator!: CameraDecorator;

  constructor(private container: Element) {}

  createDecorator(): CameraDecorator {
    const camera: PerspectiveCamera = new PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    this.decorator = new CameraDecorator(this.container, camera);
    return this.decorator;
  }
}
