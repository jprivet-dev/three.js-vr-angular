import { StoreService } from '@core/store/store.service';
import { Mesh } from 'three';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { rotateOrbitalAxis } from '../../../utils';
import { SCOBuilder } from '../../builders';
import { HasMesh, Loop } from '../../models';

export class Venus implements HasMesh, Loop {
  mesh: Mesh;

  constructor(private store: StoreService) {
    this.mesh = this.createVenus();
  }

  update(delta: number) {
    rotateOrbitalAxis(this.mesh, delta, 5);
  }

  private createVenus(): Mesh {
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
