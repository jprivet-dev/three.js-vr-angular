import { Container } from '../../container';
import {
  DashboardControls,
  Object3DMovements,
  PointerLockControls,
} from '../controls';
import { LoopControls } from '../models';
import { DollyCamera } from './dolly-camera';

export class DollyCameraFlyAnimation implements LoopControls {
  readonly movements = new Object3DMovements(this.dolly.camera);
  readonly dashboard = new DashboardControls(this.container, this.movements);
  readonly pointerLock = new PointerLockControls(
    this.container,
    this.movements
  );

  constructor(
    private dolly: DollyCamera,
    private container: Container,
    private speed: number = 1
  ) {}

  start(): void {
    this.dashboard.start();
    this.pointerLock.start();
  }

  stop(): void {
    this.dashboard.stop();
    this.pointerLock.stop();
  }

  update(delta: number): void {
    this.movements.update(delta);
  }
}
