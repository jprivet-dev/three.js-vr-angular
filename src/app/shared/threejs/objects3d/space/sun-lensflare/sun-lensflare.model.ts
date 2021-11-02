import { Definition } from '@core/store/store.model';

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
