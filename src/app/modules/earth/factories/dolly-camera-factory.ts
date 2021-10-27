import { Container } from '@shared/models/container.model';
import { Factory } from '@shared/models/factory.model';
import { DollyCameraParams } from '../models/earth.model';
import { DollyCamera } from '../objects3d/dolly-camera';

export class DollyCameraFactory implements Factory {
  constructor(private container: Container) {}

  create(): DollyCamera {
    const params: DollyCameraParams = {
      fov: 80,
      aspect: this.container.ratio(),
      near: 1,
      far: 8000,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    };

    return new DollyCamera(params);
  }
}
