import { Definition } from '@shared/models/definition.model';
import { CubeTexture, CubeTextureLoader } from 'three';

export class SkyboxStarsTextureLoader extends CubeTextureLoader {
  constructor() {
    super();
    this.setPath('assets/textures/skybox/');
  }

  private dimensions = {
    sd: '512x512', hd: '1024x1024',
  };

  getTexture(): CubeTexture {
    const definition: Definition = 'sd';

    const list = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'];

    const filenameList = list.map((position) => {
      const dimension = this.dimensions[definition];
      return `skybox_${position}_${dimension}.jpg`;
    });

    return this.load(filenameList);
  }
}
