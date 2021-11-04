import { Definition } from '@core/store/store.model';
import { StoreService } from '@core/store/store.service';
import { FactoryObject3D } from '../../../models';
import { SunLensflare } from './sun-lensflare';
import { SunLensflareElement } from './sun-lensflare-element';
import { SunLensflareTextureLoader } from './sun-lensflare-texture.loader';
import { SunLensflareTexturesParams } from './sun-lensflare.model';

export class SunLensflareFactory implements FactoryObject3D {
  private elements: SunLensflareTexturesParams[] = [
    {
      type: 'sun',
      size: 1000,
      distance: 0,
    },
    {
      type: 'circle',
      size: 20,
      distance: 0.63,
    },
    {
      type: 'circle',
      size: 40,
      distance: 0.64,
    },
    {
      type: 'hexagon',
      size: 70,
      distance: 0.7,
    },
    {
      type: 'hexagon',
      size: 110,
      distance: 0.8,
    },
    {
      type: 'circle',
      size: 60,
      distance: 0.85,
    },
    {
      type: 'circle',
      size: 30,
      distance: 0.86,
    },
    {
      type: 'hexagon',
      size: 120,
      distance: 0.9,
    },
    {
      type: 'hexagon',
      size: 260,
      distance: 1,
    },
  ];

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
