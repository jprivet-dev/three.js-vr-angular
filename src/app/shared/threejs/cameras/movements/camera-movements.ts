import { Quaternion, Vector3 } from 'three';
import { Camera } from 'three/src/Three';
import { Loop } from '../../models';
import { CameraMovementState } from './camera-movement-state';
import {
  CameraMovementsMove,
  CameraMovementsRotation,
} from './camera-movement.model';

export class CameraMovements implements Loop {
  private quaternion = new Quaternion();
  private vector = {
    move: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
  };

  moveSpeed: number = 10;
  rotationSpeed: number = 0.5;

  move: CameraMovementsMove = {
    forward: new CameraMovementState(),
    backward: new CameraMovementState(),
    right: new CameraMovementState(),
    left: new CameraMovementState(),
    up: new CameraMovementState(),
    down: new CameraMovementState(),
  };

  rotation: CameraMovementsRotation = {
    pitch: {
      up: new CameraMovementState(),
      down: new CameraMovementState(),
    },
    yaw: {
      right: new CameraMovementState(),
      left: new CameraMovementState(),
    },
    roll: {
      right: new CameraMovementState(),
      left: new CameraMovementState(),
    },
  };

  constructor(private camera: Camera) {}

  update(delta: number): void {
    this.updateMove(delta);
    this.updateRotation(delta);
  }

  onMouseMove(event: any): void {
    // https://github.com/mrdoob/three.js/blob/dev/examples/jsm/controls/PointerLockControls.js
    const movementX =
      event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY =
      event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    this.quaternion
      .set(
        -movementY * 0.002 * this.rotationSpeed,
        -movementX * 0.002 * this.rotationSpeed,
        0,
        1
      )
      .normalize();

    this.camera.quaternion.multiply(this.quaternion);
  }

  private updateMove(delta: number): void {
    const v = this.vector.move;
    const m = this.move;

    v.x = -m.left.number + m.right.number;
    v.y = -m.down.number + m.up.number;
    v.z = -m.forward.number + m.backward.number;

    // console.log( 'move:', [ v.x, v.y, v.z ] );

    this.camera.translateX(v.x * delta * this.moveSpeed);
    this.camera.translateY(v.y * delta * this.moveSpeed);
    this.camera.translateZ(v.z * delta * this.moveSpeed);
  }

  private updateRotation(delta: number): void {
    const v = this.vector.rotation;
    const r = this.rotation;

    v.x = -r.pitch.down.number + r.pitch.up.number;
    v.y = -r.yaw.right.number + r.yaw.left.number;
    v.z = -r.roll.right.number + r.roll.left.number;

    //console.log( 'rotate:', [ this.vectors.rotation.x, this.vectors.rotation.y, this.vectors.rotation.z ] );

    this.quaternion
      .set(
        v.x * delta * this.rotationSpeed,
        v.y * delta * this.rotationSpeed,
        v.z * delta * this.rotationSpeed,
        1
      )
      .normalize();

    this.camera.quaternion.multiply(this.quaternion);
  }
}
