import { Definition } from '@core/store/store.model';

export type SaturnTexturesByDefinitionKeys = 'map';

export type SaturnTexturesByDefinition = {
  [key in SaturnTexturesByDefinitionKeys]: {
    [key in Definition]: string;
  };
};
