import { TextureDef } from '@core/store/store.model';
import { StoreService } from '@core/store/store.service';
import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';
import { Texture } from 'three/src/textures/Texture';
import { EarthDecorator } from '../decorators';
import {
  EarthTextures,
  EarthTexturesKey,
} from '../models/three-js.model';

export abstract class EarthBuilder {
  private static textures: EarthTextures = {
    map: {
      sd: 'earth_map_1024x512.jpg',
      hd: 'earth_map_1024x512.jpg',
    },
    bumpMap: {
      sd: 'earth_bump_1024x512.jpg',
      hd: 'earth_bump_1024x512.jpg',
    },
    specularMap: {
      sd: 'earth_specular_1024x512.jpg',
      hd: 'earth_specular_1024x512.jpg',
    },
  };

  static create(store: StoreService): EarthDecorator {
    return new EarthDecorator(store, this.newEarth(store));
  }

  private static newEarth(store: StoreService): Mesh {
    const loader = new TextureLoader().setPath('assets/textures/earth/');
    const geometry = new SphereGeometry(1, 64, 32);
    const material = new MeshPhongMaterial({
      wireframe: false,
      bumpScale: 0.01,
      specular: 0x2d4ea0,
      shininess: 6,
      map: this.loadTexture(loader, 'map'),
      bumpMap: this.loadTexture(loader, 'bumpMap'),
      specularMap: this.loadTexture(loader, 'specularMap'),
    });

    const earth = new Mesh(geometry, material);
    earth.position.x = 2;

    store.textureDef$.subscribe((textureDef) =>
      console.log('textureDef', textureDef)
    );

    return earth;
  }

  private static loadTexture(
    loader: TextureLoader,
    key: EarthTexturesKey,
    textureDef: TextureDef = 'sd'
  ): Texture {
    return loader.load(this.textures[key][textureDef]);
  }
}
