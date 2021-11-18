import { StoreService } from '@core/store/store.service';
import { Mesh } from 'three';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { rotateOrbitalAxis } from '../../../utils';
import { SCOBuilder } from '../../builders';
import { HasMesh, Loop } from '../../models';

export class Neptune implements HasMesh, Loop {
  mesh: Mesh;

  constructor(private store: StoreService) {
    this.mesh = this.createNeptune();
  }

  update(delta: number) {
    rotateOrbitalAxis(this.mesh, delta, 5);
  }

  private createNeptune(): Mesh {
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
