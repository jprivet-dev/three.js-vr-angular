import { Quaternion, Vector3 } from 'three';
import { Object3D } from 'three/src/core/Object3D';
import { Loop } from '../../models';
import { Object3DMovementState } from './object3d-movement-state';
import {
  Object3DMovementsMove,
  Object3DMovementsRotation,
} from './object3d-movement.model';

export class Object3DMovements implements Loop {
  private quaternion = new Quaternion();
  private vector = {
    move: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
  };

  private moveSpeed: number = 1;
  private moveSpeedBackwardForward: number = 3;
  private moveVelocity = new Vector3();
  private moveDeceleration: number = 8;

  private rotationSpeed: number = 0.5;
  private rotationVelocity = new Vector3();

  move: Object3DMovementsMove = {
    forward: new Object3DMovementState(),
    backward: new Object3DMovementState(),
    right: new Object3DMovementState(),
    left: new Object3DMovementState(),
    up: new Object3DMovementState(),
    down: new Object3DMovementState(),
  };

  rotation: Object3DMovementsRotation = {
    pitch: {
      up: new Object3DMovementState(),
      down: new Object3DMovementState(),
    },
    yaw: {
      right: new Object3DMovementState(),
      left: new Object3DMovementState(),
    },
    roll: {
      right: new Object3DMovementState(),
      left: new Object3DMovementState(),
    },
  };

  constructor(private object: Object3D) {}

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
      .set(-movementY * 0.0008, -movementX * 0.0008, 0, 1)
      .normalize();

    this.object.quaternion.multiply(this.quaternion);
  }

  private updateMove(delta: number): void {
    const right = this.move.right.number;
    const left = this.move.left.number;
    const up = this.move.up.number;
    const down = this.move.down.number;
    const backward = this.move.backward.number;
    const forward = this.move.forward.number;
    const velocity = this.moveVelocity;
    const deceleration = this.moveDeceleration;
    const speed = this.moveSpeed;
    const speedBF = this.moveSpeedBackwardForward;

    velocity.x += (right - left - velocity.x * deceleration) * delta * speed;
    velocity.y += (up - down - velocity.y * deceleration) * delta * speed;
    velocity.z += (backward - forward - velocity.z * deceleration) * delta * speedBF;

    this.object.translateX(velocity.x);
    this.object.translateY(velocity.y);
    this.object.translateZ(velocity.z);
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

    this.object.quaternion.multiply(this.quaternion);
  }
}
