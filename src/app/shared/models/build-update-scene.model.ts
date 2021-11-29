import { RendererEvent } from '../container/container.model';

export interface BuildUpdateScene {
  buildScene(event: RendererEvent): void;

  updateRenderer(event: RendererEvent): void;

  unsubscribe(): void;
}
