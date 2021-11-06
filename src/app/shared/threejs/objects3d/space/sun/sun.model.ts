import { Definition } from '@core/store/store.model';
import { DirectionalLight } from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { Texture } from 'three/src/textures/Texture';

/**
 * Sun
 */

export class Sun extends DirectionalLight {}

/**
 * Sun Lensflare
 */

export type SunLensflareTexturesByDefinitionKeys = 'sun' | 'circle' | 'hexagon';

export interface SunLensflareTexturesParams {
  type: SunLensflareTexturesByDefinitionKeys;
  size: number;
  distance: number;
}

export type SunLensflareTexturesByDefinition = {
  [key in SunLensflareTexturesByDefinitionKeys]: {
    [key in Definition]: string;
  };
};

export class SunLensflare extends Lensflare {}

export class SunLensflareElement extends LensflareElement {
  readonly type: SunLensflareTexturesByDefinitionKeys;

  constructor(texture: Texture, params: SunLensflareTexturesParams) {
    super(texture, params.size, params.distance);
    this.type = params.type;
  }
}
