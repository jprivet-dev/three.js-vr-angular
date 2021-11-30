import { Definition } from '../../models/definition.model';
import { TextureLoader } from 'three';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { TexturesByDefinition } from '../models';

import {
  BasicMaterialTexturesByDefinition,
  BasicMaterialTexturesByDefinitionKeys,
} from './basic-material-texture-by-definition.model';

export class BasicMaterialTextureByDefinitionLoader
  extends TextureLoader
  implements TexturesByDefinition
{
  constructor(
    private material: MeshBasicMaterial,
    texturesPath: string,
    private texturesByDefinition: BasicMaterialTexturesByDefinition
  ) {
    super();
    this.setPath(texturesPath);
  }

  loadTexturesByDefinition(definition: Definition) {
    const keys: BasicMaterialTexturesByDefinitionKeys[] = [
      'map',
      'specularMap',
      'alphaMap',
    ];
    keys.map((key) => {
      const filename = this.getFilename(key, definition);
      if (filename) {
        this.material[key] = this.load(filename);
      }
    });
  }

  private getFilename(
    key: BasicMaterialTexturesByDefinitionKeys,
    definition: Definition
  ): string | void {
    const texture = this.texturesByDefinition[key];

    if (texture === undefined) {
      return;
    }

    return texture[definition];
  }
}
