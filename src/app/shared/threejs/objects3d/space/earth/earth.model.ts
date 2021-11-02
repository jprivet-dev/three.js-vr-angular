import { Definition } from '@core/store/store.model';

export type EarthTexturesByDefinitionKeys = 'map' | 'bumpMap' | 'specularMap';

export type EarthTexturesByDefinition = {
  [key in EarthTexturesByDefinitionKeys]: {
    [key in Definition]: string;
  };
};
