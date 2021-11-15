import { FlyCommands } from '../models';
import { FlyMovements } from '../movements';

export class FlyDashboardCommands implements FlyCommands {
  enabled = true;

  constructor(private movements: FlyMovements) {
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

      case 'ArrowUp':
        this.movements.rotation.up.start();
        break;

      case 'ArrowDown':
        this.movements.rotation.down.start();
        break;

      case 'ArrowRight':
        this.movements.rotation.right.start();
        break;

      case 'ArrowLeft':
        this.movements.rotation.left.start();
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

      case 'ArrowUp':
        this.movements.rotation.up.stop();
        break;

      case 'ArrowDown':
        this.movements.rotation.down.stop();
        break;

      case 'ArrowRight':
        this.movements.rotation.right.stop();
        break;

      case 'ArrowLeft':
        this.movements.rotation.left.stop();
        break;
    }
  }
}
