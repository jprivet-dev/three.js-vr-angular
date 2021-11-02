import { VRRenderer } from '../index';
import { Clock } from 'three';
import { Loop } from './loop.model';

export class LoopManager implements Loop {
  private clock = new Clock();
  private list: Loop[] = [];

  constructor(private renderer: VRRenderer) {}

  add(element: Loop): void {
    this.list.push(element);
  }

  remove(index: number): void {
    if (this.list.length <= index) {
      throw new Error('index out of bound!');
    }

    this.list.splice(index, 1);
  }

  loop(delta: number): void {
    this.list.forEach((element) => element.loop(delta));
  }

  start(): void {
    this.renderer.setAnimationLoop(() => {
      this.loop(this.clock.getDelta());
      this.renderer.render(this.renderer.getScene(), this.renderer.getCamera());
    });
  }
}
