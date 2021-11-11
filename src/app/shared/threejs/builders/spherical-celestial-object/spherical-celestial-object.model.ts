import { Mesh, SphereGeometry } from 'three';
import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { Material } from 'three/src/materials/Material';
import { degToRad } from 'three/src/math/MathUtils';
import { Animation, HasAnimation } from '../../managers';

export class SphericalCelestialObject
  extends Mesh
  implements SCOAxialTilt, HasAnimation
{
  private animation!: Animation;

  constructor(geometry: BufferGeometry, material: Material) {
    super(geometry, material);
  }

  setAxialTilt(degrees: number): void {
    this.rotation.set(0, 0, degToRad(degrees));
  }

  rotateOrbitalAxis(delta: number, degrees: number): void {
    this.geometry.rotateY(degToRad(delta * degrees));
  }

  setAnimation(animation: Animation): void {
    this.animation = animation;
  }

  getAnimation(): Animation {
    return this.animation;
  }
}

export interface SCOAxialTilt {
  setAxialTilt(degrees: number): void;

  rotateOrbitalAxis(delta: number, degrees: number): void;
}

export class SCOGeometry extends SphereGeometry {
  constructor(radius: number) {
    super(radius, 64, 32);
  }
}
