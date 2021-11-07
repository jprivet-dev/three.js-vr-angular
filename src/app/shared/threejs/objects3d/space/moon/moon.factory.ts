import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../../builders';
import { LoopManager } from '../../../managers';
import { FactoryObject3D } from '../../../models';

export class MoonFactory implements FactoryObject3D {
  constructor(private store: StoreService, private loop: LoopManager) {}

  create(): SphericalCelestialObject {
    const moon = this.createMoon();

    this.loop.add(moon);

    return moon;
  }

  private createMoon(): SphericalCelestialObject {
    const moon = new SCOBuilder(this.store, 'moon')
      .setSize(RadiusRatioEarth.Moon)
      .setAxialTilt(AxialTilt.Moon)
      .setMaterialParameters({
        wireframe: false,
        bumpScale: 0.005,
        shininess: 0,
      })
      .setTexturesPath('assets/threejs/textures/space/moon/')
      .setTexturesByDefinition({
        map: {
          sd: 'moon_map_512x256.jpg',
          hd: 'moon_map_1024x512.jpg',
        },
        bumpMap: {
          sd: 'moon_bump_512x256.jpg',
          hd: 'moon_bump_1024x512.jpg',
        },
      })
      .build();

    moon.setLoopCallback((delta) => {
      moon.rotateOrbitalAxis(delta, 5);
    });

    return moon;
  }
}
