import { TextureDef } from '@core/store/store.model';

export type SkyboxDimensions = {
  [key in TextureDef]: string;
}
