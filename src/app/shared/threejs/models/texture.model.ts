import { Definition } from '../../models/definition.model';

export interface TexturesByDefinition {
  loadTexturesByDefinition(definition: Definition): void;
}
