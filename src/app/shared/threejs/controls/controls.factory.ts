import { DollyCamera } from '../cameras';
import { LoopManager } from '../managers';
import { FactoryControls } from '../models';
import { VRRenderer } from '../renderers';
import { Controls } from './controls';

export class ControlsFactory implements FactoryControls {
  constructor(private loop: LoopManager) {}

  create(dolly: DollyCamera, renderer: VRRenderer): Controls {
    const controls = new Controls(dolly, renderer);
    controls.enableAutoRotate();
    this.loop.add(controls);

    return controls;
  }
}
