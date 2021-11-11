import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../builders';
import { ComplexObject3D } from '../../models/complex-object-3d.model';

export class Mars implements ComplexObject3D {
  mesh: SphericalCelestialObject;

  constructor(private store: StoreService) {
    this.mesh = this.createMars();
  }

  animate(delta: number) {
    this.mesh.rotateOrbitalAxis(delta, 5);
  }

  private createMars(): SphericalCelestialObject {
    return new SCOBuilder(this.store, 'mars')
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
        },
      })
      .build();
  }
}
