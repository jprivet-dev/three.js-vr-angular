import { StoreService } from '@core/store/store.service';
import { MeshPhongMaterial } from 'three';
import { MeshPhongMaterialParameters } from 'three/src/materials/MeshPhongMaterial';
import {
  PhongMaterialTextureByDefinition,
  PhongMaterialTextureByDefinitionLoader,
} from '../../loaders';
import { SCOAnimation } from './spherical-celestial-object-animation';
import {
  SCOGeometry,
  SphericalCelestialObject,
} from './spherical-celestial-object.model';

export class SCOBuilder {
  private size!: number;
  private axialTilt!: number;
  private axialTiltDegreesAnimation!: number;
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

  setAxialTiltDegreesAnimation(degrees: number): this {
    this.axialTiltDegreesAnimation = degrees;
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

  build(): SphericalCelestialObject {
    const geometry = new SCOGeometry(this.size);
    const material = new MeshPhongMaterial(this.materialParameters);
    const loader = new PhongMaterialTextureByDefinitionLoader(
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

    if (this.axialTiltDegreesAnimation) {
      const animation = new SCOAnimation(
        object,
        this.axialTiltDegreesAnimation
      );
      object.setAnimation(animation);
    }

    return object;
  }
}
