import { SphereGeometry } from 'three';
import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { Material } from 'three/src/materials/Material';
import { degToRad } from 'three/src/math/MathUtils';
import { Mesh } from '../../models';

export class SphericalCelestialObject extends Mesh implements SCOAxialTilt {
  constructor(geometry: BufferGeometry, material: Material) {
    super(geometry, material);
  }

  setAxialTilt(degrees: number): void {
    this.rotation.set(0, 0, degToRad(degrees));
  }

  rotateOrbitalAxis(seconds: number, degreesPerSecond: number): void {
    this.geometry.rotateY(degToRad(seconds * degreesPerSecond));
  }
}

export interface SCOAxialTilt {
  setAxialTilt(degrees: number): void;

  rotateOrbitalAxis(seconds: number, degreesPerSecond: number): void;
}

export class SCOGeometry extends SphereGeometry {
  constructor(radius: number) {
    super(radius, 64, 32);
  }
}
