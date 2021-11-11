import { StoreService } from '@core/store/store.service';
import { Mesh } from 'three';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../builders';
import { ComplexObject3D } from '../../models/complex-object-3d.model';

export class Mercury implements ComplexObject3D {
  mesh: SphericalCelestialObject;

  constructor(private store: StoreService) {
    this.mesh = this.createMercury();
  }

  start() {}

  stop() {}

  animate(delta: number) {
    this.mesh.rotateOrbitalAxis(delta, 5);
  }

  private createMercury(): SphericalCelestialObject {
    return new SCOBuilder(this.store, 'mercury')
      .setSize(RadiusRatioEarth.Mercury)
      .setAxialTilt(AxialTilt.Mercury)
      .setMaterialParameters({
        wireframe: false,
        shininess: 0,
      })
      .setTexturesPath('assets/threejs/textures/space/mercury/')
      .setTexturesByDefinition({
        map: {
          sd: 'mercury_map_1024x512.jpg',
          hd: 'mercury_map_2048x1024.jpg',
        },
      })
      .build();
  }
}
