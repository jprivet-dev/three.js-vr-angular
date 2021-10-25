import { StoreService } from '@core/store/store.service';
import { DirectionalLight } from 'three';
import { SunDecorator } from '../decorators';
import { SunTexturesParams } from '../models';
import { Factory } from './factory';

// Here is it a good idea ?
export class SunFactory implements Factory {
  private textures: SunTexturesParams = {
    sun: {
      sd: 'sun_512x512.jpg',
      hd: 'sun_1024x1024.jpg',
    },
    circle: {
      sd: 'lens_flare_circle_32x32.jpg',
      hd: 'lens_flare_circle_64x64.jpg',
    },
    hexagon: {
      sd: 'lens_flare_hexagon_128x128.jpg',
      hd: 'lens_flare_hexagon_256x256.jpg',
    },
  };

  constructor(private store: StoreService) {}

  create(): SunDecorator {
    return new SunDecorator(this.store, this.newSun());
  }

  private newSun(): DirectionalLight {
    const light = new DirectionalLight(0xffffff, 1.3);
    light.position.set(-250, 0, -1000);

    return light;
  }
}
