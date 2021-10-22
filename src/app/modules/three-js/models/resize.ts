import { ContainerDecorator } from '../decorators/container-decorator';

export interface Resize {
  resize(containerDecorator: ContainerDecorator): void;
}
