import { Definition } from '@core/store/store.model';
import { MeshPhongMaterial, TextureLoader } from 'three';
import { TextureByDefinition } from '../../../models';
import {
  JupiterTexturesByDefinition,
  JupiterTexturesByDefinitionKeys,
} from './jupiter.model';

export class JupiterTextureLoader
  extends TextureLoader
  implements TextureByDefinition
{
  private textures: JupiterTexturesByDefinition = {
    map: {
      sd: 'jupiter_map_1024x512.jpg',
      hd: 'jupiter_map_2048x1024.jpg',
    },
  };

  constructor(private material: MeshPhongMaterial) {
    super();
    this.setPath('assets/threejs/textures/space/jupiter/');
  }

  loadByDefinition(definition: Definition) {
    this.material.map = this.load(this.getFilename('map', definition));
  }

  private getFilename(
    key: JupiterTexturesByDefinitionKeys,
    definition: Definition
  ): string {
    return this.textures[key][definition];
  }
}