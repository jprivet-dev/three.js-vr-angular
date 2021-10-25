import { StoreService } from '@core/store/store.service';
import { Mesh } from 'three';
import { Animation } from '../models';
import { Decorator } from './decorator';

export class EarthDecorator extends Decorator implements Animation {
  private rotationsYPerSecond = 0.01;

  constructor(private store: StoreService, private mesh: Mesh) {
    super(mesh);
  }

  animate(delta: number): void {
    this.object().rotation.y +=
      delta * 2 * Math.PI * this.rotationsYPerSecond;
  }
}
