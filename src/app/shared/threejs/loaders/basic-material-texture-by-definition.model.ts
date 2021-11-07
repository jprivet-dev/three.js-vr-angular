import { Definition } from '@core/store/store.model';

export type BasicMaterialTexturesByDefinitionKeys =
  | 'map'
  | 'specularMap'
  | 'alphaMap';

export type BasicMaterialTexturesByDefinition = {
  [key in BasicMaterialTexturesByDefinitionKeys]?: {
    [key in Definition]: string;
  };
};
