import { Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { Camera } from 'three/src/Three';
import { Loop } from '../models';

export class SwitchControls implements Loop {
  private velocity = new Vector3();
  private direction = new Vector3();

  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;

  orbit: OrbitControls;
  pointer: PointerLockControls;

  constructor(private camera: Camera, private domElement: HTMLElement) {
    this.orbit = this.createOrbitControls();
    this.pointer = this.createPointerLockControls();

    this.pointer.addEventListener('lock', () => {
      this.orbit.enabled = false;
    });

    this.pointer.addEventListener('unlock', () => {
      this.orbit.enabled = true;
    });

    this.initMovements();
  }

  update(delta: number) {
    if (this.pointer.isLocked) {
      this.updatePointer(delta);
      return;
    }
    this.updateOrbit();
  }

  private updateOrbit() {
    this.orbit.update();
  }

  private updatePointer(delta: number) {
    this.velocity.x -= this.velocity.x * 10 * delta;
    this.velocity.z -= this.velocity.z * 10 * delta;

    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    this.direction.normalize(); // this ensures consistent movements in all directions

    if (this.moveForward || this.moveBackward) {
      this.velocity.z -= this.direction.z * 100 * delta;
    }

    if (this.moveLeft || this.moveRight) {
      this.velocity.x -= this.direction.x * 100 * delta;
    }

    this.pointer.moveRight( - this.velocity.x * delta );
    this.pointer.moveForward( - this.velocity.z * delta );
  }

  private createOrbitControls(): OrbitControls {
    const controls = new OrbitControls(this.camera, this.domElement);
    controls.autoRotateSpeed = 0.2;
    controls.autoRotate = true;

    return controls;
  }

  private createPointerLockControls(): PointerLockControls {
    return new PointerLockControls(this.camera, this.domElement);
  }

  private initMovements() {
    const onKeyDown = (event: any) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = true;
          break;

        case 'ArrowLeft':
        case 'KeyA':
          this.moveLeft = true;
          break;

        case 'ArrowDown':
        case 'KeyS':
          this.moveBackward = true;
          break;

        case 'ArrowRight':
        case 'KeyD':
          this.moveRight = true;
          break;
      }
    };

    const onKeyUp = (event: any) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = false;
          break;

        case 'ArrowLeft':
        case 'KeyA':
          this.moveLeft = false;
          break;

        case 'ArrowDown':
        case 'KeyS':
          this.moveBackward = false;
          break;

        case 'ArrowRight':
        case 'KeyD':
          this.moveRight = false;
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  }
}
