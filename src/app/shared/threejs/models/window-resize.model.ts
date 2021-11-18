import { Container } from '../containers';

export interface WindowResize {
  resize(container: Container): void;
}
