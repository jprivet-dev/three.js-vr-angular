import { Definition } from '@core/store/store.model';
import { StoreService } from '@core/store/store.service';
import { DirectionalLight } from 'three';
import { HasLight } from '../../../models';
import { SunLensflareTextureLoader } from './sun-lensflare-texture.loader';
import { sunLensflareTextureParams } from './sun-lensflare-texture.params';
import {
  SunLensflare,
  SunLensflareElement,
  SunLensflareTexturesParams,
} from './sun.model';

export class SunLight implements HasLight {
  private elements: SunLensflareTexturesParams[] = sunLensflareTextureParams;
  light: DirectionalLight;

  constructor(private store: StoreService) {
    this.light = new DirectionalLight(0xffffff, 1.3);
    this.light.position.set(0, 0, 1000);

    const sunLensflare = this.createSunLensflare();
    this.light.add(sunLensflare);
  }

  private createSunLensflare(): SunLensflare {
    const definition: Definition = 'sd';

    const sunLensflare = new SunLensflare();
    const loader = new SunLensflareTextureLoader();
    const list: SunLensflareElement[] = [];

    this.elements.map((current) => {
      const element = new SunLensflareElement(
        loader.getTexture(current.type, definition),
        current
      );

      list.push(element);
      sunLensflare.addElement(element);
    });

    // Refresh texture on definition changing
    this.store.definition$.subscribe((definition) => {
      list.map((current) => {
        current.texture = loader.getTexture(current.type, definition);
      });
    });

    return sunLensflare;
  }
}
