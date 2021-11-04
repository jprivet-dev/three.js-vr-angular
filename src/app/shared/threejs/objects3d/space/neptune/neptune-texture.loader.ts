import { Definition } from '@core/store/store.model';
import { MeshPhongMaterial, TextureLoader } from 'three';
import { TextureByDefinition } from '../../../models';
import {
  NeptuneTexturesByDefinition,
  NeptuneTexturesByDefinitionKeys,
} from './neptune.model';

export class NeptuneTextureLoader
  extends TextureLoader
  implements TextureByDefinition
{
  private textures: NeptuneTexturesByDefinition = {
    map: {
      sd: 'neptune_map_1024x512.jpg',
      hd: 'neptune_map_2048x1024.jpg',
    },
  };

  constructor(private material: MeshPhongMaterial) {
    super();
    this.setPath('assets/threejs/textures/space/neptune/');
  }

  loadByDefinition(definition: Definition) {
    this.material.map = this.load(this.getFilename('map', definition));
  }

  private getFilename(
    key: NeptuneTexturesByDefinitionKeys,
    definition: Definition
  ): string {
    return this.textures[key][definition];
  }
}
