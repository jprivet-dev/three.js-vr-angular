import { StoreService } from '@core/store/store.service';
import { MeshPhongMaterial } from 'three';
import { MeshPhongMaterialParameters } from 'three/src/materials/MeshPhongMaterial';
import { SphericalCelestialObjectTextureLoader } from './spherical-celestial-object-texture.loader';
import {
  SCOTexturesByDefinition,
  SphericalCelestialObject,
  SphericalCelestialObjectGeometry,
} from './spherical-celestial-object.model';

export class SphericalCelestialObjectBuilder {
  private size!: number;
  private axialTilt!: number;
  private materialParameters!: MeshPhongMaterialParameters;
  private texturesPath!: string;
  private texturesByDefinition!: SCOTexturesByDefinition;

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

  setTexturesByDefinition(textures: SCOTexturesByDefinition): this {
    this.texturesByDefinition = textures;
    return this;
  }

  build(): SphericalCelestialObject {
    const geometry = new SphericalCelestialObjectGeometry(this.size);
    const material = new MeshPhongMaterial(this.materialParameters);
    const loader = new SphericalCelestialObjectTextureLoader(
      material,
      this.texturesPath,
      this.texturesByDefinition
    );

    this.store.definition$.subscribe((definition) => {
      loader.loadByDefinition(definition);
    });

    const object = new SphericalCelestialObject(geometry, material);
    object.name = this.name;

    if (this.axialTilt) {
      object.setAxialTilt(this.axialTilt);
    }

    return object;
  }
}
