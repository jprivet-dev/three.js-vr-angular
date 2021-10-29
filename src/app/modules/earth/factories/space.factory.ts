import { StoreService } from '@core/store/store.service';
import { FactoryObject3D } from '@shared/models/factory.model';
import { SkyboxStarsTextureLoader, Space } from '../threejs';

export class SpaceFactory implements FactoryObject3D {
  constructor(private store: StoreService) {
  }

  create(): Space {
    const space = new Space();
    const loader = new SkyboxStarsTextureLoader();

    this.store.definition$.subscribe((definition) => {
      space.background = loader.getTextureByDefinition(definition);
    });

    return space;
  }
}
