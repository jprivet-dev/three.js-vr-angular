import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { WebGLRendererParameters } from 'three/src/renderers/WebGLRenderer';
import { Container } from '../containers';
import { Renderer } from '../renderers';

export class VRRendererBuilder {
  constructor(private container: Container) {
  }

  build(parameters?: WebGLRendererParameters): Renderer {
    const renderer = new Renderer(parameters);

    renderer.setPixelRatio(this.container.window.devicePixelRatio);
    renderer.resize(this.container);

    this.container.empty();
    this.container.appendChild(renderer.domElement);

    // https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content
    const button = VRButton.createButton(renderer);
    renderer.xr.enabled = true; // enable XR rendering
    renderer.xr.setReferenceSpaceType('local');
    this.container.appendChild(button);

    return renderer;
  }
}
