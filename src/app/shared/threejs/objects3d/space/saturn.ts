import { StoreService } from '@core/store/store.service';
import { DoubleSide, Mesh, RingBufferGeometry } from 'three';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { degToRad } from 'three/src/math/MathUtils';
import { AxialTilt, RadiusRatioEarth, SaturnRingsRatioEarth } from '../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../builders';
import { BasicMaterialTextureByDefinitionLoader } from '../../loaders';
import { ComplexObject3D } from '../../models/complex-object-3d.model';

export class Saturn implements ComplexObject3D {
  mesh: SphericalCelestialObject;

  constructor(private store: StoreService) {
    this.mesh = this.createSaturn();
    const rings = this.createRings();
    this.mesh.add(rings);
  }

  animate(delta: number) {
    this.mesh.rotateOrbitalAxis(delta, 5);
  }

  private createSaturn(): SphericalCelestialObject {
    const saturn = new SCOBuilder(this.store, 'saturn')
      .setSize(RadiusRatioEarth.Saturn)
      .setAxialTilt(AxialTilt.Saturn)
      .setAxialTiltDegreesAnimation(5)
      .setMaterialParameters({
        wireframe: false,
        shininess: 0,
      })
      .setTexturesPath('assets/threejs/textures/space/saturn/')
      .setTexturesByDefinition({
        map: {
          sd: 'saturn_map_1024x512.jpg',
          hd: 'saturn_map_2048x1024.jpg',
        },
      })
      .build();

    saturn.rotateX(degToRad(20));

    return saturn;
  }

  private createRings(): Mesh {
    const geometry = new RingBufferGeometry(
      SaturnRingsRatioEarth.innerRadius,
      SaturnRingsRatioEarth.outerRadius,
      64
    );

    // Todo: use MeshBasicMaterial instead
    const material = new MeshBasicMaterial({
      color: 0xffffff,
      side: DoubleSide,
      transparent: true,
    });

    const loader = new BasicMaterialTextureByDefinitionLoader(
      material,
      'assets/threejs/textures/space/saturn/',
      {
        map: {
          sd: 'saturn_rings_map_1024x1024.png',
          hd: 'saturn_rings_map_2048x2048.png',
        },
      }
    );

    this.store.definition$.subscribe((definition) => {
      loader.loadByDefinition(definition);
    });

    const mesh = new Mesh(geometry, material);
    mesh.rotateX(degToRad(90)); // TODO: Maths.PI

    return mesh;
  }
}
