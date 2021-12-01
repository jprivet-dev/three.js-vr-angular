import { DollyCameraParams } from '@shared/threejs/cameras';

export const planetsDollyCameraParams: DollyCameraParams = {
  fov: 30, // 80
  near: 1,
  far: 2000, // 8000
  vrSession: {
    onStart: {
      camera: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      },
      dolly: {
        position: { x: 0, y: 1, z: 5 },
        rotation: { x: 0, y: 0, z: 0 },
      },
    },
    onEnd: {
      camera: {
        position: { x: 0, y: 3, z: 20 },
        rotation: { x: 0, y: 0, z: 0 },
      },
      dolly: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      },
    },
  },
};
