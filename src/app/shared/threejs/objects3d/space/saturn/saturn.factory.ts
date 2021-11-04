import { StoreService } from '@core/store/store.service';
import { MeshPhongMaterial } from 'three';
import { RadiusRatioEarth } from '../../../../constants';
import { FactoryObject3D, PlanetGeometry } from '../../../models';
import { Saturn } from './saturn';
import { SaturnTextureLoader } from './saturn-texture.loader';

export class SaturnFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): Saturn {
    const geometry = new PlanetGeometry(RadiusRatioEarth.Saturn);
    const material = new MeshPhongMaterial({
      wireframe: false,
      specular: 0x2d4ea0,
      shininess: 6,
    });

    const loader = new SaturnTextureLoader(material);

    this.store.definition$.subscribe((definition) => {
      loader.loadByDefinition(definition);
    });

    return new Saturn(geometry, material);
  }
}
