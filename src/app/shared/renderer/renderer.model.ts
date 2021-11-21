import { Container } from '../threejs/containers';
import { Renderer } from '../threejs/renderers';

export interface RendererInitEvent {
  container: Container;
  renderer: Renderer;
}
