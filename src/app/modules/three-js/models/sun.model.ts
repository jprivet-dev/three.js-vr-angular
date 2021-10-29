import { Definition } from '@core/store/store.model';

export type SunTexturesKey = 'sun' | 'circle' | 'hexagon';

export type SunTexturesParams = {
  [key in SunTexturesKey]: {
    [key in Definition]: string;
  };
};
