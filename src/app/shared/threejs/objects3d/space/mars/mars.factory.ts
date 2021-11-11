import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../../builders';
import { FactoryObject3D } from '../../../models';

export class MarsFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): SphericalCelestialObject {
    return this.createMars();
  }

  private createMars(): SphericalCelestialObject {
    return new SCOBuilder(this.store, 'mars')
      .setSize(RadiusRatioEarth.Mars)
      .setAxialTilt(AxialTilt.Mars)
      .setAxialTiltDegreesAnimation(5)
      .setMaterialParameters({
        wireframe: false,
        shininess: 0,
      })
      .setTexturesPath('assets/threejs/textures/space/mars/')
      .setTexturesByDefinition({
        map: {
          sd: 'mars_map_1024x512.jpg',
          hd: 'mars_map_2048x1024.jpg',
        },
      })
      .build();
  }
}
