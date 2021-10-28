import { FactoryObject3D } from '@shared/models/factory.model';
import { MeshPhongMaterial, SphereGeometry } from 'three';
import { CloudsTextureLoader } from '../threejs';
import { Clouds } from '../threejs/objects3d/clouds';

export class CloudsFactory implements FactoryObject3D {
  create(): Clouds {
    const geometry = new SphereGeometry(1.005, 64, 32);
    const material = new MeshPhongMaterial({
      wireframe: false,
      color: 0xffffff,
      opacity: 0.9,
      transparent: true,
    });

    const loader = new CloudsTextureLoader(material);
    loader.loadByDefinition('sd');

    return new Clouds(geometry, material);
  }
}
