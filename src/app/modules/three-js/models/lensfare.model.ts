import { LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { SunTexturesKey } from './sun.model';

export interface LensflareParams {
  type: SunTexturesKey;
  size: number;
  distance: number;
}

export interface LensflareTyped {
  type: SunTexturesKey;
  element: LensflareElement;
}
