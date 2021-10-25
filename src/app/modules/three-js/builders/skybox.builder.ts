import { TextureDef } from '@core/store/store.model';
import { CubeTexture, CubeTextureLoader } from 'three';
import { SkyboxDecorator } from '../decorators';
import { SkyboxDimensions } from '../models/three-js.model';

export abstract class SkyboxBuilder {
  private static dimensions: SkyboxDimensions = {
    sd: '512x512',
    hd: '1024x1024',
  }

  static create(textureDef: TextureDef): SkyboxDecorator {
    return new SkyboxDecorator(this.newCubeTexture(textureDef));
  }

  private static newCubeTexture(textureDef: TextureDef): CubeTexture {
    const cubeTexture = new CubeTextureLoader()
      .setPath('assets/textures/skybox/')
      .load(this.filenameList(textureDef));

    return cubeTexture;
  }

  private static filenameList(textureDef: TextureDef): string[] {
    const list = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'];
    return list.map((position) => this.filename(position, textureDef));
  }

  private static filename(position: string, textureDef: TextureDef): string {
    const dimension = this.dimensions[textureDef];
    return `skybox_${position}_${dimension}.jpg`;
  }
}
