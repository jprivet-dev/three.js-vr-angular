import {
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  RingBufferGeometry,
  SphereGeometry,
  TextureLoader,
} from 'three';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { degToRad } from 'three/src/math/MathUtils';
import {
  AxialTilt,
  RadiusRatioEarth,
  SaturnRingsRatioEarth,
} from '../../../constants';
import { Definition } from '../../../models/definition.model';
import {
  getTextureByDefinition,
  rotateOrbitalAxis,
  setAxialTilt,
} from '../../../utils';
import { HasMesh, Loop, TexturesByDefinition } from '../../models';

export class Saturn implements HasMesh, Loop, TexturesByDefinition {
  private loader: TextureLoader;
  private geometry: SphereGeometry;
  private material: MeshPhongMaterial;
  private ringsGeometry: RingBufferGeometry;
  private ringsMaterial: MeshBasicMaterial;

  mesh: Mesh;
  rings: Mesh;

  constructor() {
    /**
     * Rings
     */
    this.ringsGeometry = new RingBufferGeometry(
      SaturnRingsRatioEarth.innerRadius,
      SaturnRingsRatioEarth.outerRadius,
      64
    );

    // Todo: use MeshBasicMaterial instead
    this.ringsMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      side: DoubleSide,
      transparent: true,
    });

    this.rings = new Mesh(this.ringsGeometry, this.ringsMaterial);
    this.rings.rotateX(degToRad(90)); // TODO: Maths.PI

    /**
     * Saturn
     */

    this.loader = new TextureLoader().setPath(
      'assets/threejs/textures/space/saturn/'
    );

    this.geometry = new SphereGeometry(RadiusRatioEarth.Saturn, 64, 32);
    this.material = new MeshPhongMaterial({
      wireframe: false,
      shininess: 0,
    });

    this.mesh = new Mesh(this.geometry, this.material);
    setAxialTilt(this.mesh, AxialTilt.Saturn);

    this.mesh.add(this.rings);
  }

  loadTexturesByDefinition(definition: Definition): void {
    this.material.map = this.loader.load(
      getTextureByDefinition(definition, {
        sd: 'saturn_map_1024x512.jpg',
        hd: 'saturn_map_2048x1024.jpg',
      })
    );

    this.ringsMaterial.map = this.loader.load(
      getTextureByDefinition(definition, {
        sd: 'saturn_rings_map_1024x1024.png',
        hd: 'saturn_rings_map_2048x2048.png',
      })
    );
  }

  update(delta: number): void {
    rotateOrbitalAxis(this.mesh, delta, 5);
  }
}
