import { WebGLRenderer } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Container } from '../threejs/containers';

export interface ContainerEvent {
  container: Container;
  renderer: WebGLRenderer;
  stats: Stats;
}
