import { StoreService } from '@core/store/store.service';
import { Mesh } from 'three';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { rotateOrbitalAxis } from '../../../utils';
import { SCOBuilder } from '../../builders';
import { HasMesh } from '../../models';

export class Moon implements HasMesh {
  mesh: Mesh;

  constructor(private store: StoreService) {
    this.mesh = this.createMoon();
  }

  update(delta: number) {
    rotateOrbitalAxis(this.mesh, delta, 5);
  }

  private createMoon(): Mesh {
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
