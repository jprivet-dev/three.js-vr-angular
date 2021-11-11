import { DollyCamera } from '../cameras';
import { FactoryControls } from '../models';
import { VRRenderer } from '../renderers';
import { Controls } from './controls.model';

export class ControlsFactory implements FactoryControls {
  constructor() {}

  create(dolly: DollyCamera, renderer: VRRenderer): Controls {
    const controls = new Controls(dolly, renderer);
    controls.start();

    return controls;
  }
}
