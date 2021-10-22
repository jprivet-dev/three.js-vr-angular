import { ElementRef } from '@angular/core';

export class ContainerDecorator {
  private container!: Element;

  constructor(containerRef: ElementRef) {
    const containerNativeElement: HTMLDivElement = containerRef?.nativeElement;

    if (containerNativeElement) {
      this.container = containerNativeElement;
      return;
    }

    console.error('containerRef.nativeElement is undefined.');
  }

  width(): number {
    return this.container.clientWidth;
  }

  height(): number {
    return this.container.clientHeight;
  }

  ratio(): number {
    return this.width() / this.height();
  }

  appendChild(canvas: HTMLCanvasElement) {
    this.container.appendChild(canvas);
  }
}
