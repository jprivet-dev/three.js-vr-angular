import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Container } from '../../../../container';
import { DollyCamera } from '../../../cameras';
import { Loop } from '../../../models';
import { FlyDashboardPointerLockControls } from '../controls';
import { FlyMobileControls } from '../mobile';
import { FlyVRControls } from '../vr';

export class FlyControlsManager implements Loop {
  // orbit: OrbitControls;
  pointer: FlyDashboardPointerLockControls;
  // mobile: FlyMobileControls;
  vr: FlyVRControls;

  constructor(private container: Container, private dolly: DollyCamera) {
    // this.orbit = this.createOrbitControls();
    this.pointer = this.createFlyPointerLockControls();
    // this.mobile = this.createFlyMobileControls();
    this.vr = this.createFlyVRControls();
  }

  update(delta: number): void {
    // this.orbit.update();
    this.pointer.update(delta);
  }

  private createOrbitControls(): OrbitControls {
    const controls = new OrbitControls(
      this.dolly.camera,
      this.container.domElement
    );
    controls.autoRotateSpeed = 0.2;
    controls.autoRotate = true;

    return controls;
  }

  private createFlyPointerLockControls(): FlyDashboardPointerLockControls {
    return new FlyDashboardPointerLockControls(
      this.container,
      this.dolly.camera
    );
  }

  private createFlyMobileControls(): FlyMobileControls {
    return new FlyMobileControls(this.dolly.camera);
  }

  private createFlyVRControls(): FlyVRControls {
    return new FlyVRControls(this.dolly);
  }
}
