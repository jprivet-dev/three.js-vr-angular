import { StoreService } from '@core/store/store.service';
import { MeshPhongMaterial } from 'three';
import { RadiusRatioEarth } from '../../../../constants';
import { FactoryObject3D, PlanetGeometry } from '../../../models';
import { Clouds } from './clouds';
import { CloudsTextureLoader } from './clouds-texture.loader';

export class CloudsFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): Clouds {
    const geometry = new PlanetGeometry(RadiusRatioEarth.Earth + 0.005);
    const material = new MeshPhongMaterial({
      wireframe: false,
      color: 0xffffff,
      opacity: 0.9,
      transparent: true,
    });

    const loader = new CloudsTextureLoader(material);

    this.store.definition$.subscribe((definition) => {
      loader.loadByDefinition(definition);
    });

    return new Clouds(geometry, material);
  }
}
