import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';
import { Texture } from 'three/src/textures/Texture';
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
      map: this.loadTexture(loader, 'earth_map_1024x512.jpg'),
      bumpMap: this.loadTexture(loader, 'earth_bump_1024x512.jpg'),
      specularMap: this.loadTexture(loader, 'earth_specular_1024x512.jpg'),
    });

    return new Mesh(geometry, material);
  }

  private static loadTexture(loader: TextureLoader, filename: string): Texture {
    return loader.load(filename);
  }
}
