import { Definition } from '@shared/models/definition.model';
import { MeshPhongMaterial, TextureLoader } from 'three';
import {
  EarthTexturesByDefinition,
  EarthTexturesByDefinitionKeys,
  TextureByDefinition,
} from '../../models/texture.model';

export class EarthTextureLoader
  extends TextureLoader
  implements TextureByDefinition
{
  private textures: EarthTexturesByDefinition = {
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

  loadByDefinition(definition: Definition) {
    this.material.map = this.load(this.getFilename('map', definition));
    this.material.bumpMap = this.load(this.getFilename('bumpMap', definition));
    this.material.specularMap = this.load(
      this.getFilename('specularMap', definition)
    );
  }

  private getFilename(
    key: EarthTexturesByDefinitionKeys,
    definition: Definition
  ): string {
    return this.textures[key][definition];
  }
}
