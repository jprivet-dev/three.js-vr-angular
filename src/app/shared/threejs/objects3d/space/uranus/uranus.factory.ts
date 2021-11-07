import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../../builders';
import { LoopManager } from '../../../managers';
import { FactoryObject3D } from '../../../models';

export class UranusFactory implements FactoryObject3D {
  constructor(private store: StoreService, private loop: LoopManager) {}

  create(): SphericalCelestialObject {
    const uranus = this.createUranus();

    this.loop.add(uranus);

    return uranus;
  }

  private createUranus(): SphericalCelestialObject {
    const uranus = new SCOBuilder(this.store, 'uranus')
      .setSize(RadiusRatioEarth.Uranus)
      .setAxialTilt(AxialTilt.Uranus)
      .setMaterialParameters({
        wireframe: false,
        shininess: 0,
      })
      .setTexturesPath('assets/threejs/textures/space/uranus/')
      .setTexturesByDefinition({
        map: {
          sd: 'uranus_map_1024x512.jpg',
          hd: 'uranus_map_2048x1024.jpg',
        }
      })
      .build();

    uranus.setLoopCallback((delta) => {
      uranus.rotateOrbitalAxis(delta, 5);
    });

    return uranus;
  }
}
