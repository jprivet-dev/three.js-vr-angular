import { Clock } from 'three';
import { VRRenderer } from '../renderers';
import { Animation } from './animation.model';

export class AnimationManager implements Animation {
  private clock = new Clock();
  private list: Animation[] = [];

  constructor(private renderer: VRRenderer) {}

  add(animation: Animation): void {
    this.list.push(animation);
  }

  remove(index: number): void {
    if (this.list.length <= index) {
      throw new Error('index out of bound!');
    }

    this.list.splice(index, 1);
  }

  animate(delta: number): void {
    this.list.map((element) => element.animate(delta));
  }

  start(): void {
    this.renderer.setAnimationLoop(() => {
      this.animate(this.clock.getDelta());
      this.renderer.render(this.renderer.getScene(), this.renderer.getCamera());
    });
  }

  stop(): void {
    this.renderer.setAnimationLoop(() => {});
  }
}
