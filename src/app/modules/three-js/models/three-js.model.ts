import { ContainerDecorator } from '../decorators';

export interface Animation {
  animate(delta: number): void;
}

export interface Resize {
  resize(containerDecorator: ContainerDecorator): void;
}
