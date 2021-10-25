import { TextureDef } from '@core/store/store.model';

export type SunTexturesKey = 'sun' | 'circle' | 'hexagon';

export type SunTexturesParams = {
  [key in SunTexturesKey]: {
    [key in TextureDef]: string;
  };
};
