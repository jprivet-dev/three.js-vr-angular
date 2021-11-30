import { Container } from '../../container';
import { WindowResize } from '../models';

export class WindowResizeManager implements WindowResize {
  private list: WindowResize[] = [];

  constructor(private container: Container) {
    this.container.window.addEventListener('resize', () => {
      this.resize();
    });
  }

  add(element: WindowResize): void {
    if (this.list.includes(element)) {
      console.error('Element already exists:', element);
      return;
    }

    this.list.push(element);
  }

  remove(element: WindowResize): void {
    this.list.forEach((current, index) => {
      if (current === element) {
        this.list.splice(index, 1);
      }
    });
  }

  resize(): void {
    this.list.map((element) => element.resize(this.container));
  }
}
