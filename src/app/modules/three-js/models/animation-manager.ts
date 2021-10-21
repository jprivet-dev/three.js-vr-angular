import { RendererDecorator } from '../objects3d/renderer-decorator';
import { Animation } from './animation';

export class AnimationManager {
  private objectList: Animation[] = [];

  constructor(private rendererDecorator: RendererDecorator) {}

  add(object: Animation): void {
    this.objectList.push(object);
  }

  start(): void {
    this.animation();
  }

  private animation(): void {
    requestAnimationFrame(this.animation);
    this.animateObjectList();
    this.rendererDecorator.render();
  }

  private animateObjectList(): void {
    this.objectList.forEach((object) => object.animate());
  }
}
