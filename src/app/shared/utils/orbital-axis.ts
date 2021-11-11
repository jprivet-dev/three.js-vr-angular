import { Mesh } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

export const setAxialTilt = (mesh: Mesh, degrees: number): void => {
  mesh.rotation.set(0, 0, degToRad(degrees));
}

export const rotateOrbitalAxis = (mesh: Mesh, delta: number, degrees: number): void => {
  mesh.geometry.rotateY(degToRad(delta * degrees));
}
