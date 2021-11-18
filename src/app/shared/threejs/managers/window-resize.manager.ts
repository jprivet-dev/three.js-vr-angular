import { Container } from '../containers';
import { WindowResize } from '../models';

export class WindowResizeManager implements WindowResize {
  private list: WindowResize[] = [];

  constructor(private container: Container) {
    this.container.window.addEventListener('resize', () => {
      this.resize();
    });
  }

  add(element: WindowResize): void {
    this.list.push(element);
  }

  resize(): void {
    this.list.map((element) => element.resize(this.container));
  }
}
