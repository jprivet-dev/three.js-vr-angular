import { Camera } from 'three';
import { FlyCameraControls, FlyControls } from '../models';
import { FlyCameraMovements } from '../movements';

export class FlyDashboardControls
  extends FlyCameraControls
  implements FlyControls
{
  movements: FlyCameraMovements;
  enabled = true;

  constructor(camera: Camera) {
    super(camera);
    this.movements = new FlyCameraMovements(camera);
    this.connect();
  }

  connect(): void {
    window.addEventListener('keydown', this.keydown.bind(this));
    window.addEventListener('keyup', this.keyup.bind(this));
  }

  disconnect(): void {
    window.removeEventListener('keydown', this.keydown.bind(this));
    window.removeEventListener('keyup', this.keyup.bind(this));
  }

  dispose() {
    this.disconnect();
  }

  keydown(event: any): void {
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

  keyup(event: any): void {
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
