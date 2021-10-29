import { Definition } from '@shared/models/definition.model';
import { FactoryObject3D } from '@shared/models/factory.model';
import { SunLensflareTexturesParams } from '../models/texture.model';
import { SunLensflareTextureLoader } from '../threejs/loaders/sun-lensflare-texture.loader';
import { SunLensflare } from '../threejs/objects3d/sun-lensflare';
import { SunLensflareElement } from '../threejs/objects3d/sun-lensflare-element';

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

  create(): SunLensflare {
    const definition: Definition = 'sd';

    const sunLensflare = new SunLensflare();
    const loader = new SunLensflareTextureLoader();

    this.elements.map((element) => {
      sunLensflare.addElement(
        new SunLensflareElement(
          loader.getTexture(element.type, definition),
          element
        )
      );
    });

    return sunLensflare;
  }
}
