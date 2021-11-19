import { Definition } from '@core/store/store.model';

export const getTextureByDefinition = (
  definition: Definition,
  textures: { [key in Definition]: string }
): string => {
  return textures[definition];
};
