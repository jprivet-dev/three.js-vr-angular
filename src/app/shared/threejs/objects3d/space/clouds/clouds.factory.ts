import { StoreService } from '@core/store/store.service';
import { MeshPhongMaterial, SphereGeometry } from 'three';
import { FactoryObject3D } from '../../../models';
import { Clouds } from './clouds';
import { CloudsTextureLoader } from './clouds-texture.loader';

export class CloudsFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): Clouds {
    const geometry = new SphereGeometry(1.005, 64, 32);
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
