import { Definition } from '@shared/models/definition.model';
import { MeshPhongMaterial, TextureLoader } from 'three';
import { Texture } from 'three/src/textures/Texture';
import {
  EarthTextures,
  EarthTexturesKeys,
} from '../../models/earth-texture.model';

export class EarthTexturesLoader extends TextureLoader {
  private texture: EarthTextures = {
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

  constructor(private material: MeshPhongMaterial) {
    super();
    this.setPath('assets/textures/earth/');
  }

  loadTextures(definition: Definition) {
    this.material.map = this.loadTexture('map', definition);
    this.material.bumpMap = this.loadTexture('bumpMap', definition);
    this.material.specularMap = this.loadTexture('specularMap', definition);
  }

  private loadTexture(key: EarthTexturesKeys, definition: Definition): Texture {
    return this.load(this.texture[key][definition]);
  }
}
