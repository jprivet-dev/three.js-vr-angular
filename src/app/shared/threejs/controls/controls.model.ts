import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DollyCamera } from '../cameras';
import { Animation } from '../managers';
import { VRRenderer } from '../renderers';

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
