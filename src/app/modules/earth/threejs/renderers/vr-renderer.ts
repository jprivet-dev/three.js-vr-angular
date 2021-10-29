import { Container } from '@shared/models/container.model';
import { Camera, Scene, WebGLRenderer } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { WebGLRendererParameters } from 'three/src/renderers/WebGLRenderer';
import { WindowResize } from '../../models/window-resize.model';

export class VRRenderer extends WebGLRenderer implements WindowResize {
  constructor(
    private container: Container,
    private scene: Scene,
    private camera: Camera,
    parameters?: WebGLRendererParameters
  ) {
    super(parameters);

    this.setPixelRatio(this.container.window.devicePixelRatio);
    this.resize();
  }

  /**
   * https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content
   */
  createVRButton(): this {
    const button = VRButton.createButton(this);
    this.xr.enabled = true; // enable XR rendering
    this.xr.setReferenceSpaceType('local');
    this.container.appendChild(button);

    return this;
  }

  getScene(): Scene {
    return this.scene;
  }

  getCamera(): Camera {
    return this.camera;
  }

  resize() {
    this.setSize(this.container.width(), this.container.height());
  }
}
