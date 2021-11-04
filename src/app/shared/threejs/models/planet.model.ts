import { Mesh, MeshPhongMaterial, SphereGeometry } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

export class Planet extends Mesh {
  protected setAxialTilt(degrees: number): void {
    this.rotation.set(0, 0, degToRad(degrees));
  }

  protected rotateOrbitalAxis(seconds: number, degreesPerSecond: number): void {
    this.geometry.rotateY(degToRad(seconds * degreesPerSecond));
  }
}

export class PlanetGeometry extends SphereGeometry {
  constructor(radius: number) {
    super(radius, 64, 32);
  }
}
