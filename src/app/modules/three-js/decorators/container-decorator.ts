export class ContainerDecorator {
  constructor(private container: Element) {}

  width(): number {
    return this.container.clientWidth;
  }

  height(): number {
    return this.container.clientHeight;
  }

  ratio(): number {
    return this.width() / this.height();
  }
}
