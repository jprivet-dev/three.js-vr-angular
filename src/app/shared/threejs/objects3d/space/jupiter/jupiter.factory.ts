import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../../builders';
import { LoopManager } from '../../../managers';
import { FactoryObject3D } from '../../../models';

export class JupiterFactory implements FactoryObject3D {
  constructor(private store: StoreService, private loop: LoopManager) {}

  create(): SphericalCelestialObject {
    const jupiter = this.createJupiter();

    this.loop.add(jupiter);

    return jupiter;
  }

  private createJupiter(): SphericalCelestialObject {
    const jupiter = new SCOBuilder(this.store, 'jupiter')
      .setSize(RadiusRatioEarth.Jupiter)
      .setAxialTilt(AxialTilt.Jupiter)
      .setMaterialParameters({
        wireframe: false,
        bumpScale: 0.01,
        specular: 0x2d4ea0,
        shininess: 6,
      })
      .setTexturesPath('assets/threejs/textures/space/jupiter/')
      .setTexturesByDefinition({
        map: {
          sd: 'jupiter_map_1024x512.jpg',
          hd: 'jupiter_map_2048x1024.jpg',
        }
      })
      .build();

    jupiter.setLoopCallback((delta) => {
      jupiter.rotateOrbitalAxis(delta, 5);
    });

    return jupiter;
  }
}
