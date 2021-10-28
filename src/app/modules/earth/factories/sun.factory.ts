import { FactoryObject3D } from '@shared/models/factory.model';
import { Sun } from '../threejs/objects3d/sun';

export class SunFactory implements FactoryObject3D {
  create(): Sun {
    const sun = new Sun(0xffffff, 1.3);
    sun.position.set(-250, 0, -1000);

    return sun;
  }
}
