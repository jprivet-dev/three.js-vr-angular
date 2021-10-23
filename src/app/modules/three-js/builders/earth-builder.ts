import { Mesh, MeshPhongMaterial, SphereGeometry } from 'three';
import { EarthDecorator } from '../decorators/earth-decorator';

export class EarthBuilder {
  create(): EarthDecorator {
    const geometry = new SphereGeometry(1, 64, 52);

    const material = new MeshPhongMaterial({
      wireframe: false,
      bumpScale: 0.45,
      specular: 0x2d4ea0,
      shininess: 6
    })

    const mesh = new Mesh(geometry, material);

    return new EarthDecorator(mesh);
  }
}
