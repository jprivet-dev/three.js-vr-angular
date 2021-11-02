import { Definition } from '@core/store/store.model';
import { CubeTexture, CubeTextureLoader } from 'three';

export class StarsTextureLoader extends CubeTextureLoader {
  private dimensions = {
    sd: '512x512',
    hd: '1024x1024',
  };

  constructor() {
    super();
    this.setPath('assets/threejs/textures/space/stars/');
  }

  getTextureByDefinition(definition: Definition): CubeTexture {
    const list = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'];

    const filenameList = list.map((position) => {
      const dimension = this.dimensions[definition];
      return `stars_${position}_${dimension}.jpg`;
    });

    return this.load(filenameList);
  }
}
