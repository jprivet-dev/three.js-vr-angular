import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../builders';
import { ComplexObject3D } from '../../models/complex-object-3d.model';

export class Jupiter implements ComplexObject3D {
  mesh: SphericalCelestialObject;

  constructor(private store: StoreService) {
    this.mesh = this.createJupiter();
  }

  animate(delta: number) {
    this.mesh.rotateOrbitalAxis(delta, 5);
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
