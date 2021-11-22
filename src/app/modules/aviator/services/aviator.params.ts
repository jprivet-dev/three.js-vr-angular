import { DollyCameraParams } from '@shared/threejs/cameras';

export const aviatorDollyCameraParams: DollyCameraParams = {
  fov: 60,
  near: 1,
  far: 10000,
  onVRSessionStartPosition: {
    camera: {
      x: 0,
      y: 0,
      z: 0,
    },
    dolly: {
      x: 0,
      y: 200,
      z: 100,
    },
  },
  onVRSessionEndPosition: {
    camera: {
      x: 0,
      y: 100,
      z: 200,
    },
    dolly: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
};
