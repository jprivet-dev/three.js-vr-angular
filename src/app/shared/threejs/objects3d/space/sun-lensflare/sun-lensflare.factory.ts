import { Definition } from '@core/store/store.model';
import { StoreService } from '@core/store/store.service';
import { FactoryObject3D } from '../../../models';
import { SunLensflare } from './sun-lensflare';
import { SunLensflareElement } from './sun-lensflare-element';
import { SunLensflareTextureLoader } from './sun-lensflare-texture.loader';
import { sunLensflareTextureParams } from './sun-lensflare-texture.params';
import { SunLensflareTexturesParams } from './sun-lensflare.model';

export class SunLensflareFactory implements FactoryObject3D {
  private elements: SunLensflareTexturesParams[] = sunLensflareTextureParams;

  constructor(private store: StoreService) {}

  create(): SunLensflare {
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
