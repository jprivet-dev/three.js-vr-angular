import { StoreService } from '@core/store/store.service';
import { DirectionalLight } from 'three';
import { Decorator } from './decorator';

export class SunDecorator extends Decorator {
  constructor(private store: StoreService, private light: DirectionalLight) {
    super(light);
  }
}
