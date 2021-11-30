import { Definition } from '../../../models/definition.model';
import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import {
  getTextureByDefinition,
  rotateOrbitalAxis,
  setAxialTilt,
} from '../../../utils';
import { HasMesh, Loop, TexturesByDefinition } from '../../models';

export class Jupiter implements HasMesh, Loop, TexturesByDefinition {
  private loader: TextureLoader;
  private geometry: SphereGeometry;
  private material: MeshPhongMaterial;

  mesh: Mesh;

  constructor() {
    this.loader = new TextureLoader().setPath(
      'assets/threejs/textures/space/jupiter/'
    );

    this.geometry = new SphereGeometry(RadiusRatioEarth.Jupiter, 64, 32);
    this.material = new MeshPhongMaterial({
      wireframe: false,
      shininess: 0,
    });

    this.mesh = new Mesh(this.geometry, this.material);
    setAxialTilt(this.mesh, AxialTilt.Jupiter);
  }

  loadTexturesByDefinition(definition: Definition): void {
    this.material.map = this.loader.load(
      getTextureByDefinition(definition, {
        sd: 'jupiter_map_1024x512.jpg',
        hd: 'jupiter_map_2048x1024.jpg',
      })
    );
  }

  update(delta: number) {
    rotateOrbitalAxis(this.mesh, delta, 5);
  }
}
