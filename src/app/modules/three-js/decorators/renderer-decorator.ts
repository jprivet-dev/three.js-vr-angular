import { WebGLRenderer, XRAnimationLoopCallback } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { Resize } from '../models/three-js.model';
import { CameraDecorator } from './camera-decorator';
import { ContainerDecorator } from './container-decorator';
import { SceneDecorator } from './scene-decorator';

export class RendererDecorator implements Resize {
  constructor(private renderer: WebGLRenderer) {}

  start(
    window: Window,
    container: ContainerDecorator,
    scene: SceneDecorator,
    camera: CameraDecorator
  ): void {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.resize(container);
    this.render(scene, camera);

    container.appendChild(this.renderer.domElement);
  }

  render(scene: SceneDecorator, camera: CameraDecorator): void {
    this.renderer.render(scene.object3D, camera.object3D);
  }

  resize(container: ContainerDecorator): void {
    this.renderer.setSize(container.width(), container.height());
  }

  setAnimationLoop(callback: XRAnimationLoopCallback): void {
    this.renderer.setAnimationLoop(callback);
  }

  /**
   * {@link https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content How to create VR content}
   */
  insertVRButton(container: ContainerDecorator): this {
    const button = VRButton.createButton(this.renderer);
    container.appendChild(button);
    this.renderer.xr.enabled = true; // enable XR rendering
    return this;
  }

  hasVRButton(): boolean {
    return this.renderer.xr.enabled;
  }
}
