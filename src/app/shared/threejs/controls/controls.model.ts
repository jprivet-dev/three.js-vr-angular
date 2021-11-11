import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Animation, DollyCamera, VRRenderer } from '../index';

export class Controls extends OrbitControls implements Animation {
  constructor(private dolly: DollyCamera, private renderer: VRRenderer) {
    super(dolly.camera, renderer.domElement);
    this.autoRotateSpeed = 0.2;
  }

  start(): void {
    this.autoRotate = true;
  }

  stop(): void {
    this.autoRotate = false;
  }

  animate() {
    this.update();
  }
}
