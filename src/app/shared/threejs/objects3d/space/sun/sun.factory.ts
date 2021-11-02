import { FactoryObject3D } from '../../../models';
import { Sun } from './sun';

export class SunFactory implements FactoryObject3D {
  create(): Sun {
    const sun = new Sun(0xffffff, 1.3);
    sun.position.set(-250, 0, -1000);

    return sun;
  }
}
