import { StoreService } from '@core/store/store.service';
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { CubeDecorator } from '../decorators';

export abstract class CubeBuilder {
  static create(store: StoreService): CubeDecorator {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);

    return new CubeDecorator(store, cube);
  }
}
