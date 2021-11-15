import { Renderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DollyCamera } from '../../../cameras';
import { Loop } from '../../../models';
import { FlyDashboardControls } from '../dashboard';
import { FlyMobileControls } from '../mobile';
import { FlyPointerLockControls } from '../pointer-lock';
import { FlyVRControls } from '../vr';

export class FlyControlsManager implements Loop {
  // orbit: OrbitControls;
  // pointer: FlyPointerLockControls;
  dashboard: FlyDashboardControls;
  // mobile: FlyMobileControls;
  // vr: FlyVRControls;

  constructor(private dolly: DollyCamera, private renderer: Renderer) {
    // this.orbit = this.createOrbitControls();
    // this.pointer = this.createFlyMousePointerLockControls();
    this.dashboard = this.createFlyDashboardControls();
    // this.mobile = this.createFlyMobileControls();
    // this.vr = this.createFlyVRControls();
  }

  update(delta: number) {
    // this.orbit.update();
    this.dashboard.movements.update(delta);
  }

  private createOrbitControls(): OrbitControls {
    const controls = new OrbitControls(
      this.dolly.camera,
      this.renderer.domElement
    );
    controls.autoRotateSpeed = 0.2;
    controls.autoRotate = true;

    return controls;
  }

  private createFlyMousePointerLockControls(): FlyPointerLockControls {
    return new FlyPointerLockControls(this.dolly.camera);
  }

  private createFlyDashboardControls(): FlyDashboardControls {
    return new FlyDashboardControls(this.dolly.camera);
  }

  private createFlyMobileControls(): FlyMobileControls {
    return new FlyMobileControls(this.dolly.camera);
  }

  private createFlyVRControls(): FlyVRControls {
    return new FlyVRControls(this.dolly);
  }
}
