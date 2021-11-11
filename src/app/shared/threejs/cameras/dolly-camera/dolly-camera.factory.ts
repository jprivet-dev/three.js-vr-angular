import { Container, FactoryDollyCamera } from '../../models';
import { DollyCamera } from './dolly-camera';
import { DollyCameraParams } from './dolly-camera.model';

export class DollyCameraFactory implements FactoryDollyCamera {
  constructor(private container: Container) {}

  create(params: DollyCameraParams): DollyCamera {
    return new DollyCamera(this.container, {
      ...params,
      aspect: this.container.ratio(),
    });
  }
}
