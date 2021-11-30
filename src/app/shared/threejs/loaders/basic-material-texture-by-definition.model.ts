import { Definition } from '../../models/definition.model';

export type BasicMaterialTexturesByDefinitionKeys =
  | 'map'
  | 'specularMap'
  | 'alphaMap';

export type BasicMaterialTexturesByDefinition = {
  [key in BasicMaterialTexturesByDefinitionKeys]?: {
    [key in Definition]: string;
  };
};
