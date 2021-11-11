import { StoreService } from '@core/store/store.service';
import { Mesh } from 'three';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { rotateOrbitalAxis } from '../../../utils';
import { SCOBuilder } from '../../builders';
import { HasMesh } from '../../models';

export class Mercury implements HasMesh {
  mesh: Mesh;

  constructor(private store: StoreService) {
    this.mesh = this.createMercury();
  }

  update(delta: number) {
    rotateOrbitalAxis(this.mesh, delta, 5);
  }

  private createMercury(): Mesh {
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
