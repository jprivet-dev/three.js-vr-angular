import { StoreService } from '@core/store/store.service';
import { Scene } from 'three';
import { FactoryVRController } from '../../models';
import { VRRenderer } from '../../renderers';
import { VRController, VRControllerType } from './vr-controller.model';

export class VRControllerFactory implements FactoryVRController{
  constructor(
    private store: StoreService,
    private scene: Scene,
    private renderer: VRRenderer
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
