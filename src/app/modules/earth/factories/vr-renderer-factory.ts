import { Container } from '@shared/models/container.model';
import { FactoryVRRenderer } from '@shared/models/factory.model';
import { Scene } from 'three';
import { DollyCamera, VRRenderer } from '../threejs';

export class VRRendererFactory implements FactoryVRRenderer {
  constructor(private container: Container) {}

  create(scene: Scene, dolly: DollyCamera): VRRenderer {
    const renderer = new VRRenderer(
      this.container,
      scene,
      dolly.camera
    );

    renderer.createVRButton();
    this.container.appendChild(renderer.domElement);

    return renderer;
  }
}
