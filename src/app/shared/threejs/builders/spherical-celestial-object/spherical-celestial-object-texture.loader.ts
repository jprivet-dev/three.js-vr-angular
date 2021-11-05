import { Definition } from '@core/store/store.model';
import { MeshPhongMaterial, TextureLoader } from 'three';
import { TextureByDefinition } from '../../models';
import {
  SCOTexturesByDefinition,
  SCOTexturesByDefinitionKeys,
} from './spherical-celestial-object.model';

export class SphericalCelestialObjectTextureLoader
  extends TextureLoader
  implements TextureByDefinition
{
  constructor(
    private material: MeshPhongMaterial,
    texturesPath: string,
    private texturesByDefinition: SCOTexturesByDefinition
  ) {
    super();
    this.setPath(texturesPath);
  }

  loadByDefinition(definition: Definition) {
    const keys: SCOTexturesByDefinitionKeys[] = [
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
    key: SCOTexturesByDefinitionKeys,
    definition: Definition
  ): string | void {
    const texture = this.texturesByDefinition[key];

    if (texture === undefined) {
      return;
    }

    return texture[definition];
  }
}
