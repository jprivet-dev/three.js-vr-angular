import { LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { Texture } from 'three/src/textures/Texture';
import {
  SunLensflareTexturesByDefinitionKeys,
  SunLensflareTexturesParams,
} from './sun-lensflare.model';

export class SunLensflareElement extends LensflareElement {
  readonly type: SunLensflareTexturesByDefinitionKeys;

  constructor(texture: Texture, params: SunLensflareTexturesParams) {
    super(texture, params.size, params.distance);
    this.type = params.type;
  }
}
