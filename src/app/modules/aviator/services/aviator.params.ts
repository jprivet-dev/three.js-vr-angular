import { DollyCameraParams } from '@shared/threejs/cameras';

export const aviatorDollyCameraParams: DollyCameraParams = {
  fov: 80,
  near: 1,
  far: 20000,
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
      y: 50, // 100
      z: 150, // 200
    },
    dolly: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
};
