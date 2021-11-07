import { StoreService } from '@core/store/store.service';
import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  RingBufferGeometry,
  TextureLoader,
  Vector3,
} from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import {
  AxialTilt,
  RadiusRatioEarth,
  SaturnRingsRatioEarth,
} from '../../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../../builders';
import { LoopManager } from '../../../managers';
import { FactoryObject3D } from '../../../models';

export class SaturnFactory implements FactoryObject3D {
  constructor(private store: StoreService, private loop: LoopManager) {}

  create(): SphericalCelestialObject {
    const saturn = this.createSaturn();
    const rings = this.createRings();
    saturn.add(rings);

    this.loop.add(saturn);

    return saturn;
  }

  private createSaturn(): SphericalCelestialObject {
    const saturn = new SCOBuilder(this.store, 'saturn')
      .setSize(RadiusRatioEarth.Saturn)
      .setAxialTilt(AxialTilt.Saturn)
      .setMaterialParameters({
        wireframe: false,
        bumpScale: 0.01,
        specular: 0x2d4ea0,
        shininess: 6,
      })
      .setTexturesPath('assets/threejs/textures/space/saturn/')
      .setTexturesByDefinition({
        map: {
          sd: 'saturn_map_1024x512.jpg',
          hd: 'saturn_map_2048x1024.jpg',
        },
      })
      .build();

    saturn.setLoopCallback((delta) => {
      saturn.rotateOrbitalAxis(delta, 5);
    });

    return saturn;
  }

  private createRings(): Mesh {
    const texture = new TextureLoader()
      .setPath('assets/threejs/textures/space/saturn/')
      .load('saturn_rings_map_1024x1024.png');
    const geometry = new RingBufferGeometry(
      SaturnRingsRatioEarth.innerRadius,
      SaturnRingsRatioEarth.outerRadius,
      64
    );

    const material = new MeshBasicMaterial({
      map: texture,
      color: 0xffffff,
      side: DoubleSide,
      transparent: true,
    });

    const mesh = new Mesh(geometry, material);
    mesh.rotateX(degToRad(90));

    return mesh;
  }
}
