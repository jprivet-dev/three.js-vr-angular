import { Container } from '@shared/models/container.model';
import { WebGLRenderer } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';

export class RendererVRButton extends WebGLRenderer {
  constructor(private container: Container) {
    super();

    this.setPixelRatio(this.container.window.devicePixelRatio);
    this.setSize(this.container.width(), this.container.height());
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
}
