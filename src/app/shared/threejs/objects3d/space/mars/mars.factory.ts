import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../../builders';
import { LoopManager } from '../../../managers';
import { FactoryObject3D } from '../../../models';

export class MarsFactory implements FactoryObject3D {
  constructor(private store: StoreService, private loop: LoopManager) {}

  create(): SphericalCelestialObject {
    const mars = this.createMars();

    this.loop.add(mars);

    return mars;
  }

  private createMars(): SphericalCelestialObject {
    const mars = new SCOBuilder(this.store, 'mars')
      .setSize(RadiusRatioEarth.Mars)
      .setAxialTilt(AxialTilt.Mars)
      .setMaterialParameters({
        wireframe: false,
        shininess: 0,
      })
      .setTexturesPath('assets/threejs/textures/space/mars/')
      .setTexturesByDefinition({
        map: {
          sd: 'mars_map_1024x512.jpg',
          hd: 'mars_map_2048x1024.jpg',
        }
      })
      .build();

    mars.setLoopCallback((delta) => {
      mars.rotateOrbitalAxis(delta, 5);
    });

    return mars;
  }
}
