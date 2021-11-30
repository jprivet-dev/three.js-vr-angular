import { Definition } from '../../../models/definition.model';
import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';
import { AxialTilt, RadiusRatioEarth } from '../../../constants';
import {
  getTextureByDefinition,
  rotateOrbitalAxis,
  setAxialTilt,
} from '../../../utils';
import { HasMesh, Loop, TexturesByDefinition } from '../../models';

export class Earth implements HasMesh, Loop, TexturesByDefinition {
  private loader: TextureLoader;
  private geometry: SphereGeometry;
  private material: MeshPhongMaterial;

  private cloudsLoader: TextureLoader;
  private cloudsGeometry: SphereGeometry;
  private cloudsMaterial: MeshPhongMaterial;

  mesh: Mesh;
  clouds: Mesh;

  constructor() {
    /**
     * Clouds
     */

    this.cloudsLoader = new TextureLoader().setPath(
      'assets/threejs/textures/space/clouds/'
    );

    this.cloudsGeometry = new SphereGeometry(
      RadiusRatioEarth.Earth + 0.005,
      64,
      32
    );

    this.cloudsMaterial = new MeshPhongMaterial({
      wireframe: false,
      color: 0xffffff,
      opacity: 0.9,
      transparent: true,
    });

    this.clouds = new Mesh(this.cloudsGeometry, this.cloudsMaterial);

    /**
     * Earth
     */

    this.loader = new TextureLoader().setPath(
      'assets/threejs/textures/space/earth/'
    );

    this.geometry = new SphereGeometry(RadiusRatioEarth.Earth, 64, 32);
    this.material = new MeshPhongMaterial({
      wireframe: false,
      bumpScale: 0.01,
      specular: 0x2d4ea0,
      shininess: 6,
    });

    this.mesh = new Mesh(this.geometry, this.material);
    setAxialTilt(this.mesh, AxialTilt.Earth);

    this.mesh.add(this.clouds);
  }

  loadTexturesByDefinition(definition: Definition): void {
    this.material.map = this.loader.load(
      getTextureByDefinition(definition, {
        sd: 'earth_map_1024x512.jpg',
        hd: 'earth_map_2048x1024.jpg',
      })
    );

    this.material.bumpMap = this.loader.load(
      getTextureByDefinition(definition, {
        sd: 'earth_bump_1024x512.jpg',
        hd: 'earth_bump_2048x1024.jpg',
      })
    );

    this.material.specularMap = this.loader.load(
      getTextureByDefinition(definition, {
        sd: 'earth_specular_1024x512.jpg',
        hd: 'earth_specular_2048x1024.jpg',
      })
    );

    this.cloudsMaterial.alphaMap = this.cloudsLoader.load(
      getTextureByDefinition(definition, {
        sd: 'clouds_1024x512.jpg',
        hd: 'clouds_2048x1024.jpg',
      })
    );
  }

  update(delta: number) {
    rotateOrbitalAxis(this.mesh, delta, 5);
    rotateOrbitalAxis(this.clouds, delta, 4);
  }
}
