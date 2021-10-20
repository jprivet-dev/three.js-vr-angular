import * as THREE from 'three';
import { Camera } from './camera';
import { Scene } from './scene';

export class Renderer extends THREE.WebGLRenderer {
  constructor(
    private window: Window,
    private container: Element,
    private scene: Scene,
    private camera: Camera
  ) {
    super();
    this.init();
  }

  private init(): void {
    this.container.appendChild(this.domElement);
    this.updateSize();
    this.window.addEventListener('resize', this.onWindowResize);
  }

  render(): void {
    super.render(this.scene, this.camera);
  }

  onWindowResize(): void {
    this.camera.aspect = this.ratio();
    this.camera.updateProjectionMatrix();
    this.updateSize();
  }

  ratio(): number {
    return this.container.clientWidth / this.container.clientHeight;
  }

  updateSize(): void {
    this.setSize(this.container.clientWidth, this.container.clientHeight);
  }
}
