import { DirectionalLight } from 'three';
import { SunDecorator } from '../decorators';

export abstract class SunBuilder {
  static create(): SunDecorator {
    return new SunDecorator(this.newSun());
  }

  private static newSun(): DirectionalLight {
    const dirLight = new DirectionalLight(0xffffff, 1.3);

    dirLight.position.set(-1, 0, -1).normalize();

    return dirLight;
  }

  private static createLensFlare() {}
}
