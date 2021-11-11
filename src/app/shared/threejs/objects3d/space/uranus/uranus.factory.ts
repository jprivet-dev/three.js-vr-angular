import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../../builders';
import { FactoryObject3D } from '../../../models';

export class UranusFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): SphericalCelestialObject {
    return this.createUranus();
  }

  private createUranus(): SphericalCelestialObject {
    return new SCOBuilder(this.store, 'uranus')
      .setSize(RadiusRatioEarth.Uranus)
      .setAxialTilt(AxialTilt.Uranus)
      .setAxialTiltDegreesAnimation(5)
      .setMaterialParameters({
        wireframe: false,
        shininess: 0,
      })
      .setTexturesPath('assets/threejs/textures/space/uranus/')
      .setTexturesByDefinition({
        map: {
          sd: 'uranus_map_1024x512.jpg',
          hd: 'uranus_map_2048x1024.jpg',
        },
      })
      .build();
  }
}
