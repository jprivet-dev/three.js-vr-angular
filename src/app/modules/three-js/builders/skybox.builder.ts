import { StoreService } from '@core/store/store.service';
import { CubeTexture, CubeTextureLoader } from 'three';
import { SkyboxDecorator } from '../decorators';

export abstract class SkyboxBuilder {
  static create(store: StoreService): SkyboxDecorator {
    return new SkyboxDecorator(store, this.newCubeTexture());
  }

  private static newCubeTexture(): CubeTexture {
    return new CubeTextureLoader()
      .setPath('assets/textures/skybox/')
      .load(this.filenameList());
  }

  private static filenameList(): string[] {
    const list = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'];
    return list.map((position) => this.filename(position));
  }

  private static filename(position: string): string {
    return ('skybox_{pos}_512x512.jpg').replace('{pos}', position);
  }
}
