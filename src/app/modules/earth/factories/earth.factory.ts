import { FactoryObject3D } from '@shared/models/factory.model';
import { MeshPhongMaterial, SphereGeometry } from 'three';
import { Earth, EarthTextureLoader } from '../threejs';

export class EarthFactory implements FactoryObject3D {
  create(): Earth {
    const geometry = new SphereGeometry(1, 64, 32);
    const material = new MeshPhongMaterial({
      wireframe: false,
      bumpScale: 0.01,
      specular: 0x2d4ea0,
      shininess: 6,
    });

    const loader = new EarthTextureLoader(material);
    loader.loadByDefinition('sd');

    return new Earth(geometry, material);
  }
}
