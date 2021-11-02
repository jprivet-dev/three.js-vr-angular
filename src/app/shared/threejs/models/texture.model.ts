import { Definition } from '@core/store/store.model';

export interface TextureByDefinition {
  loadByDefinition(definition: Definition): void;
}
