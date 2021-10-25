import { TextureDef } from '@core/store/store.model';
import { StoreService } from '@core/store/store.service';
import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';
import { Texture } from 'three/src/textures/Texture';
import { EarthDecorator } from '../decorators';
import { EarthTextures, EarthTexturesKey } from '../models/three-js.model';

export abstract class EarthBuilder {
  private static textures: EarthTextures = {
    map: {
      sd: 'earth_map_1024x512.jpg',
      hd: 'earth_map_2048x1024.jpg',
    },
    bumpMap: {
      sd: 'earth_bump_1024x512.jpg',
      hd: 'earth_bump_2048x1024.jpg',
    },
    specularMap: {
      sd: 'earth_specular_1024x512.jpg',
      hd: 'earth_specular_2048x1024.jpg',
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
    });

    const earth = new Mesh(geometry, material);
    earth.position.x = 2;

    store.textureDef$.subscribe((textureDef) => {
      this.updateAllTextures(material, loader, textureDef);
    });

    return earth;
  }

  private static updateAllTextures(material: MeshPhongMaterial, loader: TextureLoader, textureDef: TextureDef) {
    material.map = this.loadTexture(loader, 'map', textureDef);
    material.bumpMap = this.loadTexture(loader, 'bumpMap', textureDef);
    material.specularMap = this.loadTexture(
      loader,
      'specularMap',
      textureDef
    );
  }

  private static loadTexture(
    loader: TextureLoader,
    key: EarthTexturesKey,
    textureDef: TextureDef
  ): Texture {
    return loader.load(this.textures[key][textureDef]);
  }
}
