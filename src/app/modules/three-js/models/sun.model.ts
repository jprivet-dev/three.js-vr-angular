import { TextureDef } from '@core/store/store.model';
import { LensflareElement } from 'three/examples/jsm/objects/Lensflare';

export type SunTexturesKey = 'sun' | 'circle' | 'hexagon';

export interface SunLensflareParams {
  type: SunTexturesKey,
  size: number,
  distance: number
}

export type SunTexturesParams = {
  [key in SunTexturesKey]: {
    [key in TextureDef]: string;
  };
};

export interface TypedLensflare {
  type: SunTexturesKey,
  element: LensflareElement
}
