import { EventDispatcher } from 'three';
import { Container } from '../../container';
import { Console } from '../../utils';
import { CameraMovements } from '../cameras/movements';
import { Loop } from '../models';

/**
 * https://github.com/mrdoob/three.js/blob/dev/examples/jsm/controls/PointerLockControls.js
 * https://github.com/mrdoob/three.js/blob/dev/examples/jsm/controls/FlyControls.js
 */
export class DashboardPointerLockControls
  extends EventDispatcher
  implements Loop
{
  private isLocked: boolean = false;

  private onLockCallback: () => void = () => {};
  private onUnlockCallback: () => void = () => {};

  private console: Console;

  constructor(
    private container: Container,
    private movements: CameraMovements
  ) {
    super();
    this.console = new Console('DashboardPointerLockControls');
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

    // Key
    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));

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

    // Key
    document.removeEventListener('keydown', this.keydown.bind(this));
    document.removeEventListener('keyup', this.keyup.bind(this));

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

  private keydown(event: any): void {
    if (this.isLocked === false) return;

    if (event.altKey) {
      return;
    }

    switch (event.code) {
      case 'KeyW':
        this.movements.move.forward.start();
        break;

      case 'KeyS':
        this.movements.move.backward.start();
        break;

      case 'KeyD':
        this.movements.move.right.start();
        break;

      case 'KeyA':
        this.movements.move.left.start();
        break;

      case 'KeyR':
        this.movements.move.up.start();
        break;

      case 'KeyF':
        this.movements.move.down.start();
        break;

      case 'ArrowUp':
        this.movements.rotation.pitch.up.start();
        break;

      case 'ArrowDown':
        this.movements.rotation.pitch.down.start();
        break;

      case 'ArrowRight':
        this.movements.rotation.yaw.right.start();
        break;

      case 'ArrowLeft':
        this.movements.rotation.yaw.left.start();
        break;

      case 'KeyE':
        this.movements.rotation.roll.right.start();
        break;

      case 'KeyQ':
        this.movements.rotation.roll.left.start();
        break;
    }
  }

  private keyup(event: any): void {
    if (this.isLocked === false) return;

    switch (event.code) {
      case 'KeyW':
        this.movements.move.forward.stop();
        break;

      case 'KeyS':
        this.movements.move.backward.stop();
        break;

      case 'KeyD':
        this.movements.move.right.stop();
        break;

      case 'KeyA':
        this.movements.move.left.stop();
        break;

      case 'KeyR':
        this.movements.move.up.stop();
        break;

      case 'KeyF':
        this.movements.move.down.stop();
        break;

      case 'ArrowUp':
        this.movements.rotation.pitch.up.stop();
        break;

      case 'ArrowDown':
        this.movements.rotation.pitch.down.stop();
        break;

      case 'ArrowRight':
        this.movements.rotation.yaw.right.stop();
        break;

      case 'ArrowLeft':
        this.movements.rotation.yaw.left.stop();
        break;

      case 'KeyE':
        this.movements.rotation.roll.right.stop();
        break;

      case 'KeyQ':
        this.movements.rotation.roll.left.stop();
        break;
    }
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
    this.console.error('Unable to use Pointer Lock API', event);
  }
}
