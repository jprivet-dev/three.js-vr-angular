import { Camera, Vector3 } from 'three';
import { AnimationControls } from '../../managers';
import { VRRenderer } from '../../renderers';
import { DollyCamera } from './dolly-camera';

export class DollyCameraAnimation implements AnimationControls {
  private distanteBySecond: number = 0.1;
  private move: boolean = false;
  private direction: number = 0;
  private lastDirection: number = 0;
  private worldDirection = new Vector3();
  private displacement = new Vector3();
  private target = new Vector3();
  private xrCamera: Camera;

  constructor(private dolly: DollyCamera, private renderer: VRRenderer) {
    this.xrCamera = this.renderer.xr.getCamera(dolly.camera);
  }

  start() {}

  stop(): void {
    this.direction = 0;
  }

  moveSwitch(): void {
    if (this.lastDirection === 0) {
      this.direction = -1;
    } else {
      this.direction = -this.lastDirection;
    }
    this.lastDirection = this.direction;
  }

  moveForward(): void {
    this.direction = -1;
  }

  moveBackward(): void {
    this.direction = 1;
  }

  animate(delta: number) {
    if (this.direction !== 0) {
      // const speedDelta = delta * 1 * this.direction;
      // this.dolly.camera.getWorldDirection(this.worldDirection);
      // this.displacement.copy(this.worldDirection).multiplyScalar(speedDelta);
      // this.target.copy(this.dolly.position).add(this.displacement);
      // this.dolly.position.copy(this.target);

      // https://stackoverflow.com/questions/58213242/efficient-way-to-translate-a-camera-dolly
      // const speedDelta = delta * 1 * this.direction;
      // this.dolly.camera.getWorldDirection(this.worldDirection);
      // this.dolly.translateOnAxis(this.worldDirection, speedDelta);

      // https://stackoverflow.com/questions/58213242/efficient-way-to-translate-a-camera-dolly
      const speedDelta = delta * 1 * this.direction;
      this.dolly.dummyCam.position.set(0, 0, 0);
      this.dolly.dummyCam.quaternion.copy(this.xrCamera.quaternion);
      this.dolly.dummyCam.translateZ(speedDelta);
      this.dolly.position.add(this.dolly.dummyCam.position);
    }
  }
}
