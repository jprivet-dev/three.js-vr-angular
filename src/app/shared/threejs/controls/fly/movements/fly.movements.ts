import { Object3D, Quaternion, Vector3 } from 'three';
import { Loop } from '../../../models';
import { FlyMovementState } from './fly-movement-state';
import { FlyMovementsMove, FlyMovementsRotation } from './fly-movement.model';

export abstract class FlyMovements implements Loop {
  private vector = {
    move: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
  };

  private quaternion = new Quaternion();

  moveSpeed: number = 10;
  rotationSpeed: number = 0.5;

  move: FlyMovementsMove = {
    forward: new FlyMovementState(),
    backward: new FlyMovementState(),
    right: new FlyMovementState(),
    left: new FlyMovementState(),
    up: new FlyMovementState(),
    down: new FlyMovementState(),
  };

  rotation: FlyMovementsRotation = {
    pitch: {
      up: new FlyMovementState(),
      down: new FlyMovementState(),
    },
    yaw: {
      right: new FlyMovementState(),
      left: new FlyMovementState(),
    },
    roll: {
      right: new FlyMovementState(),
      left: new FlyMovementState(),
    },
  };

  constructor(private object: Object3D) {}

  update(delta: number): void {
    this.updateMove(delta);
    this.updateRotation(delta);
  }

  private updateMove(delta: number): void {
    const v = this.vector.move;
    const m = this.move;

    v.x = -m.left.number + m.right.number;
    v.y = -m.down.number + m.up.number;
    v.z = -m.forward.number + m.backward.number;

    // console.log( 'move:', [ this.vectors.move.x, this.vectors.move.y, this.vectors.move.z ] );

    this.object.translateX(v.x * delta * this.moveSpeed);
    this.object.translateY(v.y * delta * this.moveSpeed);
    this.object.translateZ(v.z * delta * this.moveSpeed);
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
