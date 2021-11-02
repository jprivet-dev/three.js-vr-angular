import { Definition } from '@core/store/store.model';

export type CloudsTexturesByDefinitionKeys = 'alphaMap';

export type CloudsTexturesByDefinition = {
  [key in CloudsTexturesByDefinitionKeys]: {
    [key in Definition]: string;
  };
};
