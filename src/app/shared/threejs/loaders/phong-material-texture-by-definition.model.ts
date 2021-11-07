import { Definition } from '@core/store/store.model';

export type PhongMaterialTexturesByDefinitionKeys =
  | 'map'
  | 'bumpMap'
  | 'specularMap'
  | 'alphaMap';

export type PhongMaterialTextureByDefinition = {
  [key in PhongMaterialTexturesByDefinitionKeys]?: {
    [key in Definition]: string;
  };
};
