import { DollyCamera } from '../cameras';
import { Container } from '../containers';
import { VRRenderer } from '../renderers';
import { WindowResize } from '../models';

export class WindowResizeManager implements WindowResize {
  private list: WindowResize[] = [];

  constructor(
    private container: Container,
    dollyCamera: DollyCamera,
    renderer: VRRenderer
  ) {
    this.add(dollyCamera);
    this.add(renderer);
  }

  add(element: WindowResize): void {
    this.list.push(element);
  }

  resize(): void {
    this.list.map((element) => element.resize());
  }

  start(): void {
    this.container.window.addEventListener('resize', () => {
      this.resize();
    });
  }
}
