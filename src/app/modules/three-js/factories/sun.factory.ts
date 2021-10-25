import { TextureDef } from '@core/store/store.model';
import { StoreService } from '@core/store/store.service';
import { DirectionalLight, TextureLoader } from 'three';
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';
import { SunDecorator } from '../decorators';
import { SunTextures, TypedLensflare } from '../models/three-js.model';

// Here abstract is it a good idea ?
export abstract class SunFactory {
  private static textures: SunTextures = {
    sun: {
      sd: 'sun_512x512.jpg',
      hd: 'sun_1024x1024.jpg',
    },
    circle: {
      sd: 'lens_flare_circle_32x32.jpg',
      hd: 'lens_flare_circle_64x64.jpg',
    },
    hexagon: {
      sd: 'lens_flare_hexagon_128x128.jpg',
      hd: 'lens_flare_hexagon_256x256.jpg',
    },
  };

  static create(store: StoreService): SunDecorator {
    return new SunDecorator(store, this.newSun(store));
  }

  private static newSun(store: StoreService): DirectionalLight {
    const light = new DirectionalLight(0xffffff, 1.3);
    light.position.set(-250, 0, -1000);
    this.addLensFlare(store, light);

    return light;
  }

  private static addLensFlare(store: StoreService, light: DirectionalLight) {
    const loader = new TextureLoader().setPath('assets/textures/sun/');
    const lensflare = new Lensflare();
    let lensflareList: TypedLensflare[] = [];

    // Which is the best way to unsubscribe it ?
    store.textureDef$.subscribe((textureDef) => {
      if (!lensflareList.length) {
        lensflareList = this.createLensflare(loader, textureDef, lensflare, lensflareList);
        return;
      }
      lensflareList.map((currentLensflare) => {
        currentLensflare.element.texture = loader.load(
          this.textures[currentLensflare.type][textureDef]
        );
      });
    });

    light.add(lensflare);
  }

  private static createLensflare(
    loader: TextureLoader,
    textureDef: TextureDef,
    lensflare: Lensflare,
    lensflareList: TypedLensflare[]
  ): TypedLensflare[] {
    const sun = loader.load(this.textures.sun[textureDef]);
    const circle = loader.load(this.textures.circle[textureDef]);
    const hexagon = loader.load(this.textures.hexagon[textureDef]);

    lensflareList = [
      {
        type: 'sun',
        element: new LensflareElement(sun, 1000, 0),
      },
      {
        type: 'circle',
        element: new LensflareElement(circle, 20, 0.63),
      },
      {
        type: 'circle',
        element: new LensflareElement(circle, 40, 0.64),
      },
      {
        type: 'hexagon',
        element: new LensflareElement(hexagon, 70, 0.7),
      },
      {
        type: 'hexagon',
        element: new LensflareElement(hexagon, 110, 0.8),
      },
      {
        type: 'circle',
        element: new LensflareElement(circle, 60, 0.85),
      },
      {
        type: 'circle',
        element: new LensflareElement(circle, 30, 0.86),
      },
      {
        type: 'hexagon',
        element: new LensflareElement(hexagon, 120, 0.9),
      },
      {
        type: 'hexagon',
        element: new LensflareElement(hexagon, 260, 1),
      },
    ];

    lensflareList.map((currentLensflare) => {
      lensflare.addElement(currentLensflare.element);
    });

    return lensflareList;
  }
}
