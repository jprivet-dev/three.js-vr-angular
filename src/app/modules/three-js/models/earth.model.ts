import { TextureDef } from '@core/store/store.model';

export type EarthTexturesKey = 'map' | 'bumpMap' | 'specularMap';

export type EarthTextures = {
  [key in EarthTexturesKey]: {
    [key in TextureDef]: string;
  };
};
