import { DollyCameraParams } from '@shared/threejs/cameras';

export const aviatorDollyCameraParams: DollyCameraParams = {
  fov: 50,
  near: 0.1,
  far: 30000,
  onVRSessionStartPosition: {
    camera: {
      x: 0,
      y: 0,
      z: 0,
    },
    dolly: {
      x: 0,
      y: 0.7,
      z: 2,
    },
  },
  onVRSessionEndPosition: {
    camera: {
      x: 0,
      y: 0.7, // 100
      z: 3, // 200
    },
    dolly: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
};
