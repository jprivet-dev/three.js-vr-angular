import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../builders';
import { ComplexObject3D } from '../../models/complex-object-3d.model';

export class Venus implements ComplexObject3D {
  mesh: SphericalCelestialObject;

  constructor(private store: StoreService) {
    this.mesh = this.createVenus();
  }

  start() {}

  stop() {}

  animate(delta: number) {
    this.mesh.rotateOrbitalAxis(delta, 5);
  }

  private createVenus(): SphericalCelestialObject {
    const venus = new SCOBuilder(this.store, 'venus')
      .setSize(RadiusRatioEarth.Venus)
      .setAxialTilt(AxialTilt.Venus)
      .setMaterialParameters({
        wireframe: false,
        shininess: 0,
      })
      .setTexturesPath('assets/threejs/textures/space/venus/')
      .setTexturesByDefinition({
        map: {
          sd: 'venus_map_1024x512.jpg',
          hd: 'venus_map_2048x1024.jpg',
        },
      })
      .build();

    return venus;
  }
}
