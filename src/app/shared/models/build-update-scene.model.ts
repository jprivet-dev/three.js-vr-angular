import { Container } from '../container';

export interface BuildUpdateScene {
  buildScene(container: Container): void;

  unsubscribe(): void;
}
