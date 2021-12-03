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

  private velocity = new Vector3();
  private moveSpeed: number = 10;
  private rotationSpeed: number = 0.5;

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
    const v = this.vector.move;
    const m = this.move;

    this.velocity.x -= this.velocity.x * 8 * delta;
    this.velocity.y -= this.velocity.y * 8 * delta;
    this.velocity.z -= this.velocity.z * 8 * delta;

    this.velocity.x += (m.right.number - m.left.number) * 1 * delta;
    this.velocity.y += (m.up.number - m.down.number) * 1 * delta;
    this.velocity.z += (m.backward.number - m.forward.number) * 3 * delta;

    // console.log( 'move:', [ v.x, v.y, v.z ] );

    this.object.translateX(this.velocity.x);
    this.object.translateY(this.velocity.y);
    this.object.translateZ(this.velocity.z);
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
