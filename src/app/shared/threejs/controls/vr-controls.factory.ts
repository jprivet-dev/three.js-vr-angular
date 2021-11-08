import { Scene } from 'three';
import { DollyCamera } from '../cameras';
import { LoopManager } from '../managers';
import { FactoryVRControls } from '../models';
import { VRRenderer } from '../renderers';
import { VRControls } from './vr-controls';

export class VRControlsFactory implements FactoryVRControls {
  constructor(private loop: LoopManager) {}

  create(dolly: DollyCamera, renderer: VRRenderer, scene: Scene): VRControls {
    const vrControls = new VRControls(dolly, renderer, scene);
    vrControls.createAllControllers();
    return vrControls;
  }
}
