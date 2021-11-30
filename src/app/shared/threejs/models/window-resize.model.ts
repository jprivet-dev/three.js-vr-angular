import { Container } from '../../container';

export interface WindowResize {
  resize(container: Container): void;
}
