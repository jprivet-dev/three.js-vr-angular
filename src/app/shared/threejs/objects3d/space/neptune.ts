import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../builders';
import { ComplexObject3D } from '../../models/complex-object-3d.model';

export class Neptune implements ComplexObject3D {
  mesh: SphericalCelestialObject;

  constructor(private store: StoreService) {
    this.mesh = this.createNeptune();
  }

  animate(delta: number) {
    this.mesh.rotateOrbitalAxis(delta, 5);
  }

  private createNeptune(): SphericalCelestialObject {
    return new SCOBuilder(this.store, 'neptune')
      .setSize(RadiusRatioEarth.Neptune)
      .setAxialTilt(AxialTilt.Neptune)
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
