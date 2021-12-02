import { Container } from '../../container';
import { DashboardPointerLockControls } from '../controls';
import { LoopControls } from '../models';
import { DollyCamera } from './dolly-camera';
import { CameraMovements } from './movements';

export class DollyCameraFlyAnimation implements LoopControls {
  readonly movements = new CameraMovements(this.dolly.camera);
  readonly controls = new DashboardPointerLockControls(
    this.container,
    this.movements
  );

  constructor(
    private dolly: DollyCamera,
    private container: Container,
    private speed: number = 1
  ) {}

  start(): void {
    this.controls.start();
  }

  stop(): void {
    this.controls.stop();
  }

  update(delta: number): void {
    this.movements.update(delta);
  }
}
