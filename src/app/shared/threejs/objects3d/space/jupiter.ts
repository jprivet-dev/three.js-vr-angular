import { StoreService } from '@core/store/store.service';
import { Mesh } from 'three';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { rotateOrbitalAxis } from '../../../utils';
import { SCOBuilder } from '../../builders';
import { HasMesh, Loop } from '../../models';

export class Jupiter implements HasMesh, Loop {
  mesh: Mesh;

  constructor(private store: StoreService) {
    this.mesh = this.createJupiter();
  }

  update(delta: number) {
    rotateOrbitalAxis(this.mesh, delta, 5);
  }

  private createJupiter(): Mesh {
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
