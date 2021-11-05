import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../../constants';
import {
  SphericalCelestialObject,
  SphericalCelestialObjectBuilder,
} from '../../../builders';
import { FactoryObject3D } from '../../../models';

export class EarthFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): SphericalCelestialObject {
    const object = new SphericalCelestialObjectBuilder(this.store, 'earth')
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

    object.setLoopCallback((delta) => {
      object.rotateOrbitalAxis(delta, 5);
    })

    return object;
  }
}
