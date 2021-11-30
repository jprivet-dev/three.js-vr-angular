import { Definition } from '../../models/definition.model';
import { TexturesByDefinition } from '../models';

export class TextureManager implements TexturesByDefinition {
  private list: TexturesByDefinition[] = [];

  add(element: TexturesByDefinition): void {
    if (this.list.includes(element)) {
      console.error('Element already exists:', element);
      return;
    }

    this.list.push(element);
  }

  loadTexturesByDefinition(definition: Definition): void {
    this.list.map((element) => element.loadTexturesByDefinition(definition));
  }
}
