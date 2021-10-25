import { TextureDef } from '@core/store/store.model';
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

export type EarthTexturesKey = 'map' | 'bumpMap' | 'specularMap';

export type EarthTextures = {
  [key in EarthTexturesKey]: {
    [key in TextureDef]: string;
  };
};
