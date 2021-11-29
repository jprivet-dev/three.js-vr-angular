import { ElementRef } from '@angular/core';
import { WebGLRenderer } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { WebGLRendererParameters } from 'three/src/renderers/WebGLRenderer';
import { Loop, WindowResize } from '../models';

export class Container implements Loop, WindowResize {
  private list: WindowResize[] = [];

  readonly window: Window;
  readonly domElement!: HTMLElement;

  public renderer!: WebGLRenderer;
  public stats!: Stats;
  private lastParameters!: WebGLRendererParameters;

  constructor(window: Window, containerRef: ElementRef, private vrButton: boolean, private statsEnable: boolean) {
    this.window = window;
    const nativeElement: HTMLDivElement = containerRef?.nativeElement;

    if (!nativeElement) {
      throw new Error('containerRef.nativeElement is undefined.');
      return;
    }

    this.domElement = nativeElement;

    this.window.addEventListener('resize', () => {
      this.resize();
    });
  }

  // ----------
  // Dimensions
  // ----------

  width(): number {
    return this.domElement.clientWidth;
  }

  height(): number {
    return this.domElement.clientHeight;
  }

  ratio(): number {
    return this.width() / this.height();
  }

  // --------
  // Contents
  // --------

  empty(): void {
    this.domElement.innerHTML = '';
  }

  appendChild(child: HTMLElement): void {
    this.domElement.appendChild(child);
  }

  removeChild(child: HTMLElement): void {
    this.domElement.removeChild(child);
  }

  // --------------------
  // Pointer Lock Element
  // --------------------

  isPointerLockElement(): boolean {
    return this.domElement.ownerDocument.pointerLockElement === this.domElement;
  }

  lock(): void {
    this.domElement.requestPointerLock();
  }

  unlock(): void {
    this.domElement.ownerDocument.exitPointerLock();
  }

  // --------
  // Renderer
  // --------

  createRenderer(parameters: WebGLRendererParameters): void {
    /**
     * Renderer
     */

    if (this.renderer) {
      this.empty();
      this.renderer.setAnimationLoop(null);
    }

    this.renderer = new WebGLRenderer(parameters);
    this.renderer.setPixelRatio(this.window.devicePixelRatio);
    this.renderer.setSize(this.width(), this.height());

    this.appendChild(this.renderer.domElement);

    this.lastParameters = parameters;

    /**
     * VR button
     */

    if (this.vrButton) {
      this.createVRButton();
    }

    /**
     * Stats
     */

    if (this.statsEnable) {
      this.createStats();
    }
  }

  // ---------
  // VR Button
  // ---------

  private createVRButton(): void {
    // https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content
    const button = VRButton.createButton(this.renderer);
    this.renderer.xr.enabled = true; // enable XR rendering
    this.renderer.xr.setReferenceSpaceType('local');
    this.appendChild(button);
  }

  // -----
  // Stats
  // -----

  private createStats(): void {
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

  // ------
  // Resize
  // ------

  resizeAdd(element: WindowResize): void {
    if (this.list.includes(element)) {
      console.error('Element already exists:', element);
      return;
    }

    this.list.push(element);
  }

  resizeRemove(element: WindowResize): void {
    this.list.forEach((current, index) => {
      if (current === element) {
        this.list.splice(index, 1);
      }
    });
  }

  resize() {
    this.renderer.setSize(this.width(), this.height());
    this.list.map((element) => element.resize(this));
  }

  // ----
  // Loop
  // ----

  update() {
    this.stats.update();
  }
}
