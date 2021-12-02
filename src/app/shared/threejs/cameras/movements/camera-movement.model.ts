import { CameraMovementState } from './camera-movement-state';

export interface CameraMovementsMove {
  forward: CameraMovementState;
  backward: CameraMovementState;
  right: CameraMovementState;
  left: CameraMovementState;
  up: CameraMovementState;
  down: CameraMovementState;
}

export interface CameraMovementsRotation {
  pitch: {
    up: CameraMovementState;
    down: CameraMovementState;
  };
  yaw: {
    right: CameraMovementState;
    left: CameraMovementState;
  };
  roll: {
    right: CameraMovementState;
    left: CameraMovementState;
  };
}
