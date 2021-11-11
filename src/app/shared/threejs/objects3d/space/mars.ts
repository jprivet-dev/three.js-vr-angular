import { StoreService } from '@core/store/store.service';
import { Mesh } from 'three';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { rotateOrbitalAxis } from '../../../utils';
import { SCOBuilder } from '../../builders';
import { HasMesh } from '../../models';

export class Mars implements HasMesh {
  mesh: Mesh;

  constructor(private store: StoreService) {
    this.mesh = this.createMars();
  }

  update(delta: number) {
    rotateOrbitalAxis(this.mesh, delta, 5);
  }

  private createMars(): Mesh {
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
