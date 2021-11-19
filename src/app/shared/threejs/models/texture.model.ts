import { Definition } from '@core/store/store.model';

export interface TexturesByDefinition {
  loadTexturesByDefinition(definition: Definition): void;
}
