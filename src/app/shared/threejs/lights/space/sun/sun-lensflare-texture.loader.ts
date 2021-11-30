import { Definition } from '../../../../models/definition.model';
import { TextureLoader } from 'three';
import { Texture } from 'three/src/textures/Texture';
import {
  SunLensflareTexturesByDefinition,
  SunLensflareTexturesByDefinitionKeys,
} from './sun.model';

export class SunLensflareTextureLoader extends TextureLoader {
  private textures: SunLensflareTexturesByDefinition = {
    sun: {
      sd: 'sun_512x512.jpg',
      hd: 'sun_1024x1024.jpg',
    },
    circle: {
      sd: 'lens_flare_circle_32x32.jpg',
      hd: 'lens_flare_circle_64x64.jpg',
    },
    hexagon: {
      sd: 'lens_flare_hexagon_128x128.jpg',
      hd: 'lens_flare_hexagon_256x256.jpg',
    },
  };

  constructor() {
    super();
    this.setPath('assets/threejs/textures/space/sun/');
  }

  getTexture(
    key: SunLensflareTexturesByDefinitionKeys,
    definition: Definition
  ): Texture {
    return this.load(this.getFilename(key, definition));
  }

  private getFilename(
    key: SunLensflareTexturesByDefinitionKeys,
    definition: Definition
  ): string {
    return this.textures[key][definition];
  }
}
