import { StoreService } from '@core/store/store.service';
import { Scene, WebGLRenderer } from 'three';
import { FactoryVRController } from '../../models';
import { VRController } from './vr-controller';
import { VRControllerType } from './vr-controller.model';

export class VRControllerFactory implements FactoryVRController {
  constructor(
    private store: StoreService,
    private scene: Scene,
    private renderer: WebGLRenderer
  ) {}

  createRight(): VRController {
    return new VRController(
      this.store,
      this.scene,
      this.renderer,
      VRControllerType.Right,
      0
    );
  }

  createLeft(): VRController {
    return new VRController(
      this.store,
      this.scene,
      this.renderer,
      VRControllerType.Left,
      1
    );
  }
}
