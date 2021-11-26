import { WebGLRenderer } from 'three';
import { Container } from '../threejs/containers';

export interface RendererEvent {
  container: Container;
  renderer: WebGLRenderer;
}
