import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DollyCamera, Loop, LoopCallback, VRRenderer } from '../index';

export class Controls extends OrbitControls implements Loop {
  protected loopCallback!: LoopCallback;

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

  setLoopCallback(callback: LoopCallback): void {
    this.loopCallback = callback;
  }

  hasLoopCallback(): boolean {
    return this.loopCallback !== undefined;
  }

  loop(delta: number): void {
    this.loopCallback(delta);
  }
}
