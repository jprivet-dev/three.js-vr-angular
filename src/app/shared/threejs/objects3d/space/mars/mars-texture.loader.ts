import { Definition } from '@core/store/store.model';
import { MeshPhongMaterial, TextureLoader } from 'three';
import { TextureByDefinition } from '../../../models';
import {
  MarsTexturesByDefinition,
  MarsTexturesByDefinitionKeys,
} from './mars.model';

export class MarsTextureLoader
  extends TextureLoader
  implements TextureByDefinition
{
  private textures: MarsTexturesByDefinition = {
    map: {
      sd: 'mars_map_1024x512.jpg',
      hd: 'mars_map_2048x1024.jpg',
    },
  };

  constructor(private material: MeshPhongMaterial) {
    super();
    this.setPath('assets/threejs/textures/space/mars/');
  }

  loadByDefinition(definition: Definition) {
    this.material.map = this.load(this.getFilename('map', definition));
  }

  private getFilename(
    key: MarsTexturesByDefinitionKeys,
    definition: Definition
  ): string {
    return this.textures[key][definition];
  }
}
