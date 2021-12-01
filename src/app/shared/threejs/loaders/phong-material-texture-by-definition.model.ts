import { Definition } from '../../models/definition.model';

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
