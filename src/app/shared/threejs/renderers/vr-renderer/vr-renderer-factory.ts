import { Scene } from 'three';
import { WebGLRendererParameters } from 'three/src/renderers/WebGLRenderer';
import { DollyCamera } from '../../cameras';
import { Container, FactoryVRRenderer } from '../../models';
import { VRRenderer } from './vr-renderer';

export class VRRendererFactory implements FactoryVRRenderer {
  constructor(private container: Container) {}

  create(
    scene: Scene,
    dolly: DollyCamera,
    parameters?: WebGLRendererParameters
  ): VRRenderer {
    const renderer = new VRRenderer(
      this.container,
      scene,
      dolly.camera,
      parameters
    );

    renderer.createVRButton();
    this.container.appendChild(renderer.domElement);

    console.log('renderer', renderer);

    return renderer;
  }
}
