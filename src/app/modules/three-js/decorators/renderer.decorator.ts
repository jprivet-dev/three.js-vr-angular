import { WebGLRenderer, XRAnimationLoopCallback } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { Resize } from '../models';
import { CameraDecorator } from './camera.decorator';
import { ContainerDecorator } from './container.decorator';
import { SceneDecorator } from './scene.decorator';

export class RendererDecorator implements Resize {
  constructor(
    private container: ContainerDecorator,
    private scene: SceneDecorator,
    private camera: CameraDecorator,
    private renderer: WebGLRenderer
  ) {}

  start(): void {
    this.renderer.setPixelRatio(this.container.window().devicePixelRatio);
    this.resize();
    this.render();

    this.container.appendChild(this.renderer.domElement);
  }

  render(): void {
    this.renderer.render(this.scene.object3D(), this.camera.object3D());
  }

  resize(): void {
    this.renderer.setSize(this.container.width(), this.container.height());
  }

  setAnimationLoop(callback: XRAnimationLoopCallback): void {
    this.renderer.setAnimationLoop(callback);
  }

  domElement(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  /**
   * {@link https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content How to create VR content}
   */
  enableVRButton(): this {
    const button = VRButton.createButton(this.renderer);
    this.container.appendChild(button);
    this.renderer.xr.enabled = true; // enable XR rendering
    this.renderer.xr.setReferenceSpaceType('local');
    return this;
  }

  hasVRButton(): boolean {
    return this.renderer.xr.enabled;
  }
}
