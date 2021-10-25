import { StoreService } from '@core/store/store.service';
import { CubeTexture } from 'three';

export class SkyboxDecorator {
  constructor(private _cubeTexture: CubeTexture) {}

  get cubeTexture(): CubeTexture {
    return this._cubeTexture;
  }
}
