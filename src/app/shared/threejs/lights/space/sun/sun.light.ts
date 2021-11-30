import { Definition } from '../../../../models/definition.model';
import { DirectionalLight } from 'three';
import { HasLight, TexturesByDefinition } from '../../../models';
import { SunLensflareTextureLoader } from './sun-lensflare-texture.loader';
import { sunLensflareTextureParams } from './sun-lensflare-texture.params';
import {
  SunLensflare,
  SunLensflareElement,
  SunLensflareTexturesParams,
} from './sun.model';

export class SunLight implements HasLight, TexturesByDefinition {
  private loader: SunLensflareTextureLoader = new SunLensflareTextureLoader();
  private list: SunLensflareElement[] = [];
  private elements: SunLensflareTexturesParams[] = sunLensflareTextureParams;

  light: DirectionalLight;

  constructor() {
    this.light = new DirectionalLight(0xffffff, 1.3);
    this.light.position.set(0, 0, 1000);

    const sunLensflare = this.createSunLensflare();
    this.light.add(sunLensflare);
  }

  loadTexturesByDefinition(definition: Definition): void {
    this.list.map((current) => {
      current.texture = this.loader.getTexture(current.type, definition);
    });
  }

  private createSunLensflare(): SunLensflare {
    const definition: Definition = 'sd';
    const sunLensflare = new SunLensflare();

    this.elements.map((element) => {
      const lensflare = new SunLensflareElement(
        this.loader.getTexture(element.type, definition),
        element
      );

      this.list.push(lensflare);
      sunLensflare.addElement(lensflare);
    });

    return sunLensflare;
  }
}
