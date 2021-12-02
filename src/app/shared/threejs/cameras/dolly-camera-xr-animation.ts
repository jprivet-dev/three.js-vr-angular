import { Camera } from 'three';
import { Container } from '../../container';
import { LoopControls } from '../models';
import { DollyCamera } from './dolly-camera';
import { DollyCameraDirection } from './dolly-camera.model';

export class DollyCameraXRAnimation implements LoopControls {
  private xrCamera: Camera;

  private currentDirection: DollyCameraDirection = DollyCameraDirection.Stop;
  private directionCycle: DollyCameraDirection[] = [
    DollyCameraDirection.Stop,
    DollyCameraDirection.Forward,
    DollyCameraDirection.Stop,
    DollyCameraDirection.Backward,
  ];
  private directionCycleIndex = 0;

  constructor(
    private dolly: DollyCamera,
    private container: Container,
    private speed: number = 1
  ) {
    this.xrCamera = this.container.renderer.xr.getCamera(dolly.camera);
  }

  start(): void {}

  stop(): void {
    this.currentDirection = DollyCameraDirection.Stop;
  }

  moveSwitch(): void {
    this.directionCycleIndex++;
    if (this.directionCycleIndex >= this.directionCycle.length) {
      this.directionCycleIndex = 0;
    }
    this.currentDirection = this.directionCycle[this.directionCycleIndex];
  }

  moveForward(): void {
    this.currentDirection = DollyCameraDirection.Forward;
  }

  moveBackward(): void {
    this.currentDirection = DollyCameraDirection.Backward;
  }

  update(delta: number): void {
    if (this.currentDirection !== DollyCameraDirection.Stop) {
      // https://stackoverflow.com/questions/58213242/efficient-way-to-translate-a-camera-dolly
      const speedDelta = delta * this.speed * this.currentDirection;
      this.dolly.dummy.position.set(0, 0, 0);
      this.dolly.dummy.quaternion.copy(this.xrCamera.quaternion);
      this.dolly.dummy.translateZ(speedDelta);
      this.dolly.position.add(this.dolly.dummy.position);
    }
  }
}
