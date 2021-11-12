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

  remove(element: LoopWithUpdate): void {
    this.list.forEach((current, index) => {
      if(current === element) {
        this.list.splice(index, 1);
      }
    })
  }

  update(delta: number): void {
    this.list.map((current) => current.update(delta));
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
