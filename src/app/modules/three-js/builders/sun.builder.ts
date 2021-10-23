import { DirectionalLight, TextureLoader } from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { SunDecorator } from '../decorators';

export abstract class SunBuilder {
  static create(): SunDecorator {
    return new SunDecorator(this.newSun());
  }

  private static newSun(): DirectionalLight {
    const light = new DirectionalLight(0xffffff, 1.3);
    light.position.set(-250, 0, -1000);
    this.addLensFlare(light);

    return light;
  }

  private static addLensFlare(light: DirectionalLight) {
    const loader = new TextureLoader().setPath('assets/textures/sun/');
    const lensflare = new Lensflare();

    lensflare.addElement(
      new LensflareElement(loader.load('sun_512x512.jpg'), 1000, 0)
    );

    light.add(lensflare);
  }
}
