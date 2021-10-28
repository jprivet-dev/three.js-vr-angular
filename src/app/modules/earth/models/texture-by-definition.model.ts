import { Definition } from '@shared/models/definition.model';

export interface TextureByDefinition {
  loadByDefinition(definition: Definition): void;
}
