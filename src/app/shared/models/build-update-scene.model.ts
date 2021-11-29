import { ContainerEvent } from '../container/container.model';

export interface BuildUpdateScene {
  buildScene(event: ContainerEvent): void;

  updateContainer(event: ContainerEvent): void;

  unsubscribe(): void;
}
