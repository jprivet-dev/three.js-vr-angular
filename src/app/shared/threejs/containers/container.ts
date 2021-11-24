import { ElementRef } from '@angular/core';

export class Container {
  readonly window: Window;
  readonly domElement!: HTMLElement;

  constructor(window: Window, containerRef: ElementRef) {
    this.window = window;
    const nativeElement: HTMLDivElement = containerRef?.nativeElement;

    if (nativeElement) {
      this.domElement = nativeElement;
      return;
    }

    throw new Error('containerRef.nativeElement is undefined.');
  }

  width(): number {
    return this.domElement.clientWidth;
  }

  height(): number {
    return this.domElement.clientHeight;
  }

  ratio(): number {
    return this.width() / this.height();
  }

  appendChild(child: HTMLElement) {
    this.domElement.appendChild(child);
  }

  removeChild(child: HTMLElement) {
    this.domElement.removeChild(child);
  }

  empty() {
    this.domElement.innerHTML = '';
  }

  isPointerLockElement(): boolean {
    return this.domElement.ownerDocument.pointerLockElement === this.domElement;
  }

  lock() {
    this.domElement.requestPointerLock();
  }

  unlock() {
    this.domElement.ownerDocument.exitPointerLock();
  }
}
