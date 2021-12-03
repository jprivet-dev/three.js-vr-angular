import { EventDispatcher } from 'three';
import { Container } from '../../container';
import { Object3DMovements } from './movements';
import { Loop } from '../models';

/**
 * https://github.com/mrdoob/three.js/blob/dev/examples/jsm/controls/PointerLockControls.js
 * https://github.com/mrdoob/three.js/blob/dev/examples/jsm/controls/FlyControls.js
 */
export class PointerLockControls extends EventDispatcher implements Loop {
  private isLocked: boolean = false;

  private onLockCallback: () => void = () => {};
  private onUnlockCallback: () => void = () => {};

  constructor(
    private container: Container,
    private movements: Object3DMovements
  ) {
    super();
  }

  onLock(callback: () => void): void {
    this.onLockCallback = callback;
  }

  onUnlock(callback: () => void): void {
    this.onUnlockCallback = callback;
  }

  start(): void {
    this.connect();
    this.container.domElement.requestPointerLock();
  }

  stop(): void {
    this.disconnect();
    this.container.domElement.ownerDocument.exitPointerLock();
  }

  connect(): void {
    const dom = this.container.domElement;

    // Context Menu
    dom.addEventListener('contextmenu', this.contextmenu.bind(this));

    // Mouse
    dom.addEventListener('mousemove', this.mousemove.bind(this));
    dom.addEventListener('mousedown', this.mousedown.bind(this));
    dom.addEventListener('mouseup', this.mouseup.bind(this));

    // Pointer Lock
    dom.ownerDocument.addEventListener(
      'pointerlockchange',
      this.pointerlockchange.bind(this)
    );
    dom.ownerDocument.addEventListener(
      'pointerlockerror',
      this.pointerlockerror.bind(this)
    );
  }

  disconnect(): void {
    const dom = this.container.domElement;

    // Context Menu
    dom.removeEventListener('contextmenu', this.contextmenu.bind(this));

    // Mouse
    dom.removeEventListener('mousemove', this.mousemove.bind(this));
    dom.removeEventListener('mousedown', this.mousedown.bind(this));
    dom.removeEventListener('mouseup', this.mouseup.bind(this));

    // Pointer Lock
    dom.ownerDocument.removeEventListener(
      'pointerlockchange',
      this.pointerlockchange.bind(this)
    );
    dom.ownerDocument.removeEventListener(
      'pointerlockerror',
      this.pointerlockerror.bind(this)
    );
  }

  dispose(): void {
    this.disconnect();
  }

  update(delta: number): void {
    this.movements.update(delta);
  }

  private contextmenu(event: any): void {
    if (this.isLocked === false) return;
    event.preventDefault();
  }

  private mousemove(event: any): void {
    if (this.isLocked === false) return;
    this.movements.onMouseMove(event);
  }

  private mousedown(event: any): void {
    if (this.isLocked === false) return;
    switch (event.button) {
      case 0:
        this.movements.move.forward.start();
        break;
      case 2:
        this.movements.move.backward.start();
        break;
    }
  }

  private mouseup(event: any): void {
    if (this.isLocked === false) return;
    switch (event.button) {
      case 0:
        this.movements.move.forward.stop();
        break;
      case 2:
        this.movements.move.backward.stop();
        break;
    }
  }

  private pointerlockchange(event: any): void {
    const dom = this.container.domElement;
    if (dom.ownerDocument.pointerLockElement === dom) {
      this.isLocked = true;
      this.onLockCallback();
      return;
    }

    this.isLocked = false;
    this.onUnlockCallback();
  }

  private pointerlockerror(event: any): void {
    console.error('PointerLockControls | Unable to use Pointer Lock API', event);
  }
}
