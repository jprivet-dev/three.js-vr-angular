import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Loop } from '../../models/loop.model';
import { DollyCamera } from '../objects3d';
import { RendererVR } from '../renderers';

export class Controls extends OrbitControls implements Loop {
  constructor(private dolly: DollyCamera, private renderer: RendererVR) {
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
