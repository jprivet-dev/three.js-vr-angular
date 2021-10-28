import { Container } from '@shared/models/container.model';
import { WindowResize } from '../models/window-resize.model';
import { DollyCamera, RendererVR } from '../threejs';

export class WindowResizeManager implements WindowResize {
  private list: WindowResize[] = [];

  constructor(
    private container: Container,
    dollyCamera: DollyCamera,
    renderer: RendererVR
  ) {
    this.add(dollyCamera);
    this.add(renderer);
  }

  add(element: WindowResize): void {
    this.list.push(element);
  }

  resize(): void {
    this.list.forEach((element) => element.resize());
  }

  start(): void {
    const onWindowResize = () => {
      this.resize();
    };

    this.container.window.addEventListener('resize', onWindowResize);
  }
}
