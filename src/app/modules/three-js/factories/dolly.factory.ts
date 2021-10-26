import { Object3D } from 'three';
import { CameraDecorator, DollyDecorator } from '../decorators';

// Here abstract is it a good idea ?
export abstract class DollyFactory {
  static create(camera: CameraDecorator): DollyDecorator {
    const dolly = new Object3D();
    dolly.position.set(0, 0, 0);
    dolly.add(camera.object());

    const dummyCam = new Object3D();
    camera.object().add(dummyCam);

    return new DollyDecorator(dolly);
  }
}
