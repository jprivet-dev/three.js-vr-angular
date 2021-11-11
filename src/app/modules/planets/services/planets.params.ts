import { DollyCameraParams } from '@shared/threejs';

export const planetsDollyCameraParams: DollyCameraParams = {
  fov: 30, // 80
  near: 1,
  far: 2000, // 8000
  onVRSessionStartPosition: {
    camera: {
      x: 0,
      y: 0,
      z: 0,
    },
    dolly: {
      x: 0,
      y: 1,
      z: 5,
    },
  },
  onVRSessionEndPosition: {
    camera: {
      x: 0,
      y: 3,
      z: 20,
    },
    dolly: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
};
