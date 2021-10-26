import { Object3D, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class OrbitControlsDecorator {
  constructor(private controls: OrbitControls) {
    controls.autoRotateSpeed = 0.2;
  }

  enableAutoRotate() {
    this.controls.autoRotate = true;
  }

  disableAutoRotate() {
    this.controls.autoRotate = false;
  }

  update(): void {
    this.controls.update();
  }
}
