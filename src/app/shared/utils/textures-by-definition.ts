import { Definition } from '../models';

export const getTextureByDefinition = (
  definition: Definition,
  textures: { [key in Definition]: string }
): string => {
  return textures[definition];
};
