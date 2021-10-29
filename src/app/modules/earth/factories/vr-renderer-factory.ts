import { Container } from '@shared/models/container.model';
import { FactoryVRRenderer } from '@shared/models/factory.model';
import { Scene } from 'three';
import { WebGLRendererParameters } from 'three/src/renderers/WebGLRenderer';
import { DollyCamera, VRRenderer } from '../threejs';

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
