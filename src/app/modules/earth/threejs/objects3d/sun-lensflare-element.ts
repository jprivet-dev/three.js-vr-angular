import { LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { Texture } from 'three/src/textures/Texture';
import { SunLensflareTexturesParams } from '../../models/texture.model';

export class SunLensflareElement extends LensflareElement {
  constructor(texture: Texture, params: SunLensflareTexturesParams) {
    super(texture, params.size, params.distance);
  }
}
