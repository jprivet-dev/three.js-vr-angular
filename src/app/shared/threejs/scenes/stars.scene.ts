import { Definition } from '../../models/definition.model';
import { CubeTextureLoader, Scene } from 'three';
import { HasScene, TexturesByDefinition } from '../models';

export class StarsScene implements HasScene, TexturesByDefinition {
  private loader: CubeTextureLoader = new CubeTextureLoader();
  private dimensions = {
    sd: '512x512',
    hd: '1024x1024',
  };

  scene: Scene = new Scene();

  constructor() {
    this.loader.setPath('assets/threejs/textures/space/stars/');
  }

  loadTexturesByDefinition(definition: Definition): void {
    this.scene.background = this.loader.load(this.getFilenames(definition));
  }

  private getFilenames(definition: Definition): string[] {
    const list = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'];

    return list.map((position) => {
      const dimension = this.dimensions[definition];
      return `stars_${position}_${dimension}.jpg`;
    });
  }
}
