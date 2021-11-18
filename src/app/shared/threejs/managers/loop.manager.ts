import { Clock } from 'three';
import { Loop, LoopWithUpdate } from '../models';

export class LoopManager implements Loop {
  private clock = new Clock();
  private list: LoopWithUpdate[] = [];

  add(loop: LoopWithUpdate): void {
    this.list.push(loop);
  }

  remove(element: LoopWithUpdate): void {
    this.list.forEach((current, index) => {
      if (current === element) {
        this.list.splice(index, 1);
      }
    });
  }

  update(): void {
    const delta = this.clock.getDelta();
    this.list.map((element) => element.update(delta));
  }
}
