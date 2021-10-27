import { CubeTexture, CubeTextureLoader } from 'three';

export class SkyboxStarsTextureLoader extends CubeTextureLoader {
  private dimensions = {
    sd: '512x512',
    hd: '1024x1024',
  };

  getTexture(): CubeTexture {
    this.setPath('assets/textures/skybox/');

    const list = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'];

    const filenameList = list.map((position) => {
      const dimension = this.dimensions['sd'];
      return `skybox_${position}_${dimension}.jpg`;
    });

    return this.load(filenameList);
  }
}
