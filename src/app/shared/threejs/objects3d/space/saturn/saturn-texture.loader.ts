import { Definition } from '@core/store/store.model';
import { MeshPhongMaterial, TextureLoader } from 'three';
import { TextureByDefinition } from '../../../models';
import {
  SaturnTexturesByDefinition,
  SaturnTexturesByDefinitionKeys,
} from './saturn.model';

export class SaturnTextureLoader
  extends TextureLoader
  implements TextureByDefinition
{
  private textures: SaturnTexturesByDefinition = {
    map: {
      sd: 'saturn_map_1024x512.jpg',
      hd: 'saturn_map_2048x1024.jpg',
    },
  };

  constructor(private material: MeshPhongMaterial) {
    super();
    this.setPath('assets/threejs/textures/space/saturn/');
  }

  loadByDefinition(definition: Definition) {
    this.material.map = this.load(this.getFilename('map', definition));
  }

  private getFilename(
    key: SaturnTexturesByDefinitionKeys,
    definition: Definition
  ): string {
    return this.textures[key][definition];
  }
}
