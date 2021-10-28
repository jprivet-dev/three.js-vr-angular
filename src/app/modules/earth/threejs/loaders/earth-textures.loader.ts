import { Definition } from '@shared/models/definition.model';
import { MeshPhongMaterial, TextureLoader } from 'three';
import {
  EarthTextures, EarthTexturesKeys,
} from '../../models/earth-texture.model';
import { TextureByDefinition } from '../../models/texture-by-definition.model';

export class EarthTexturesLoader extends TextureLoader implements TextureByDefinition {
  private texture: EarthTextures = {
    map: {
      sd: 'earth_map_1024x512.jpg', hd: 'earth_map_2048x1024.jpg',
    }, bumpMap: {
      sd: 'earth_bump_1024x512.jpg', hd: 'earth_bump_2048x1024.jpg',
    }, specularMap: {
      sd: 'earth_specular_1024x512.jpg', hd: 'earth_specular_2048x1024.jpg',
    },
  };

  constructor(private material: MeshPhongMaterial) {
    super();
    this.setPath('assets/textures/earth/');
  }

  loadByDefinition(definition: Definition) {
    this.material.map = this.load(this.getTexture('map', definition));
    this.material.bumpMap = this.load(this.getTexture('bumpMap', definition));
    this.material.specularMap = this.load(this.getTexture('specularMap', definition));
  }

  private getTexture(key: EarthTexturesKeys, definition: Definition): string {
    return this.texture[key][definition];
  }
}
