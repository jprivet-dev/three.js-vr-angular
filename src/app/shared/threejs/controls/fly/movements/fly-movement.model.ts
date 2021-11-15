import { FlyMovementState } from './fly-movement-state';

export interface FlyMovementsMove {
  forward: FlyMovementState;
  backward: FlyMovementState;
  right: FlyMovementState;
  left: FlyMovementState;
  up: FlyMovementState;
  down: FlyMovementState;
}

export interface FlyMovementsRotation {
  pitch: {
    up: FlyMovementState;
    down: FlyMovementState;
  };
  yaw: {
    right: FlyMovementState;
    left: FlyMovementState;
  };
  roll: {
    right: FlyMovementState;
    left: FlyMovementState;
  };
}
