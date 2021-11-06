import { StoreService } from '@core/store/store.service';
import { FactoryObject3D } from '../../../models';
import { Stars } from './stars.model';
import { StarsTextureLoader } from './stars-texture.loader';

export class StarsFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): Stars {
    const stars = new Stars();
    const loader = new StarsTextureLoader();

    this.store.definition$.subscribe((definition) => {
      stars.background = loader.getTextureByDefinition(definition);
    });

    return stars;
  }
}
