import { FactoryObject3D } from '@shared/models/factory.model';
import { SkyboxStarsTextureLoader, Space } from '../threejs';

export class SpaceFactory implements FactoryObject3D {
  create(): Space {
    const space = new Space();
    const loader = new SkyboxStarsTextureLoader();
    space.background = loader.getTexture();

    return space;
  }
}
