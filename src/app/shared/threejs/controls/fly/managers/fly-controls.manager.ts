import { Renderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DollyCamera } from '../../../cameras';
import { Loop } from '../../../models';
import {
  FlyDashboardControls,
  FlyMobileControls,
  FlyMousePointerLockControls,
  FlyVRControls,
} from '../controls';

export class FlyControlsManager implements Loop {
  orbit!: OrbitControls;
  pointer!: FlyMousePointerLockControls;
  dashboard!: FlyDashboardControls;
  mobile!: FlyMobileControls;
  vr!: FlyVRControls;

  constructor(private dolly: DollyCamera, private renderer: Renderer) {
    this.orbit = this.createOrbitControls();
  }

  update(delta: number) {
    this.orbit.update();
  }

  private createOrbitControls(): OrbitControls {
    return new OrbitControls(this.dolly.camera, this.renderer.domElement);
  }
}
