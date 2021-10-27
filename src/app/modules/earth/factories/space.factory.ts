import { FactoryObject3D } from '@shared/models/factory.model';
import { SkyboxStarsTextureLoader } from '../loaders/skybox-stars-texture.loader';
import { Space } from '../objects3d';

export class SpaceFactory implements FactoryObject3D {
  create(): Space {
    const space = new Space();
    const loader = new SkyboxStarsTextureLoader();
    space.background = loader.getTexture();

    return space;
  }
}
