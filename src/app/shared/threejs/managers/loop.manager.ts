import { Clock } from 'three';
import { LoopControls, LoopWithUpdate } from '../models';
import { VRRenderer } from '../renderers';

export class LoopManager implements LoopControls {
  private clock = new Clock();
  private list: LoopWithUpdate[] = [];

  constructor(private renderer: VRRenderer) {}

  add(loop: LoopWithUpdate): void {
    this.list.push(loop);
  }

  remove(index: number): void {
    if (this.list.length <= index) {
      throw new Error('index out of bound!');
    }

    this.list.splice(index, 1);
  }

  update(delta: number): void {
    this.list.map((element) => element.update(delta));
  }

  start(): void {
    this.renderer.setAnimationLoop(() => {
      this.update(this.clock.getDelta());
      this.renderer.render(this.renderer.getScene(), this.renderer.getCamera());
    });
  }

  stop(): void {
    this.renderer.setAnimationLoop(() => {});
  }
}
