import { BehaviorSubject } from 'rxjs';
import { Camera, EventDispatcher } from 'three';
import { Container } from '../../../containers';
import { Loop } from '../../../models';
import { FlyControls } from '../models';
import { FlyCameraMovements } from '../movements';

export class FlyDashboardPointerLockControls
  extends EventDispatcher
  implements FlyControls, Loop
{
  private _isLocked = new BehaviorSubject<boolean>(false);
  readonly isLocked$ = this._isLocked.asObservable();

  private movements: FlyCameraMovements;

  enabled: boolean = false;

  constructor(private container: Container, private camera: Camera) {
    super();
    this.movements = new FlyCameraMovements(camera);
    this.connect();
  }

  enable(): void {
    console.log('enable');
    this.enabled = true;
    this.container.lock();
  }

  disable(): void {
    console.log('disable');
    this.enabled = false;
    this.container.unlock();
  }

  connect(): void {
    const d = this.container.domElement;

    d.addEventListener('keydown', this.keydown.bind(this));
    d.addEventListener('keyup', this.keyup.bind(this));

    d.addEventListener('contextmenu', this.contextmenu.bind(this));
    d.addEventListener('mousemove', this.mousemove.bind(this));
    d.addEventListener('mousedown', this.mousedown.bind(this));
    d.addEventListener('mouseup', this.mouseup.bind(this));

    d.ownerDocument.addEventListener(
      'pointerlockchange',
      this.pointerlockchange.bind(this)
    );

    d.ownerDocument.addEventListener(
      'pointerlockerror',
      this.pointerlockerror.bind(this)
    );
  }

  disconnect(): void {
    const d = this.container.domElement;

    d.removeEventListener('keydown', this.keydown.bind(this));
    d.removeEventListener('keyup', this.keyup.bind(this));

    d.removeEventListener('contextmenu', this.contextmenu.bind(this));
    d.removeEventListener('mousemove', this.mousemove.bind(this));
    d.removeEventListener('mousedown', this.mousedown.bind(this));
    d.removeEventListener('mouseup', this.mouseup.bind(this));

    d.ownerDocument.removeEventListener(
      'pointerlockchange',
      this.pointerlockchange.bind(this)
    );

    d.ownerDocument.removeEventListener(
      'pointerlockerror',
      this.pointerlockerror.bind(this)
    );
  }

  dispose() {
    this.disconnect();
  }

  update(delta: number) {
    if (this.enabled) {
      this.movements.update(delta);
    }
  }

  private keydown(event: any): void {
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
        this.container.isPointerLockElement();
        this.movements.rotation.roll.left.stop();
        break;
    }
  }

  private contextmenu(event: any): void {}

  private mousemove(event: any): void {}

  private mousedown(event: any): void {}

  private mouseup(event: any): void {}

  private pointerlockchange(event: any): void {
    console.log('pointerlockchange');
    if (this.container.isPointerLockElement()) {
      this._isLocked.next(true);
      return;
    }

    this._isLocked.next(false);
  }

  private pointerlockerror(event: any): void {
    console.error(
      'FlyDashboardPointerLockControls: Unable to use Pointer Lock API'
    );
  }
}
