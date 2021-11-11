import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../builders';
import { ComplexObject3D } from '../../models/complex-object-3d.model';

export class Uranus implements ComplexObject3D {
  mesh: SphericalCelestialObject;

  constructor(private store: StoreService) {
    this.mesh = this.createUranus();
  }

  animate(delta: number) {
    this.mesh.rotateOrbitalAxis(delta, 5);
  }

  private createUranus(): SphericalCelestialObject {
    return new SCOBuilder(this.store, 'uranus')
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
        },
      })
      .build();
  }
}
