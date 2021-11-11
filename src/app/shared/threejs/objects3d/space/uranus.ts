import { StoreService } from '@core/store/store.service';
import { Mesh } from 'three';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { rotateOrbitalAxis } from '../../../utils';
import { SCOBuilder } from '../../builders';
import { HasMesh } from '../../models';

export class Uranus implements HasMesh {
  mesh: Mesh;

  constructor(private store: StoreService) {
    this.mesh = this.createUranus();
  }

  update(delta: number) {
    rotateOrbitalAxis(this.mesh, delta, 5);
  }

  private createUranus(): Mesh {
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
