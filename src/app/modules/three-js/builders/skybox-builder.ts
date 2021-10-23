import { CubeTexture, CubeTextureLoader } from 'three';
import { SkyboxDecorator } from '../decorators/skybox-decorator';

export class SkyboxBuilder {
  private assetsPath = 'assets/textures/skybox/';
  private positionList = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'];
  private tag = '{pos}';
  private filenameWithTag = 'skybox_{pos}_512x512.jpg';

  create(): SkyboxDecorator {
    return new SkyboxDecorator(this.newCubeTexture());
  }

  private newCubeTexture(): CubeTexture {
    return new CubeTextureLoader()
      .setPath(this.assetsPath)
      .load(this.filenameList());
  }

  private filenameList() {
    return this.positionList.map((position) => this.filename(position));
  }

  private filename(position: string): string {
    return this.filenameWithTag.replace(this.tag, position);
  }
}
