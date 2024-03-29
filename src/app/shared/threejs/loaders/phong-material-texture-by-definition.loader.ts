import { MeshPhongMaterial, TextureLoader } from 'three';
import { Definition } from '../../models/definition.model';
import { TexturesByDefinition } from '../models';
import {
  PhongMaterialTextureByDefinition,
  PhongMaterialTexturesByDefinitionKeys,
} from './phong-material-texture-by-definition.model';

export class PhongMaterialTextureByDefinitionLoader
  extends TextureLoader
  implements TexturesByDefinition
{
  constructor(
    private material: MeshPhongMaterial,
    texturesPath: string,
    private texturesByDefinition: PhongMaterialTextureByDefinition
  ) {
    super();
    this.setPath(texturesPath);
  }

  loadTexturesByDefinition(definition: Definition) {
    const keys: PhongMaterialTexturesByDefinitionKeys[] = [
      'map',
      'bumpMap',
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
    key: PhongMaterialTexturesByDefinitionKeys,
    definition: Definition
  ): string | void {
    const texture = this.texturesByDefinition[key];

    if (texture === undefined) {
      return;
    }

    return texture[definition];
  }
}
