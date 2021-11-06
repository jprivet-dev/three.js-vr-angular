import { StoreService } from '@core/store/store.service';
import { AxialTilt, RadiusRatioEarth } from '../../../../constants';
import { SCOBuilder, SphericalCelestialObject } from '../../../builders';
import { LoopManager } from '../../../managers';
import { FactoryObject3D } from '../../../models';

export class NeptuneFactory implements FactoryObject3D {
  constructor(private store: StoreService, private loop: LoopManager) {}

  create(): SphericalCelestialObject {
    const neptune = this.createNeptune();

    this.loop.add(neptune);

    return neptune;
  }

  private createNeptune(): SphericalCelestialObject {
    const neptune = new SCOBuilder(this.store, 'neptune')
      .setSize(RadiusRatioEarth.Neptune)
      .setAxialTilt(AxialTilt.Neptune)
      .setMaterialParameters({
        wireframe: false,
        bumpScale: 0.01,
        specular: 0x2d4ea0,
        shininess: 6,
      })
      .setTexturesPath('assets/threejs/textures/space/neptune/')
      .setTexturesByDefinition({
        map: {
          sd: 'neptune_map_1024x512.jpg',
          hd: 'neptune_map_2048x1024.jpg',
        },
      })
      .build();

    neptune.setLoopCallback((delta) => {
      neptune.rotateOrbitalAxis(delta, 5);
    });

    return neptune;
  }
}
