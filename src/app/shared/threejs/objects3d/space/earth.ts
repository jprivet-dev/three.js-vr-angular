import { StoreService } from '@core/store/store.service';
import { Mesh } from 'three';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { rotateOrbitalAxis } from '../../../utils';
import { SCOBuilder } from '../../builders';
import { HasMesh, Loop } from '../../models';

export class Earth implements HasMesh, Loop {
  mesh: Mesh;
  clouds: Mesh;

  constructor(private store: StoreService) {
    this.mesh = this.createEarth();
    this.clouds = this.createClouds();
    this.mesh.add(this.clouds);
  }

  update(delta: number) {
    rotateOrbitalAxis(this.mesh, delta, 5);
    rotateOrbitalAxis(this.clouds, delta, 4);
  }

  private createEarth(): Mesh {
    return new SCOBuilder(this.store, 'earth')
      .setSize(RadiusRatioEarth.Earth)
      .setAxialTilt(AxialTilt.Earth)
      .setMaterialParameters({
        wireframe: false,
        bumpScale: 0.01,
        specular: 0x2d4ea0,
        shininess: 6,
      })
      .setTexturesPath('assets/threejs/textures/space/earth/')
      .setTexturesByDefinition({
        map: {
          sd: 'earth_map_1024x512.jpg',
          hd: 'earth_map_2048x1024.jpg',
        },
        bumpMap: {
          sd: 'earth_bump_1024x512.jpg',
          hd: 'earth_bump_2048x1024.jpg',
        },
        specularMap: {
          sd: 'earth_specular_1024x512.jpg',
          hd: 'earth_specular_2048x1024.jpg',
        },
      })
      .build();
  }

  private createClouds(): Mesh {
    return new SCOBuilder(this.store, 'clouds')
      .setSize(RadiusRatioEarth.Earth + 0.005)
      .setMaterialParameters({
        wireframe: false,
        color: 0xffffff,
        opacity: 0.9,
        transparent: true,
      })
      .setTexturesPath('assets/threejs/textures/space/clouds/')
      .setTexturesByDefinition({
        alphaMap: {
          sd: 'clouds_1024x512.jpg',
          hd: 'clouds_2048x1024.jpg',
        },
      })
      .build();
  }
}
