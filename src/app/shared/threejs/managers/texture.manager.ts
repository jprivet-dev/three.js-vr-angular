import { Definition } from '@core/store/store.model';
import { TextureByDefinition } from '../models';

export class TextureManager implements TextureByDefinition {
  private list: TextureByDefinition[] = [];

  add(element: TextureByDefinition): void {
    this.list.push(element);
  }

  loadTextureByDefinition(definition: Definition): void {
    this.list.map((element) => element.loadTextureByDefinition(definition));
  }
}
