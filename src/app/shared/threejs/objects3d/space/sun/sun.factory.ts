import { Definition } from '@core/store/store.model';
import { StoreService } from '@core/store/store.service';
import { FactoryObject3D } from '../../../models';
import { SunLensflareTextureLoader } from './sun-lensflare-texture.loader';
import { sunLensflareTextureParams } from './sun-lensflare-texture.params';
import {
  Sun,
  SunLensflare,
  SunLensflareElement,
  SunLensflareTexturesParams,
} from './sun.model';

export class SunFactory implements FactoryObject3D {
  private elements: SunLensflareTexturesParams[] = sunLensflareTextureParams;

  constructor(private store: StoreService) {}

  create(): Sun {
    const sun = this.createSun();
    sun.position.set(0, 0, 1000);

    const sunLensflare = this.createSunLensflare();
    sun.add(sunLensflare);

    return sun;
  }

  private createSun(): Sun {
    const sun = new Sun(0xffffff, 1.3);
    return sun;
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
