import { CubeTexture, CubeTextureLoader } from 'three';
import { SkyboxDecorator } from '../decorators/skybox.decorator';

export abstract class SkyboxBuilder {
  private static assetsPath = 'assets/textures/skybox/';
  private static positionList = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'];
  private static tag = '{pos}';
  private static filenameWithTag = 'skybox_{pos}_512x512.jpg';

  static create(): SkyboxDecorator {
    return new SkyboxDecorator(this.newCubeTexture());
  }

  private static newCubeTexture(): CubeTexture {
    return new CubeTextureLoader()
      .setPath(this.assetsPath)
      .load(this.filenameList());
  }

  private static filenameList() {
    return this.positionList.map((position) => this.filename(position));
  }

  private static filename(position: string): string {
    return this.filenameWithTag.replace(this.tag, position);
  }
}
