import { Definition } from '@core/store/store.model';
import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import {
  getTextureByDefinition,
  rotateOrbitalAxis,
  setAxialTilt,
} from '../../../utils';
import { HasMesh, Loop, TexturesByDefinition } from '../../models';

export class Mercury implements HasMesh, Loop, TexturesByDefinition {
  private loader: TextureLoader;
  private geometry: SphereGeometry;
  private material: MeshPhongMaterial;

  mesh: Mesh;

  constructor() {
    this.loader = new TextureLoader().setPath(
      'assets/threejs/textures/space/mercury/'
    );

    this.geometry = new SphereGeometry(RadiusRatioEarth.Mercury, 64, 32);
    this.material = new MeshPhongMaterial({
      wireframe: false,
      shininess: 0,
    });

    this.mesh = new Mesh(this.geometry, this.material);
    setAxialTilt(this.mesh, AxialTilt.Mercury);
  }

  loadTexturesByDefinition(definition: Definition): void {
    this.material.map = this.loader.load(
      getTextureByDefinition(definition, {
        sd: 'mercury_map_1024x512.jpg',
        hd: 'mercury_map_2048x1024.jpg',
      })
    );
  }

  update(delta: number) {
    rotateOrbitalAxis(this.mesh, delta, 5);
  }
}
