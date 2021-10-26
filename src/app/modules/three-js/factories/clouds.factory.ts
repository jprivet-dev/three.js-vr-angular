import { StoreService } from '@core/store/store.service';
import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';
import { Texture } from 'three/src/textures/Texture';
import { CloudsDecorator } from '../decorators';

// Here abstract is it a good idea ?
export abstract class CloudsFactory {
  private static config = {
    assetsPath: 'assets/textures/clouds/',
    alphaMap: 'clouds_1024x512.jpg',
  };

  static create(store: StoreService): CloudsDecorator {
    return new CloudsDecorator(store, this.newClouds());
  }

  private static newClouds(): Mesh {
    const geometry = new SphereGeometry(1.01, 64, 32);

    const material = new MeshPhongMaterial({
      wireframe: false,
      color: 0xffffff,
      opacity: 0.9,
      transparent: true,
      alphaMap: this.loadTexture(this.config.alphaMap),
    });

    return new Mesh(geometry, material);
  }

  private static loadTexture(filename: string): Texture {
    return new TextureLoader().load(this.path(filename));
  }

  private static path(filename: string): string {
    return this.config.assetsPath + filename;
  }
}
