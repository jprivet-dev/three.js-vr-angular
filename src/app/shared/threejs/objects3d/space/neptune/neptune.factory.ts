import { StoreService } from '@core/store/store.service';
import { MeshPhongMaterial } from 'three';
import { RadiusRatioEarth } from '../../../../constants';
import { FactoryObject3D, PlanetGeometry } from '../../../models';
import { Neptune } from './neptune';
import { NeptuneTextureLoader } from './neptune-texture.loader';

export class NeptuneFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): Neptune {
    const geometry = new PlanetGeometry(RadiusRatioEarth.Neptune);
    const material = new MeshPhongMaterial({
      wireframe: false,
      specular: 0x2d4ea0,
      shininess: 6,
    });

    const loader = new NeptuneTextureLoader(material);

    this.store.definition$.subscribe((definition) => {
      loader.loadByDefinition(definition);
    });

    return new Neptune(geometry, material);
  }
}
