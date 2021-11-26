import { Vector3 } from 'three';

export const angleXZ = (v1: Vector3, v2: Vector3): number => {
  return Math.atan2(v2.z - v1.z, v2.x - v1.x);
}
