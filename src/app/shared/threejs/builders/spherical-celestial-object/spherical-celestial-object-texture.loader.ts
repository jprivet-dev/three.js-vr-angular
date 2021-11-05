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
    path: string,
    private texturesByDefinition: SCOTexturesByDefinition
  ) {
    super();
    this.setPath(path);
  }

  loadByDefinition(definition: Definition) {
    const keys: SCOTexturesByDefinitionKeys[] = [
      'map',
      'bumpMap',
      'specularMap',
    ];
    keys.map((key) => {
      const filename = this.getFilename('map', definition);
      if (!filename) {
        return;
      }
      this.material[key] = this.load(filename);
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
