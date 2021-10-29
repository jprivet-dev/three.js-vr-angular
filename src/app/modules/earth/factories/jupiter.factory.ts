import { StoreService } from '@core/store/store.service';
import { FactoryObject3D } from '@shared/models/factory.model';
import { MeshPhongMaterial, SphereGeometry } from 'three';
import { Jupiter, JupiterTextureLoader } from '../threejs';

export class JupiterFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): Jupiter {
    const geometry = new SphereGeometry(11.2, 64, 32);
    const material = new MeshPhongMaterial({
      wireframe: false,
      specular: 0x2d4ea0,
      shininess: 6,
    });

    const loader = new JupiterTextureLoader(material);

    this.store.definition$.subscribe((definition) => {
      loader.loadByDefinition(definition);
    });

    const jupiter = new Jupiter(geometry, material);
    jupiter.position.set(13, 0, 0);

    return jupiter;
  }
}
