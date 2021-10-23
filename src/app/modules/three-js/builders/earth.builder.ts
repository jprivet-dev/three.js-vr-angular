import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';
import { EarthDecorator } from '../decorators';

export abstract class EarthBuilder {
  static create(): EarthDecorator {
    return new EarthDecorator(this.newEarth());
  }

  private static newEarth(): Mesh {
    const loader = new TextureLoader().setPath('assets/textures/earth/');
    const geometry = new SphereGeometry(1, 64, 32);
    const material = new MeshPhongMaterial({
      wireframe: false,
      bumpScale: 0.01,
      specular: 0x2d4ea0,
      shininess: 6,
      map: loader.load('earth_map_1024x512.jpg'),
      bumpMap: loader.load('earth_bump_1024x512.jpg'),
      specularMap: loader.load('earth_specular_1024x512.jpg'),
    });

    return new Mesh(geometry, material);
  }
}
