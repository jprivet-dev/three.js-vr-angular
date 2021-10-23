import { DirectionalLight, TextureLoader } from 'three';
import {
  Lensflare, LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';
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
    const sun = loader.load('sun_512x512.jpg');
    const circle = loader.load('lens_flare_circle_32x32.jpg');
    const hexagone = loader.load('lens_flare_hexagon_256x256.jpg');

    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(sun, 1000, 0));
    lensflare.addElement(new LensflareElement(circle, 20, 0.63));
    lensflare.addElement(new LensflareElement(circle, 40, 0.64));
    lensflare.addElement(new LensflareElement(hexagone, 70, 0.7));
    lensflare.addElement(new LensflareElement(hexagone, 110, 0.8));
    lensflare.addElement(new LensflareElement(circle, 60, 0.85));
    lensflare.addElement(new LensflareElement(circle, 30, 0.86));
    lensflare.addElement(new LensflareElement(hexagone, 120, 0.9));
    lensflare.addElement(new LensflareElement(hexagone, 260, 1));

    light.add(lensflare);
  }
}
