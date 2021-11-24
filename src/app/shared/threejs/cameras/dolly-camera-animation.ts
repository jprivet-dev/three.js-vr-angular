import { Camera, WebGLRenderer } from 'three';
import { LoopControls } from '../models';
import { DollyCamera } from './dolly-camera';

export class DollyCameraAnimation implements LoopControls {
  private direction: number = 0;
  private xrCamera: Camera;
  private cycle = [0, 1, 0, -1];
  private indexCycle = 0;

  constructor(private dolly: DollyCamera, private renderer: WebGLRenderer) {
    this.xrCamera = this.renderer.xr.getCamera(dolly.camera);
  }

  start() {}

  stop(): void {
    this.direction = 0;
  }

  moveSwitch(): void {
    this.indexCycle++;
    if (this.indexCycle >= this.cycle.length) {
      this.indexCycle = 0;
    }
    this.direction = this.cycle[this.indexCycle];
  }

  moveForward(): void {
    this.direction = -1;
  }

  moveBackward(): void {
    this.direction = 1;
  }

  update(delta: number) {
    if (this.direction !== 0) {
      // https://stackoverflow.com/questions/58213242/efficient-way-to-translate-a-camera-dolly
      const speedDelta = delta * 1 * this.direction;
      this.dolly.dummy.position.set(0, 0, 0);
      this.dolly.dummy.quaternion.copy(this.xrCamera.quaternion);
      this.dolly.dummy.translateZ(speedDelta);
      this.dolly.position.add(this.dolly.dummy.position);
    }
  }
}
