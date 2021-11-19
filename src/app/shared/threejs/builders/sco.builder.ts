import { StoreService } from '@core/store/store.service';
import { Mesh, MeshPhongMaterial, SphereGeometry } from 'three';
import { MeshPhongMaterialParameters } from 'three/src/materials/MeshPhongMaterial';
import { setAxialTilt } from '../../utils';
import {
  PhongMaterialTextureByDefinition,
  PhongMaterialTextureByDefinitionLoader,
} from '../loaders';

/**
 * Spherical Celestial Object Builder
 */
export class SCOBuilder {
  private size!: number;
  private axialTilt!: number;
  private materialParameters!: MeshPhongMaterialParameters;
  private texturesPath!: string;
  private texturesByDefinition!: PhongMaterialTextureByDefinition;

  constructor(private store: StoreService, private name: string) {}

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

  setTexturesPath(texturesPath: string): this {
    this.texturesPath = texturesPath;
    return this;
  }

  setTexturesByDefinition(textures: PhongMaterialTextureByDefinition): this {
    this.texturesByDefinition = textures;
    return this;
  }

  build(): Mesh {
    const geometry = new SphereGeometry(this.size, 64, 32);
    const material = new MeshPhongMaterial(this.materialParameters);
    const loader = new PhongMaterialTextureByDefinitionLoader(
      material,
      this.texturesPath,
      this.texturesByDefinition
    );

    this.store.definition$.subscribe((definition) => {
      loader.loadTexturesByDefinition(definition);
    });

    const mesh = new Mesh(geometry, material);
    mesh.name = this.name;

    if (this.axialTilt) {
      setAxialTilt(mesh, this.axialTilt);
    }

    return mesh;
  }
}
