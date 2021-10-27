import { Container } from '@shared/models/container.model';
import { FactoryRenderer } from '@shared/models/factory.model';
import { RendererVRButton } from '../threejs';

export class RendererFactory implements FactoryRenderer {
  constructor(private container: Container) {}

  create(): RendererVRButton {
    const renderer = new RendererVRButton(this.container).createVRButton();
    this.container.appendChild(renderer.domElement);

    return renderer;
  }
}
