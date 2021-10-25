import { StoreService } from '@core/store/store.service';
import { Mesh } from 'three';
import { Animation } from '../models';
import { Decorator } from './decorator';

export class CubeDecorator extends Decorator implements Animation {
  constructor(private store: StoreService, private mesh: Mesh) {
    super(mesh);
  }

  animate(delta: number): void {
    const step = delta * 0.1;
    this.object().rotation.x += step;
    this.object().rotation.y += step;
  }
}
