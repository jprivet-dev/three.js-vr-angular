import { Container } from '@shared/models/container.model';
import { FactoryRendererVR } from '@shared/models/factory.model';
import { Scene } from 'three';
import { DollyCamera, RendererVR } from '../threejs';

export class RendererVRFactory implements FactoryRendererVR {
  constructor(private container: Container) {}

  create(scene: Scene, dolly: DollyCamera): RendererVR {
    const renderer = new RendererVR(
      this.container,
      scene,
      dolly.camera
    );

    renderer.createVRButton();
    this.container.appendChild(renderer.domElement);

    return renderer;
  }
}
