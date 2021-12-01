import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Camera } from 'three/src/Three';
import { Loop } from '../models';
import { FlyPointerLockControls } from './fly-pointer-lock-controls';

export class SwitchControls implements Loop {
  orbit: OrbitControls;
  pointer: FlyPointerLockControls;

  constructor(private camera: Camera, private domElement: HTMLElement) {
    this.orbit = this.createOrbitControls();
    this.pointer = this.createFlyPointerLockControls();

    this.pointer.addEventListener('lock', () => {
      this.orbit.enabled = false;
    });

    this.pointer.addEventListener('unlock', () => {
      this.orbit.enabled = true;
    });
  }

  update(delta: number) {
    if (this.pointer.isLocked) {
      this.updatePointer(delta);
      return;
    }
    this.updateOrbit();
  }

  private updateOrbit() {
    this.orbit.update();
  }

  private updatePointer(delta: number) {
    this.pointer.update(delta);
  }

  private createOrbitControls(): OrbitControls {
    const controls = new OrbitControls(this.camera, this.domElement);
    controls.autoRotateSpeed = 0.2;
    controls.autoRotate = true;

    return controls;
  }

  private createFlyPointerLockControls(): FlyPointerLockControls {
    const controls = new FlyPointerLockControls(this.camera, this.domElement);
    controls.movementSpeed = 10;
    controls.rollSpeed = Math.PI / 4;
    controls.autoForward = false;
    controls.dragToLook = false;
    return controls;
  }
}
