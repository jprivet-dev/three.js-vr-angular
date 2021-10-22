import { WebGLRenderer } from 'three';
import { RendererDecorator } from '../decorators/renderer-decorator';

export class RendererBuilder {
  create(): RendererDecorator {
    const renderer: WebGLRenderer = new WebGLRenderer();
    return new RendererDecorator(renderer);
  }
}
