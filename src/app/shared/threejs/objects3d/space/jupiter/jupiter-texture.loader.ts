import { Definition } from '@core/store/store.model';
import { MeshPhongMaterial, TextureLoader } from 'three';
import {
  JupiterTexturesByDefinition,
  JupiterTexturesByDefinitionKeys,
  TextureByDefinition,
} from '@modules/earth/models/texture.model';

export class JupiterTextureLoader
  extends TextureLoader
  implements TextureByDefinition
{
  private textures: JupiterTexturesByDefinition = {
    map: {
      sd: 'jupiter_hd.jpg',
      hd: 'jupiter_hd.jpg',
    },
  };

  constructor(private material: MeshPhongMaterial) {
    super();
    this.setPath('assets/textures/planets/');
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
