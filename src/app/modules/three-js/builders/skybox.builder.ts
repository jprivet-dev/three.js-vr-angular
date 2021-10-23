import { CubeTexture, CubeTextureLoader } from 'three';
import { SkyboxDecorator } from '../decorators';

export abstract class SkyboxBuilder {
  private static config = {
    assetsPath: 'assets/textures/skybox/',
    positionList: ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'],
    tag: '{pos}',
    filenameWithTag: 'skybox_{pos}_512x512.jpg',
  };

  static create(): SkyboxDecorator {
    return new SkyboxDecorator(this.newCubeTexture());
  }

  private static newCubeTexture(): CubeTexture {
    return new CubeTextureLoader()
      .setPath(this.config.assetsPath)
      .load(this.filenameList());
  }

  private static filenameList() {
    return this.config.positionList.map((position) => this.filename(position));
  }

  private static filename(position: string): string {
    return this.config.filenameWithTag.replace(this.config.tag, position);
  }
}
