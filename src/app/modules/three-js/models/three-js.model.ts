import { TextureDef } from '@core/store/store.model';
import { LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { ContainerDecorator } from '../decorators';

export interface Animation {
  animate(delta: number): void;
}

export interface Resize {
  resize(containerDecorator: ContainerDecorator): void;
}

export type SkyboxDimensions = {
  [key in TextureDef]: string;
}

export type SunTexturesKey = 'sun' | 'circle' | 'hexagon';

export type SunTextures = {
  [key in SunTexturesKey]: {
    [key in TextureDef]: string;
  };
};

export interface TypedLensflare {
  type: SunTexturesKey,
  element: LensflareElement
}

export type EarthTexturesKey = 'map' | 'bumpMap' | 'specularMap';

export type EarthTextures = {
  [key in EarthTexturesKey]: {
    [key in TextureDef]: string;
  };
};
