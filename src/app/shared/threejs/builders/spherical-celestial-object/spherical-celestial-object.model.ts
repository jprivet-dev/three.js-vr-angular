import { Definition } from '@core/store/store.model';
import { Mesh, SphereGeometry } from 'three';
import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { Material } from 'three/src/materials/Material';
import { degToRad } from 'three/src/math/MathUtils';
import { Loop } from '../../managers';

export type SCOTexturesByDefinitionKeys = 'map' | 'bumpMap' | 'specularMap';

export type SCOTexturesByDefinition = {
  [key in SCOTexturesByDefinitionKeys]?: {
    [key in Definition]: string;
  };
};

export class SphericalCelestialObject extends Mesh implements AxialTilt, Loop {
  constructor(geometry: BufferGeometry, material: Material) {
    super(geometry, material);
  }

  setAxialTilt(degrees: number): void {
    this.rotation.set(0, 0, degToRad(degrees));
  }

  rotateOrbitalAxis(seconds: number, degreesPerSecond: number): void {
    this.geometry.rotateY(degToRad(seconds * degreesPerSecond));
  }

  loop(delta: number) {}
}

export interface AxialTilt {
  setAxialTilt(degrees: number): void;
  rotateOrbitalAxis(seconds: number, degreesPerSecond: number): void;
}

export class SphericalCelestialObjectGeometry extends SphereGeometry {
  constructor(radius: number) {
    super(radius, 64, 32);
  }
}
