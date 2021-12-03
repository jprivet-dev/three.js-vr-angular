import { EventDispatcher } from 'three';
import { Container } from '../../container';
import { Console } from '../../utils';
import { Object3DMovements } from './movements';
import { Loop } from '../models';

/**
 * https://github.com/mrdoob/three.js/blob/dev/examples/jsm/controls/PointerLockControls.js
 * https://github.com/mrdoob/three.js/blob/dev/examples/jsm/controls/FlyControls.js
 */
export class DashboardControls
  extends EventDispatcher
  implements Loop
{
  private active: boolean = false;

  constructor(
    private container: Container,
    private movements: Object3DMovements
  ) {
    super();
  }

  start(): void {
    this.connect();
    this.active = true;
  }

  stop(): void {
    this.disconnect();
    this.active = false;
  }

  connect(): void {
    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));
  }

  disconnect(): void {
    document.removeEventListener('keydown', this.keydown.bind(this));
    document.removeEventListener('keyup', this.keyup.bind(this));
  }

  dispose(): void {
    this.disconnect();
  }

  update(delta: number): void {
    this.movements.update(delta);
  }

  private keydown(event: any): void {
    if (this.active === false) return;

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
    if (this.active === false) return;

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
}
