import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../../builders';
import { LoopManager } from '../../../managers';
import { FactoryObject3D } from '../../../models';

export class EarthFactory implements FactoryObject3D {
  constructor(private store: StoreService, private loop: LoopManager) {}

  create(): SphericalCelestialObject {
    const earth = this.createEarth();
    const clouds = this.createClouds();
    earth.add(clouds);

    this.loop.add(earth);
    this.loop.add(clouds);

    return earth;
  }

  private createEarth(): SphericalCelestialObject {
    const earth = new SCOBuilder(this.store, 'earth')
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

    earth.setLoopCallback((delta) => {
      earth.rotateOrbitalAxis(delta, 5);
    });

    return earth;
  }

  private createClouds(): SphericalCelestialObject {
    const clouds = new SCOBuilder(this.store, 'clouds')
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

    clouds.setLoopCallback((delta) => {
      clouds.rotateOrbitalAxis(delta, 4);
    });

    return clouds;
  }
}
