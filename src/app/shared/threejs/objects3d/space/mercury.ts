import { Definition } from '@core/store/store.model';
import { Mesh, MeshPhongMaterial } from 'three';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { rotateOrbitalAxis } from '../../../utils';
import { SCOMeshBuilder } from '../../builders';
import { PhongMaterialTextureByDefinitionLoader } from '../../loaders';
import { HasMesh, Loop, TextureByDefinition } from '../../models';

export class Mercury implements HasMesh, Loop, TextureByDefinition {
  mesh: Mesh;

  constructor() {
    this.mesh = new SCOMeshBuilder('mercury')
      .setSize(RadiusRatioEarth.Mercury)
      .setAxialTilt(AxialTilt.Mercury)
      .setMaterialParameters({
        wireframe: false,
        shininess: 0,
      })
      .build();
  }

  loadTextureByDefinition(definition: Definition): void {
    new PhongMaterialTextureByDefinitionLoader(
      this.mesh.material as MeshPhongMaterial,
      'assets/threejs/textures/space/mercury/',
      {
        map: {
          sd: 'mercury_map_1024x512.jpg',
          hd: 'mercury_map_2048x1024.jpg',
        },
      }
    ).loadTextureByDefinition(definition);
  }

  update(delta: number) {
    rotateOrbitalAxis(this.mesh, delta, 5);
  }
}
