import { Object3DMovementState } from './object3d-movement-state';

export interface Object3DMovementsMove {
  forward: Object3DMovementState;
  backward: Object3DMovementState;
  right: Object3DMovementState;
  left: Object3DMovementState;
  up: Object3DMovementState;
  down: Object3DMovementState;
}

export interface Object3DMovementsRotation {
  pitch: {
    up: Object3DMovementState;
    down: Object3DMovementState;
  };
  yaw: {
    right: Object3DMovementState;
    left: Object3DMovementState;
  };
  roll: {
    right: Object3DMovementState;
    left: Object3DMovementState;
  };
}
