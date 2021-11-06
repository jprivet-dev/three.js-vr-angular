import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DollyCamera, VRRenderer } from '../index';
import { Loop } from '../managers/loop.model';

export class Controls extends OrbitControls {
  constructor(private dolly: DollyCamera, private renderer: VRRenderer) {
    super(dolly.camera, renderer.domElement);
    this.autoRotateSpeed = 0.2;
  }

  enableAutoRotate(): void {
    this.autoRotate = true;
  }

  disableAutoRotate(): void {
    this.autoRotate = false;
  }

  loop(): void {
    this.update();
  }
}
