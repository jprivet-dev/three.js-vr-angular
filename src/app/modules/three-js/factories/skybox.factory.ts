import { Definition } from '@core/store/store.model';
import { CubeTexture, CubeTextureLoader } from 'three';
import { SkyboxDecorator } from '../decorators';
import { SkyboxDimensions } from '../models';

// Here abstract is it a good idea ?
export abstract class SkyboxFactory {
  private static dimensions: SkyboxDimensions = {
    sd: '512x512',
    hd: '1024x1024',
  }

  static create(definition: Definition): SkyboxDecorator {
    return new SkyboxDecorator(this.newCubeTexture(definition));
  }

  private static newCubeTexture(definition: Definition): CubeTexture {
    const cubeTexture = new CubeTextureLoader()
      .setPath('assets/textures/skybox/')
      .load(this.filenameList(definition));

    return cubeTexture;
  }

  private static filenameList(definition: Definition): string[] {
    const list = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'];
    return list.map((position) => this.filename(position, definition));
  }

  private static filename(position: string, definition: Definition): string {
    const dimension = this.dimensions[definition];
    return `skybox_${position}_${dimension}.jpg`;
  }
}
