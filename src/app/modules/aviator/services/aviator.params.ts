import { DollyCameraParams } from '@shared/threejs/cameras';

export const aviatorDollyCameraParams: DollyCameraParams = {
  fov: 80,
  near: 1,
  far: 8000,
  onVRSessionStartPosition: {
    camera: {
      x: 0,
      y: 0,
      z: 0,
    },
    dolly: {
      x: 0.5,
      y: 0,
      z: 2.5,
    },
  },
  onVRSessionEndPosition: {
    camera: {
      x: 0,
      y: 0,
      z: 5,
    },
    dolly: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
};
