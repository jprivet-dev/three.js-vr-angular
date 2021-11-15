import { Object3D, Vector3 } from 'three';
import { FlyMovementState } from './fly-movement-state';
import { FlyMovementsMove, FlyMovementsRotation } from './fly-movement.model';

export abstract class FlyMovements {
  moveVector = new Vector3(0, 0, 0);
  rotationVector = new Vector3(0, 0, 0);

  constructor(private object: Object3D) {}

  move: FlyMovementsMove = {
    forward: new FlyMovementState(),
    backward: new FlyMovementState(),
    right: new FlyMovementState(),
    left: new FlyMovementState(),
  };

  rotation: FlyMovementsRotation = {
    up: new FlyMovementState(),
    down: new FlyMovementState(),
    right: new FlyMovementState(),
    left: new FlyMovementState(),
  };
}
