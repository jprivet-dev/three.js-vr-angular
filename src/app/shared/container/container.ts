import { WebGLRenderer } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { WebGLRendererParameters } from 'three/src/renderers/WebGLRenderer';
import { Loop, WindowResize } from '../threejs/models';
import { VRSession } from '../threejs/xr';

export class Container implements Loop, WindowResize {
  private list: WindowResize[] = [];

  public renderer!: WebGLRenderer;
  public vrSession!: VRSession;
  public stats!: Stats;

  constructor(
    readonly window: Window,
    readonly domElement: HTMLElement,
    private vrButtonEnable: boolean
  ) {}

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
    if (this.renderer) {
      this.empty();
      this.renderer.setAnimationLoop(null);
    }

    this.renderer = new WebGLRenderer(parameters);
    this.renderer.setPixelRatio(this.window.devicePixelRatio);
    this.renderer.setSize(this.width(), this.height());
    this.appendChild(this.renderer.domElement);

    if (this.vrButtonEnable) {
      this.createVRButton();
    }

    this.createStats();
  }

  // ---------
  // VR Button
  // ---------

  private createVRButton(): void {
    this.vrSession = new VRSession(this.renderer);
    this.appendChild(this.vrSession.createVRButton());
  }

  // -----
  // Stats
  // -----

  private createStats(): void {
    this.stats = Stats();
    this.stats.dom.style.top = '';
    this.stats.dom.style.left = '';
    this.stats.dom.style.bottom = '0';
    this.stats.dom.style.right = '0';

    this.appendChild(this.stats.dom);
  }

  updateStats(stats: boolean): void {
    this.stats.dom.style.display = stats ? 'block' : 'none';
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
