import { Vector3 } from 'three';
import { AnimationControls } from '../../managers';
import { DollyCamera } from './dolly-camera';

export class DollyCameraAnimationOLD implements AnimationControls {
  private distanteBySecond: number = 0.1;
  private move: boolean = false;
  private direction: number = 0;
  private playerDirection = new Vector3();

  constructor(private dolly: DollyCamera) {}

  start() {}

  stop(): void {
    this.direction = 0;
  }

  goAhead(): void {
    this.direction = 1;
  }

  goBack(): void {
    this.direction = -1;
  }

  animate(delta: number) {
    const speedDelta = delta * 0.1;
    if (this.direction !== 0) {
      // this.dolly.position.add( this.getForwardVector().multiplyScalar( speedDelta ) );

      // this.dolly.camera.getWorldDirection(this.vector3);
      // const vector = this.vector3.multiplyScalar(-0.1);
      // this.dolly.position.set(vector.x, vector.y, vector.z);

      // this.dolly.setRotationFromQuaternion(this.dolly.camera.quaternion);
      // this.dolly.position.add(this.vector3.multiplyScalar(this.speed));
      // const quaternion = this.dolly.quaternion.clone();
      // const dummyQuaternion = new Quaternion();
      // this.dolly.quaternion.copy(this.dolly.dummyCam.quaternion);
      // this.dolly.translateZ(-0.01);
      // this.dolly.quaternion.copy(quaternion);

      // this.dolly.setRotationFromQuaternion(this.dolly.camera.quaternion);
      // this.dolly.translateZ(-0.01);
      this.dolly.rotation.y += 0.01;
      console.log(this.dolly.rotation.y - this.dolly.camera.rotation.y);
      //console.log(this.dolly.rotation.y - this.dolly.camera.rotation.y);
      //this.dolly.translateZ(0.01);
    }
  }

  getForwardVector() {
    this.dolly.camera.getWorldDirection(this.playerDirection);
    this.playerDirection.y = 0;
    this.playerDirection.normalize();
    console.log(this.playerDirection);

    return this.playerDirection;
  }
}
