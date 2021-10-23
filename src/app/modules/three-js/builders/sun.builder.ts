import { DirectionalLight } from 'three';
import { SunDecorator } from '../decorators';

export abstract class SunBuilder {
  private static config = {
    position: {
      x: -380,
      y: 240,
      z: -1000,
    },
  };

  static create(): SunDecorator {
    return new SunDecorator(this.newSun());
  }

  private static newSun(): DirectionalLight {
    const light = new DirectionalLight(0xffffff, 1.3);

    light.position.set(
      this.config.position.x,
      this.config.position.y,
      this.config.position.z
    );

    return light;
  }
}
