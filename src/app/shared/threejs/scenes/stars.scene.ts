import { Definition } from '@core/store/store.model';
import { StoreService } from '@core/store/store.service';
import { CubeTexture, CubeTextureLoader, Scene } from 'three';
import { HasScene } from '../models';

export class StarsScene implements HasScene {
  private dimensions = {
    sd: '512x512',
    hd: '1024x1024',
  };

  scene: Scene = new Scene();
  loader: CubeTextureLoader = new CubeTextureLoader();

  constructor(private store: StoreService) {
    this.loader.setPath('assets/threejs/textures/space/stars/');

    this.store.definition$.subscribe((definition) => {
      this.scene.background = this.getTextureByDefinition(definition);
    });
  }

  getTextureByDefinition(definition: Definition): CubeTexture {
    const list = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'];

    const filenameList = list.map((position) => {
      const dimension = this.dimensions[definition];
      return `stars_${position}_${dimension}.jpg`;
    });

    return this.loader.load(filenameList);
  }
}
