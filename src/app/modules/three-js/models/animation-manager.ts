import { Animation } from './animation';
import { Renderer } from '../objects3d/renderer';

export class AnimationManager {
  private objectList: Animation[] = [];

  constructor(private renderer: Renderer) {}

  add(object: Animation): void {
    this.objectList.push(object);
  }

  start(): void {
    this.animation();
  }

  private animation(): void {
    requestAnimationFrame(this.animation);
    this.animateObjectList();
    this.renderer.render();
  }

  private animateObjectList(): void {
    this.objectList.forEach((object) => object.animate());
  }
}
