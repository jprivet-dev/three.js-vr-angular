import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../builders';
import { ComplexObject3D } from '../../models/complex-object-3d.model';

export class Earth implements ComplexObject3D {
  mesh: SphericalCelestialObject;
  clouds: SphericalCelestialObject;

  constructor(private store: StoreService) {
    this.mesh = this.createEarth();
    this.clouds = this.createClouds();
    this.mesh.add(this.clouds);
  }

  animate(delta: number) {
    this.mesh.rotateOrbitalAxis(delta, 5);
    this.clouds.rotateOrbitalAxis(delta, 4);
  }

  private createEarth(): SphericalCelestialObject {
    return new SCOBuilder(this.store, 'earth')
      .setSize(RadiusRatioEarth.Earth)
      .setAxialTilt(AxialTilt.Earth)
      .setMaterialParameters({
        wireframe: false,
        bumpScale: 0.01,
        specular: 0x2d4ea0,
        shininess: 6,
      })
      .setTexturesPath('assets/threejs/textures/space/earth/')
      .setTexturesByDefinition({
        map: {
          sd: 'earth_map_1024x512.jpg',
          hd: 'earth_map_2048x1024.jpg',
        },
        bumpMap: {
          sd: 'earth_bump_1024x512.jpg',
          hd: 'earth_bump_2048x1024.jpg',
        },
        specularMap: {
          sd: 'earth_specular_1024x512.jpg',
          hd: 'earth_specular_2048x1024.jpg',
        },
      })
      .build();
  }

  private createClouds(): SphericalCelestialObject {
    return new SCOBuilder(this.store, 'clouds')
      .setSize(RadiusRatioEarth.Earth + 0.005)
      .setMaterialParameters({
        wireframe: false,
        color: 0xffffff,
        opacity: 0.9,
        transparent: true,
      })
      .setTexturesPath('assets/threejs/textures/space/clouds/')
      .setTexturesByDefinition({
        alphaMap: {
          sd: 'clouds_1024x512.jpg',
          hd: 'clouds_2048x1024.jpg',
        },
      })
      .build();
  }
}
