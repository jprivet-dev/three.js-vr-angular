import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../../builders';
import { LoopManager } from '../../../managers';
import { FactoryObject3D } from '../../../models';

export class MercuryFactory implements FactoryObject3D {
  constructor(private store: StoreService, private loop: LoopManager) {}

  create(): SphericalCelestialObject {
    const mercury = this.createMercury();

    this.loop.add(mercury);

    return mercury;
  }

  private createMercury(): SphericalCelestialObject {
    const mercury = new SCOBuilder(this.store, 'mercury')
      .setSize(RadiusRatioEarth.Mercury)
      .setAxialTilt(AxialTilt.Mercury)
      .setMaterialParameters({
        wireframe: false,
        bumpScale: 0.01,
        specular: 0x2d4ea0,
        shininess: 6,
      })
      .setTexturesPath('assets/threejs/textures/space/mercury/')
      .setTexturesByDefinition({
        map: {
          sd: 'mercury_map_1024x512.jpg',
          hd: 'mercury_map_2048x1024.jpg',
        }
      })
      .build();

    mercury.setLoopCallback((delta) => {
      mercury.rotateOrbitalAxis(delta, 5);
    });

    return mercury;
  }
}
