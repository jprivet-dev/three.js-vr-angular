import { FlyMovementState } from './fly-movement-state';

export interface FlyMovementsMove {
  forward: FlyMovementState;
  backward: FlyMovementState;
  right: FlyMovementState;
  left: FlyMovementState;
}

export interface FlyMovementsRotation {
  up: FlyMovementState,
  down: FlyMovementState,
  right: FlyMovementState,
  left: FlyMovementState
}
