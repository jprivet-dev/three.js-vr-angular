import { Definition } from '@core/store/store.model';

export type EarthTexturesByDefinitionKeys = 'map' | 'bumpMap' | 'specularMap';

export type EarthTexturesByDefinition = {
  [key in EarthTexturesByDefinitionKeys]: {
    [key in Definition]: string;
  };
};

export type CloudsTexturesByDefinitionKeys = 'alphaMap';

export type CloudsTexturesByDefinition = {
  [key in CloudsTexturesByDefinitionKeys]: {
    [key in Definition]: string;
  };
};

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

export interface TextureByDefinition {
  loadByDefinition(definition: Definition): void;
}
