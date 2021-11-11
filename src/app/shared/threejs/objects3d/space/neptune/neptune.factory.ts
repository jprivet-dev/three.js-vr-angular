import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../../builders';
import { FactoryObject3D } from '../../../models';

export class NeptuneFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): SphericalCelestialObject {
    return this.createNeptune();
  }

  private createNeptune(): SphericalCelestialObject {
    return new SCOBuilder(this.store, 'neptune')
      .setSize(RadiusRatioEarth.Neptune)
      .setAxialTilt(AxialTilt.Neptune)
      .setAxialTiltDegreesAnimation(5)
      .setMaterialParameters({
        wireframe: false,
        shininess: 0,
      })
      .setTexturesPath('assets/threejs/textures/space/neptune/')
      .setTexturesByDefinition({
        map: {
          sd: 'neptune_map_1024x512.jpg',
          hd: 'neptune_map_2048x1024.jpg',
        },
      })
      .build();
  }
}
