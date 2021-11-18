import { WebGLRenderer } from 'three';
import { Container } from '../containers';
import { WindowResize } from '../models';

export class Renderer extends WebGLRenderer implements WindowResize {
  resize(container: Container) {
    this.setSize(container.width(), container.height());
  }
}
