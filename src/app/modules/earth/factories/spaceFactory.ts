import { Factory } from '@shared/models/factory.model';
import { Space } from '../objects3d/space';

export class SpaceFactory implements Factory {
  private space!: Space;

  create(): Space {
    this.space = new Space();
    return this.space;
  }
}
