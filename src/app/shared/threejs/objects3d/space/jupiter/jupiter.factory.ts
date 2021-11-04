import { StoreService } from '@core/store/store.service';
import { MeshPhongMaterial } from 'three';
import { RadiusRatioEarth } from '../../../../constants';
import { FactoryObject3D, PlanetGeometry } from '../../../models';
import { Jupiter } from './jupiter';
import { JupiterTextureLoader } from './jupiter-texture.loader';

export class JupiterFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): Jupiter {
    const geometry = new PlanetGeometry(RadiusRatioEarth.Jupiter);
    const material = new MeshPhongMaterial({
      wireframe: false,
      specular: 0x2d4ea0,
      shininess: 6,
    });

    const loader = new JupiterTextureLoader(material);

    this.store.definition$.subscribe((definition) => {
      loader.loadByDefinition(definition);
    });

    return new Jupiter(geometry, material);
  }
}
