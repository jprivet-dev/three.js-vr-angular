import { StoreService } from '@core/store/store.service';
import { MeshPhongMaterial } from 'three';
import { RadiusRatioEarth } from '../../../../constants';
import { FactoryObject3D, PlanetGeometry } from '../../../models';
import { Earth } from './earth';
import { EarthTextureLoader } from './earth-texture.loader';

export class EarthFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): Earth {
    const geometry = new PlanetGeometry(RadiusRatioEarth.Earth);
    const material = new MeshPhongMaterial({
      wireframe: false,
      bumpScale: 0.01,
      specular: 0x2d4ea0,
      shininess: 6,
    });

    const loader = new EarthTextureLoader(material);

    this.store.definition$.subscribe((definition) => {
      loader.loadByDefinition(definition);
    });

    return new Earth(geometry, material);
  }
}
