import { Definition } from '@shared/models/definition.model';
import { MeshPhongMaterial, TextureLoader } from 'three';
import { TextureByDefinition } from '../../models/texture-by-definition.model';

export class CloudsTextureLoader
  extends TextureLoader
  implements TextureByDefinition
{
  private texture = {
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
    this.material.alphaMap = this.load(this.getTexture(definition));
  }

  private getTexture(definition: Definition): string {
    return this.texture.alphaMap[definition];
  }
}
