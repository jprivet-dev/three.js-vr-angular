import { StoreService } from '@core/store/store.service';
import { Mesh } from 'three';
import { Animation } from '../models';
import { Object3DDecorator } from './object-3d.decorator';

export class EarthDecorator extends Object3DDecorator implements Animation {
  private rotationsYPerSecond = 0.01;

  constructor(private store: StoreService, private mesh: Mesh) {
    super(mesh);
  }

  animate(delta: number): void {
    this.object3D().rotation.y +=
      delta * 2 * Math.PI * this.rotationsYPerSecond;
  }
}
