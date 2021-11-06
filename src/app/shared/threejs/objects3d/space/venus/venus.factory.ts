import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../../builders';
import { LoopManager } from '../../../managers';
import { FactoryObject3D } from '../../../models';

export class VenusFactory implements FactoryObject3D {
  constructor(private store: StoreService, private loop: LoopManager) {}

  create(): SphericalCelestialObject {
    const venus = this.createVenus();

    this.loop.add(venus);

    return venus;
  }

  private createVenus(): SphericalCelestialObject {
    const venus = new SCOBuilder(this.store, 'venus')
      .setSize(RadiusRatioEarth.Venus)
      .setAxialTilt(AxialTilt.Venus)
      .setMaterialParameters({
        wireframe: false,
        bumpScale: 0.01,
        specular: 0x2d4ea0,
        shininess: 6,
      })
      .setTexturesPath('assets/threejs/textures/space/venus/')
      .setTexturesByDefinition({
        map: {
          sd: 'venus_map_1024x512.jpg',
          hd: 'venus_map_2048x1024.jpg',
        }
      })
      .build();

    venus.setLoopCallback((delta) => {
      venus.rotateOrbitalAxis(delta, 5);
    });

    return venus;
  }
}
