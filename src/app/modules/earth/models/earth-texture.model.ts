import { Definition } from '@shared/models/definition.model';

export type EarthTexturesKeys = 'map' | 'bumpMap' | 'specularMap';

export type EarthTextures = {
  [key in EarthTexturesKeys]: {
    [key in Definition]: string;
  };
};
