import { Definition } from '@core/store/store.model';

export type JupiterTexturesByDefinitionKeys = 'map';

export type JupiterTexturesByDefinition = {
  [key in JupiterTexturesByDefinitionKeys]: {
    [key in Definition]: string;
  };
};
