import { WebGLRenderer } from 'three';
import { RendererDecorator } from '../decorators/renderer-decorator';

export class RendererBuilder {
  private decorator!: RendererDecorator;

  create(): RendererDecorator {
    const renderer: WebGLRenderer = new WebGLRenderer();
    this.decorator = new RendererDecorator(renderer);
    return this.decorator;
  }
}
