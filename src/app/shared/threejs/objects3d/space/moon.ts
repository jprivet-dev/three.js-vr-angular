import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import { Definition } from '../../../models/definition.model';
import {
  getTextureByDefinition,
  rotateOrbitalAxis,
  setAxialTilt,
} from '../../../utils';
import { HasMesh, Loop, TexturesByDefinition } from '../../models';

export class Moon implements HasMesh, Loop, TexturesByDefinition {
  private loader: TextureLoader;
  private geometry: SphereGeometry;
  private material: MeshPhongMaterial;

  mesh: Mesh;

  constructor() {
    this.loader = new TextureLoader().setPath(
      'assets/threejs/textures/space/moon/'
    );

    this.geometry = new SphereGeometry(RadiusRatioEarth.Moon, 64, 32);
    this.material = new MeshPhongMaterial({
      wireframe: false,
      bumpScale: 0.005,
      shininess: 0,
    });

    this.mesh = new Mesh(this.geometry, this.material);
    setAxialTilt(this.mesh, AxialTilt.Moon);
  }

  loadTexturesByDefinition(definition: Definition): void {
    this.material.map = this.loader.load(
      getTextureByDefinition(definition, {
        sd: 'moon_map_512x256.jpg',
        hd: 'moon_map_1024x512.jpg',
      })
    );

    this.material.bumpMap = this.loader.load(
      getTextureByDefinition(definition, {
        sd: 'moon_bump_512x256.jpg',
        hd: 'moon_bump_1024x512.jpg',
      })
    );
  }

  update(delta: number): void {
    rotateOrbitalAxis(this.mesh, delta, 5);
  }
}
