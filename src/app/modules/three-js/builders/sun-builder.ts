import { DirectionalLight } from 'three';
import { SunDecorator } from '../decorators/sun-decorator';

export abstract class SunBuilder {
  static create(): SunDecorator {
    return new SunDecorator(this.newSun());
  }

  private static  newSun(): DirectionalLight {
    const white = 0xffffff;
    const intensity = 1.3;
    const position = {
      x: -380,
      y: 240,
      z: -1000,
    };
    const light = new DirectionalLight(white, intensity);
    light.position.set(position.x, position.y, position.z);

    return light;
  }
}
