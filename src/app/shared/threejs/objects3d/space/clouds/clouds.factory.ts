import { StoreService } from '@core/store/store.service';
import { RadiusRatioEarth } from '../../../../constants';
import {
  SphericalCelestialObject,
  SCOBuilder,
} from '../../../builders';
import { FactoryObject3D } from '../../../models';

export class CloudsFactory implements FactoryObject3D {
  constructor(private store: StoreService) {}

  create(): SphericalCelestialObject {
    const object = new SCOBuilder(this.store, 'clouds')
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

    object.setLoopCallback((delta) => {
      object.rotateOrbitalAxis(delta, 4);
    });

    return object;
  }
}
