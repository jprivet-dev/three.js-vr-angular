import { DollyCameraParams } from '@shared/threejs/cameras';

export const aviatorDollyCameraParams: DollyCameraParams = {
  fov: 50,
  near: 0.1,
  far: 30000,
  vrSession: {
    onStart: {
      camera: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      },
      dolly: {
        position: { x: 0, y: 0.7, z: 2 },
        rotation: { x: 0, y: 0, z: 0 },
      },
    },
    onEnd: {
      camera: {
        position: { x: 0, y: 0.7, z: 3 },
        rotation: { x: 0, y: 0, z: 0 },
      },
      dolly: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      },
    },
  },
};
