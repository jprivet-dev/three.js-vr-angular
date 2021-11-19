import { Definition } from '@core/store/store.model';
import { TexturesByDefinition } from '../models';

export class TextureManager implements TexturesByDefinition {
  private list: TexturesByDefinition[] = [];

  add(element: TexturesByDefinition): void {
    this.list.push(element);
  }

  loadTexturesByDefinition(definition: Definition): void {
    this.list.map((element) => element.loadTexturesByDefinition(definition));
  }
}
