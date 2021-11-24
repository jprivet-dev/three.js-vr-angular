import { Container } from '../threejs/containers';
import { Renderer } from '../threejs/renderers';

export interface RendererEvent {
  container: Container;
  renderer: Renderer;
}
