import {
  Container,
  DollyCamera,
  DollyCameraParams,
  FactoryDollyCamera,
} from '../../index';

export class DollyCameraFactory implements FactoryDollyCamera {
  constructor(private container: Container) {}

  create(params: DollyCameraParams): DollyCamera {
    return new DollyCamera(this.container, {
      ...params,
      aspect: this.container.ratio(),
    });
  }
}
