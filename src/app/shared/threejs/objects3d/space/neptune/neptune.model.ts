import { Definition } from '@core/store/store.model';

export type NeptuneTexturesByDefinitionKeys = 'map';

export type NeptuneTexturesByDefinition = {
  [key in NeptuneTexturesByDefinitionKeys]: {
    [key in Definition]: string;
  };
};
