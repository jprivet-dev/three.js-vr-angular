import { Container, DollyCamera, VRRenderer, WindowResize } from '../index';

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
    this.list.forEach((element) => element.resize());
  }

  start(): void {
    const onWindowResize = () => {
      this.resize();
    };

    this.container.window.addEventListener('resize', onWindowResize);
  }
}
