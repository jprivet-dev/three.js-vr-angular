import { StoreService } from '@core/store/store.service';
import { MeshPhongMaterial, SphereGeometry } from 'three';
import { FactoryObject3D } from '../../../../models/factory.model';
import { Earth } from './earth';
import { EarthTextureLoader } from './earth-texture.loader';

export class EarthFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): Earth {
    const geometry = new SphereGeometry(1, 64, 32);
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
