import { Container } from '../threejs/containers';

export interface BuildUpdateScene {
  buildScene(container: Container): void;

  unsubscribe(): void;
}
