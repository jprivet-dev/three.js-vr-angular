import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../../builders';
import { FactoryObject3D } from '../../../models';

export class JupiterFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): SphericalCelestialObject {
    return this.createJupiter();
  }

  private createJupiter(): SphericalCelestialObject {
    return new SCOBuilder(this.store, 'jupiter')
      .setSize(RadiusRatioEarth.Jupiter)
      .setAxialTilt(AxialTilt.Jupiter)
      .setMaterialParameters({
        wireframe: false,
        shininess: 0,
      })
      .setTexturesPath('assets/threejs/textures/space/jupiter/')
      .setTexturesByDefinition({
        map: {
          sd: 'jupiter_map_1024x512.jpg',
          hd: 'jupiter_map_2048x1024.jpg',
        },
      })
      .build();
  }
}
