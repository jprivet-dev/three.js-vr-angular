import { ElementRef } from '@angular/core';

export class ContainerDecorator {
  private _window: Window;
  private container!: Element;

  constructor(window: Window, containerRef: ElementRef) {
    this._window = window;
    const containerNativeElement: HTMLDivElement = containerRef?.nativeElement;

    if (containerNativeElement) {
      this.container = containerNativeElement;
      return;
    }

    console.error('containerRef.nativeElement is undefined.');
  }

  window(): Window {
    return this._window;
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
