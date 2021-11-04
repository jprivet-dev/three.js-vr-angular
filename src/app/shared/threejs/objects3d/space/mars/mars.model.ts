import { Definition } from '@core/store/store.model';

export type MarsTexturesByDefinitionKeys = 'map';

export type MarsTexturesByDefinition = {
  [key in MarsTexturesByDefinitionKeys]: {
    [key in Definition]: string;
  };
};
