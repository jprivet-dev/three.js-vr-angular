import { StoreService } from '@core/store/store.service';
import { DirectionalLight } from 'three';
import { Object3DDecorator } from './object-3d.decorator';

export class SunDecorator extends Object3DDecorator {
  constructor(private store: StoreService, private light: DirectionalLight) {
    super(light);
  }
}
