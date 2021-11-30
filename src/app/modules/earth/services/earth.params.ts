import { DollyCameraParams } from '@shared/threejs/cameras';

export const earthDollyCameraParams: DollyCameraParams = {
  fov: 80,
  near: 1,
  far: 8000,
  vrSession: {
    onStart: {
      camera: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      },
      dolly: {
        position: { x: 0.5, y: 0, z: 2.5 },
        rotation: { x: 0, y: 0, z: 0 },
      },
    },
    onEnd: {
      camera: {
        position: { x: 0, y: 0, z: 5 },
        rotation: { x: 0, y: 0, z: 0 },
      },
      dolly: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      },
    }
  }
};
