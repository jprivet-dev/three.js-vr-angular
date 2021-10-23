import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';
import { Texture } from 'three/src/textures/Texture';
import { EarthDecorator } from '../decorators';

export abstract class EarthBuilder {
  private static assetsPath = 'assets/textures/earth/';
  private static textures = {
    map: 'earth_map_1024x512.jpg',
    bumpMap: 'earth_bump_1024x512.jpg',
    specularMap: 'earth_specular_1024x512.jpg',
  };

  static create(): EarthDecorator {
    return new EarthDecorator(this.newEarth());
  }

  private static newEarth(): Mesh {
    const geometry = new SphereGeometry(1, 64, 52);

    const material = new MeshPhongMaterial({
      wireframe: false,
      bumpScale: 0.02,
      specular: 0x2d4ea0,
      shininess: 6,
      map: this.loadTexture(this.textures.map),
      bumpMap: this.loadTexture(this.textures.bumpMap),
      specularMap: this.loadTexture(this.textures.specularMap),
    });

    return new Mesh(geometry, material);
  }

  private static loadTexture(filename: string): Texture {
    return new TextureLoader().load(this.path(filename));
  }

  private static path(filename: string): string {
    return this.assetsPath + filename;
  }
}
