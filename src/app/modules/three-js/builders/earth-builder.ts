import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';
import { Texture } from 'three/src/textures/Texture';
import { EarthDecorator } from '../decorators/earth-decorator';

export class EarthBuilder {
  private assetsPath = 'assets/textures/earth/';
  private textures = {
    map: 'earth_map_1024x512.jpg',
    bumpMap: 'earth_bump_1024x512.jpg',
    specularMap: 'earth_specular_1024x512.jpg',
  };

  create(): EarthDecorator {
    return new EarthDecorator(this.newEarth());
  }

  private newEarth(): Mesh {
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

  private loadTexture(filename: string): Texture {
    return new TextureLoader().load(this.path(filename));
  }

  private path(filename: string): string {
    return this.assetsPath + filename;
  }
}
