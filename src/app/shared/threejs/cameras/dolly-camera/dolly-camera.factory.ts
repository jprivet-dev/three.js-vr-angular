import {
  Container,
  DollyCamera,
  DollyCameraParams,
  FactoryObject3D,
} from '../../index';

export class DollyCameraFactory implements FactoryObject3D {
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

    return new DollyCamera(this.container, params);
  }
}
