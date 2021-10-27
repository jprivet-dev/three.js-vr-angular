import { FactoryObject3D } from '@shared/models/factory.model';
import { Space } from '../objects3d';

export class SpaceFactory implements FactoryObject3D {
  create(): Space {
    return new Space();
  }
}
