import { Clock } from 'three';
import { Object3DWithLoop, VRRenderer } from '../index';
import { Loop } from './loop.model';

export class LoopManager {
  private clock = new Clock();
  private list: Loop[] = [];

  constructor(private renderer: VRRenderer) {}

  add(element: Object3DWithLoop): void {
    if (element.hasLoopCallback()) {
      this.list.push(element);
      element.children.map(child => {
        this.add(child as Object3DWithLoop);
      })
    }
  }

  remove(index: number): void {
    if (this.list.length <= index) {
      throw new Error('index out of bound!');
    }

    this.list.splice(index, 1);
  }

  loop(delta: number): void {
    this.list.map((element) => element.loop(delta));
  }

  start(): void {
    this.renderer.setAnimationLoop(() => {
      this.loop(this.clock.getDelta());
      this.renderer.render(this.renderer.getScene(), this.renderer.getCamera());
    });
  }
}
