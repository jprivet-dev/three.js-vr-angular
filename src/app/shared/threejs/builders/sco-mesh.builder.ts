import { Mesh, MeshPhongMaterial, SphereGeometry } from 'three';
import { MeshPhongMaterialParameters } from 'three/src/materials/MeshPhongMaterial';
import { setAxialTilt } from '../../utils';

/**
 * Spherical Celestial Object Builder
 */
export class SCOMeshBuilder {
  private size!: number;
  private axialTilt!: number;
  private materialParameters!: MeshPhongMaterialParameters;

  constructor(private name: string) {}

  setSize(size: number): this {
    this.size = size;
    return this;
  }

  setAxialTilt(degrees: number): this {
    this.axialTilt = degrees;
    return this;
  }

  setMaterialParameters(parameters: MeshPhongMaterialParameters): this {
    this.materialParameters = parameters;
    return this;
  }

  build(): Mesh {
    const geometry = new SphereGeometry(this.size, 64, 32);
    const material = new MeshPhongMaterial(this.materialParameters);
    const mesh = new Mesh(geometry, material);

    mesh.name = this.name;

    if (this.axialTilt) {
      setAxialTilt(mesh, this.axialTilt);
    }

    return mesh;
  }
}
