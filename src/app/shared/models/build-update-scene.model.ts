import { RendererEvent } from '../renderer/renderer.model';

export interface BuildUpdateScene {
  buildScene(event: RendererEvent): void;

  updateRenderer(event: RendererEvent): void;

  unsubscribe(): void;
}
