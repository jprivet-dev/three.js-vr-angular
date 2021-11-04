import { StoreService } from '@core/store/store.service';
import { MeshPhongMaterial } from 'three';
import { RadiusRatioEarth } from '../../../../constants';
import { FactoryObject3D, PlanetGeometry } from '../../../models';
import { Mars } from './mars';
import { MarsTextureLoader } from './mars-texture.loader';

export class MarsFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): Mars {
    const geometry = new PlanetGeometry(RadiusRatioEarth.Mars);
    const material = new MeshPhongMaterial({
      wireframe: false,
      specular: 0x2d4ea0,
      shininess: 6,
    });

    const loader = new MarsTextureLoader(material);

    this.store.definition$.subscribe((definition) => {
      loader.loadByDefinition(definition);
    });

    return new Mars(geometry, material);
  }
}
