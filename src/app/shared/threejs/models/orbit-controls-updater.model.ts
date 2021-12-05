import { Vector3 } from 'three/src/Three';

export interface OrbitControlsUpdaterParams {
  autoRotateSpeed?: number;
  autoRotate?: boolean;
  enableDamping?: boolean;
  target?: Vector3;
  minDistance?: number;
  maxDistance?: number;
}
