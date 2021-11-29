import { ElementRef } from '@angular/core';
import { WebGLRenderer } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { WebGLRendererParameters } from 'three/src/renderers/WebGLRenderer';

export class Container {
  readonly window: Window;
  readonly domElement!: HTMLElement;
  public renderer!: WebGLRenderer;
  public stats!: Stats;

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

  appendChild(child: HTMLElement): void {
    this.domElement.appendChild(child);
  }

  removeChild(child: HTMLElement): void {
    this.domElement.removeChild(child);
  }

  empty(): void {
    this.domElement.innerHTML = '';
  }

  isPointerLockElement(): boolean {
    return this.domElement.ownerDocument.pointerLockElement === this.domElement;
  }

  lock(): void {
    this.domElement.requestPointerLock();
  }

  unlock(): void {
    this.domElement.ownerDocument.exitPointerLock();
  }

  createRenderer(parameters: WebGLRendererParameters): void {
    this.renderer = new WebGLRenderer(parameters);
    this.renderer.setPixelRatio(this.window.devicePixelRatio);
    this.renderer.setSize(this.width(), this.height());

    this.empty();
    this.appendChild(this.renderer.domElement);
  }

  createVRButton(): void {
    if (this.renderer === undefined) {
      console.error('Create renderer element before.');
      return;
    }

    // https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content
    const button = VRButton.createButton(this.renderer);
    this.renderer.xr.enabled = true; // enable XR rendering
    this.renderer.xr.setReferenceSpaceType('local');
    this.appendChild(button);
  }

  createStats(): void {
    if (this.renderer === undefined) {
      console.error('Create renderer element before.');
      return;
    }

    this.stats = Stats();
    this.stats.dom.style.top = '';
    this.stats.dom.style.left = '';
    this.stats.dom.style.bottom = '0';
    this.stats.dom.style.right = '0';

    this.appendChild(this.stats.dom);
  }
}
