import { ElementRef } from '@angular/core';

export class Container {
  readonly window: Window;
  private container!: Element;

  constructor(window: Window, containerRef: ElementRef) {
    this.window = window;
    const containerNativeElement: HTMLDivElement = containerRef?.nativeElement;

    if (containerNativeElement) {
      this.container = containerNativeElement;
      return;
    }

    throw new Error('containerRef.nativeElement is undefined.');
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

  appendChild(child: HTMLElement) {
    this.container.appendChild(child);
  }
}
