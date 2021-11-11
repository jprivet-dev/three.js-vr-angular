import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../builders';
import { ComplexObject3D } from '../../models/complex-object-3d.model';

export class Moon implements ComplexObject3D {
  mesh: SphericalCelestialObject;

  constructor(private store: StoreService) {
    this.mesh = this.createMoon();
  }

  start() {}

  stop() {}

  animate(delta: number) {
    this.mesh.rotateOrbitalAxis(delta, 5);
  }

  private createMoon(): SphericalCelestialObject {
    return new SCOBuilder(this.store, 'moon')
      .setSize(RadiusRatioEarth.Moon)
      .setAxialTilt(AxialTilt.Moon)
      .setMaterialParameters({
        wireframe: false,
        bumpScale: 0.005,
        shininess: 0,
      })
      .setTexturesPath('assets/threejs/textures/space/moon/')
      .setTexturesByDefinition({
        map: {
          sd: 'moon_map_512x256.jpg',
          hd: 'moon_map_1024x512.jpg',
        },
        bumpMap: {
          sd: 'moon_bump_512x256.jpg',
          hd: 'moon_bump_1024x512.jpg',
        },
      })
      .build();
  }
}
