import { StoreService } from '@core/store/store.service';
import { Scene } from 'three';
import { DollyCamera } from '../cameras';
import { LoopManager } from '../managers';
import { FactoryVRControls } from '../models';
import { VRRenderer } from '../renderers';
import { VRControls } from './vr-controls';

export class VRControlsFactory implements FactoryVRControls {
  constructor(private store: StoreService, private loop: LoopManager) {
  }

  create(dolly: DollyCamera, renderer: VRRenderer, scene: Scene): VRControls {
    const vrControls = new VRControls(this.store, dolly, renderer, scene);
    vrControls.createAllControllers();
    return vrControls;
  }
}
