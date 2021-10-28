import { Definition } from '@shared/models/definition.model';
import { MeshPhongMaterial, TextureLoader } from 'three';

export class CloudsTextureLoader extends TextureLoader {
  private config = {
    assetsPath: 'assets/textures/clouds/',
    alphaMap: 'clouds_1024x512.jpg',
  };

  constructor(private material: MeshPhongMaterial) {
    super();
  }

  loadByDefinition(definition: Definition) {
    this.material.alphaMap = this.load(this.filename());
  }

  private filename(): string {
    return this.config.assetsPath + this.config.alphaMap;
  }
}
