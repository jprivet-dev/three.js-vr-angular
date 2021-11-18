import { Definition } from '@core/store/store.model';

export interface TextureByDefinition {
  loadTextureByDefinition(definition: Definition): void;
}
