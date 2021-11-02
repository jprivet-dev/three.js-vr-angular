import { Definition } from '@core/store/store.model';
import { MeshPhongMaterial, TextureLoader } from 'three';
import { TextureByDefinition } from '../../../models';
import {
  CloudsTexturesByDefinition,
  CloudsTexturesByDefinitionKeys,
} from './clouds.model';

export class CloudsTextureLoader
  extends TextureLoader
  implements TextureByDefinition
{
  private textures: CloudsTexturesByDefinition = {
    alphaMap: {
      sd: 'clouds_1024x512.jpg',
      hd: 'clouds_2048x1024.jpg',
    },
  };

  constructor(private material: MeshPhongMaterial) {
    super();
    this.setPath('assets/textures/clouds/');
  }

  loadByDefinition(definition: Definition): void {
    this.material.alphaMap = this.load(
      this.getFilename('alphaMap', definition)
    );
  }

  private getFilename(
    key: CloudsTexturesByDefinitionKeys,
    definition: Definition
  ): string {
    return this.textures[key][definition];
  }
}
