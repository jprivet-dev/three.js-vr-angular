import { WebGLRenderer } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { ContainerVRSessionCallbacks } from './container.model';

export class ContainerVRSession {
  private onStartCallback = () => {
  };
  private onEndCallback = () => {
  };

  constructor(private renderer: WebGLRenderer) {
  }

  createVRButton(): HTMLElement {
    // https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content
    this.renderer.xr.enabled = true; // enable XR rendering
    this.renderer.xr.setReferenceSpaceType('local');

    return VRButton.createButton(this.renderer);
  }

  connect(callbacks: ContainerVRSessionCallbacks): void {
    this.onStartCallback = callbacks.start;
    this.onEndCallback = callbacks.end;

    this.renderer.xr.addEventListener('sessionstart', this.onStartCallback);
    this.renderer.xr.addEventListener('sessionend', this.onEndCallback);
  }

  disconnect(): void {
    this.renderer.xr.removeEventListener('sessionstart', this.onStartCallback);
    this.renderer.xr.removeEventListener('sessionend', this.onEndCallback);
  }
}
