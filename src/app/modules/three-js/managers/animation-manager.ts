import { RendererDecorator } from '../decorators';
import { Animation } from '../models/animation';

export class AnimationManager {
  private objectList: Animation[] = [];

  constructor(private rendererDecorator: RendererDecorator) {}

  add(object: Animation) {
    this.objectList.push(object);
  }

  start() {
  }

  animateObjectList(): void {
    this.objectList.forEach((object) => object.animate());
  }
}
