import { WebGLRenderer, XRAnimationLoopCallback } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { Resize } from '../models/resize';
import { CameraDecorator } from './camera-decorator';
import { ContainerDecorator } from './container-decorator';
import { SceneDecorator } from './scene-decorator';

export class RendererDecorator implements Resize {
  constructor(private webGLRenderer: WebGLRenderer) {}

  start(
    container: ContainerDecorator,
    scene: SceneDecorator,
    camera: CameraDecorator
  ): void {
    this.resize(container);
    this.render(scene, camera);
    container.appendChild(this.webGLRenderer.domElement);
  }

  render(scene: SceneDecorator, camera: CameraDecorator): void {
    this.webGLRenderer.render(scene.object3D, camera.object3D);
  }

  resize(container: ContainerDecorator): void {
    this.webGLRenderer.setSize(container.width(), container.height());
  }

  setAnimationLoop(callback: XRAnimationLoopCallback): void {
    this.webGLRenderer.setAnimationLoop(callback);
  }

  /**
   * {@link https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content How to create VR content}
   */
  insertVRButton(container: ContainerDecorator): this {
    const button = VRButton.createButton(this.webGLRenderer);
    container.appendChild(button);
    this.webGLRenderer.xr.enabled = true; // enable XR rendering
    return this;
  }

  hasVRButton(): boolean {
    return this.webGLRenderer.xr.enabled;
  }
}
