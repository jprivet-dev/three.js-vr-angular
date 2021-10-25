import { TextureDef } from '@core/store/store.model';
import { StoreService } from '@core/store/store.service';
import { TextureLoader } from 'three';
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';
import { LensfareDecorator } from '../decorators';
import { LensflareParams, LensflareTyped, SunTexturesParams } from '../models';

// Here is it a good idea ?
export class LensfareFactory {
  private LensflareParams: LensflareParams[] = [
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

  private textures: SunTexturesParams = {
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

  private loader = new TextureLoader().setPath('assets/textures/sun/');

  constructor(private store: StoreService) {}

  create(): LensfareDecorator {
    return new LensfareDecorator(this.newLensfare());
  }

  private newLensfare(): Lensflare {
    const lensflare = new Lensflare();
    let lensflareList: LensflareTyped[] = [];

    // Which is the best way to unsubscribe it ?
    this.store.textureDef$.subscribe((textureDef) => {
      this.onChangeTextureDef(lensflareList, textureDef, lensflare);
    });

    return lensflare;
  }

  private createLensflare(
    textureDef: TextureDef,
    lensflare: Lensflare,
    lensflareList: LensflareTyped[]
  ): LensflareTyped[] {
    const loaders = {
      sun: this.loader.load(this.textures.sun[textureDef]),
      circle: this.loader.load(this.textures.circle[textureDef]),
      hexagon: this.loader.load(this.textures.hexagon[textureDef]),
    };

    this.LensflareParams.map((params) => {
      lensflareList.push({
        type: params.type,
        element: new LensflareElement(
          loaders[params.type],
          params.size,
          params.distance
        ),
      });
    });

    lensflareList.map((currentLensflare) => {
      lensflare.addElement(currentLensflare.element);
    });

    return lensflareList;
  }

  onChangeTextureDef(
    lensflareList: LensflareTyped[],
    textureDef: TextureDef,
    lensflare: Lensflare
  ) {
    if (!lensflareList.length) {
      lensflareList = this.createLensflare(
        textureDef,
        lensflare,
        lensflareList
      );
      return;
    }

    lensflareList.map((currentLensflare) => {
      currentLensflare.element.texture = this.loader.load(
        this.textures[currentLensflare.type][textureDef]
      );
    });
  }
}
