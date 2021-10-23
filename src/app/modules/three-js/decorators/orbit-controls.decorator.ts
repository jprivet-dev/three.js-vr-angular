import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class OrbitControlsDecorator {
  constructor(private controls: OrbitControls) {
    controls.autoRotateSpeed = 0.2;
    this.enableAutoRotate();
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
