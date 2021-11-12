import { Camera, Euler, EventDispatcher, Quaternion, Vector3 } from 'three';

export class FlyPointerLockControls extends EventDispatcher {
  changeEvent = { type: 'change' };
  lockEvent = { type: 'lock' };
  unlockEvent = { type: 'unlock' };
  isLocked: boolean = false;

  movementSpeed: number;
  rollSpeed: number;
  dragToLook: boolean;
  autoForward: boolean;

  EPS = 0.000001;
  lastQuaternion = new Quaternion();
  lastPosition = new Vector3();
  euler = new Euler(0, 0, 0, 'YXZ');

  tmpQuaternion: Quaternion;
  mouseStatus: number;
  moveState: any;
  moveVector: Vector3;
  rotationVector: Vector3;
  movementSpeedMultiplier!: number;

  constructor(private camera: Camera, readonly domElement: HTMLElement) {
    super();

    // API

    this.movementSpeed = 0.5;
    this.rollSpeed = 0.005;

    this.dragToLook = false;
    this.autoForward = false;

    this.tmpQuaternion = new Quaternion();
    this.mouseStatus = 0;
    this.moveState = {
      up: 0,
      down: 0,
      left: 0,
      right: 0,
      forward: 0,
      back: 0,
      pitchUp: 0,
      pitchDown: 0,
      yawLeft: 0,
      yawRight: 0,
      rollLeft: 0,
      rollRight: 0,
    };

    this.moveVector = new Vector3(0, 0, 0);
    this.rotationVector = new Vector3(0, 0, 0);

    this.connect();
    this.updateMovementVector();
    this.updateRotationVector();
  }

  keydown(event: any) {
    if (event.altKey) {
      return;
    }

    switch (event.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        this.movementSpeedMultiplier = 0.1;
        break;

      case 'KeyW':
        this.moveState.forward = 1;
        break;
      case 'KeyS':
        this.moveState.back = 1;
        break;

      case 'KeyA':
        this.moveState.left = 1;
        break;
      case 'KeyD':
        this.moveState.right = 1;
        break;

      case 'KeyR':
        this.moveState.up = 1;
        break;
      case 'KeyF':
        this.moveState.down = 1;
        break;

      case 'ArrowUp':
        this.moveState.pitchUp = 1;
        break;
      case 'ArrowDown':
        this.moveState.pitchDown = 1;
        break;

      case 'ArrowLeft':
        this.moveState.yawLeft = 1;
        break;
      case 'ArrowRight':
        this.moveState.yawRight = 1;
        break;

      case 'KeyQ':
        this.moveState.rollLeft = 1;
        break;
      case 'KeyE':
        this.moveState.rollRight = 1;
        break;
    }

    this.updateMovementVector();
    this.updateRotationVector();
  }

  keyup(event: any) {
    switch (event.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        this.movementSpeedMultiplier = 1;
        break;

      case 'KeyW':
        this.moveState.forward = 0;
        break;
      case 'KeyS':
        this.moveState.back = 0;
        break;

      case 'KeyA':
        this.moveState.left = 0;
        break;
      case 'KeyD':
        this.moveState.right = 0;
        break;

      case 'KeyR':
        this.moveState.up = 0;
        break;
      case 'KeyF':
        this.moveState.down = 0;
        break;

      case 'ArrowUp':
        this.moveState.pitchUp = 0;
        break;
      case 'ArrowDown':
        this.moveState.pitchDown = 0;
        break;

      case 'ArrowLeft':
        this.moveState.yawLeft = 0;
        break;
      case 'ArrowRight':
        this.moveState.yawRight = 0;
        break;

      case 'KeyQ':
        this.moveState.rollLeft = 0;
        break;
      case 'KeyE':
        this.moveState.rollRight = 0;
        break;
    }

    this.updateMovementVector();
    this.updateRotationVector();
  }

  mousedown(event: any) {
    if (this.dragToLook) {
      this.mouseStatus++;
    } else {
      switch (event.button) {
        case 0:
          this.moveState.forward = 1;
          break;
        case 2:
          this.moveState.back = 1;
          break;
      }

      this.updateMovementVector();
    }
  }

  mousemove(event: any) {
    if (this.isLocked === false) return;

    const movementX =
      event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY =
      event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    this.euler.setFromQuaternion(this.camera.quaternion);

    this.euler.y -= movementX * 0.0002;
    this.euler.x -= movementY * 0.0002;

    this.camera.quaternion.setFromEuler(this.euler);

    // this.moveState.yawLeft += movementX * 0.01;
    // this.moveState.pitchDown += movementY * 0.01;

    this.updateRotationVector();
  }

  mouseup(event: any) {
    if (this.dragToLook) {
      this.mouseStatus--;

      this.moveState.yawLeft = this.moveState.pitchDown = 0;
    } else {
      switch (event.button) {
        case 0:
          this.moveState.forward = 0;
          break;
        case 2:
          this.moveState.back = 0;
          break;
      }

      this.updateMovementVector();
    }

    this.updateRotationVector();
  }

  update(delta: number) {
    const moveMult = delta * this.movementSpeed;
    const rotMult = delta * this.rollSpeed;

    this.camera.translateX(this.moveVector.x * moveMult);
    this.camera.translateY(this.moveVector.y * moveMult);
    this.camera.translateZ(this.moveVector.z * moveMult);

    this.tmpQuaternion
      .set(
        this.rotationVector.x * rotMult,
        this.rotationVector.y * rotMult,
        this.rotationVector.z * rotMult,
        1
      )
      .normalize();
    this.camera.quaternion.multiply(this.tmpQuaternion);

    if (
      this.lastPosition.distanceToSquared(this.camera.position) > this.EPS ||
      8 * (1 - this.lastQuaternion.dot(this.camera.quaternion)) > this.EPS
    ) {
      this.dispatchEvent(this.changeEvent);
      this.lastQuaternion.copy(this.camera.quaternion);
      this.lastPosition.copy(this.camera.position);
    }
  }

  updateMovementVector() {
    const forward =
      this.moveState.forward || (this.autoForward && !this.moveState.back)
        ? 1
        : 0;

    this.moveVector.x = -this.moveState.left + this.moveState.right;
    this.moveVector.y = -this.moveState.down + this.moveState.up;
    this.moveVector.z = -forward + this.moveState.back;

    //console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );
  }

  updateRotationVector() {
    this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp;
    this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft;
    this.rotationVector.z = -this.moveState.rollRight + this.moveState.rollLeft;

    //console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );
  }

  getContainerDimensions() {
    return {
      size: [this.domElement.offsetWidth, this.domElement.offsetHeight],
      offset: [this.domElement.offsetLeft, this.domElement.offsetTop],
    };
  }

  dispose() {
    this.disconnect();
  }

  connect() {
    this.domElement.addEventListener('contextmenu', (event) =>
      event.preventDefault()
    );

    this.domElement.addEventListener('mousemove', (event) =>
      this.mousemove(event)
    );
    this.domElement.addEventListener('mousedown', (event) =>
      this.mousedown(event)
    );
    this.domElement.addEventListener('mouseup', (event) => this.mouseup(event));

    this.domElement.ownerDocument.addEventListener(
      'pointerlockchange',
      (event) => this.onPointerlockChange()
    );
    this.domElement.ownerDocument.addEventListener(
      'pointerlockerror',
      (event) => this.onPointerlockError()
    );

    window.addEventListener('keydown', (event) => this.keydown(event));
    window.addEventListener('keyup', (event) => this.keyup(event));
  }

  disconnect() {
    this.domElement.removeEventListener('contextmenu', (event) =>
      event.preventDefault()
    );

    this.domElement.removeEventListener('mousemove', (event) =>
      this.mousedown(event)
    );
    this.domElement.removeEventListener('mousedown', (event) =>
      this.mousedown(event)
    );
    this.domElement.removeEventListener('mouseup', (event) =>
      this.mouseup(event)
    );

    this.domElement.ownerDocument.removeEventListener(
      'pointerlockchange',
      (event) => this.onPointerlockChange()
    );
    this.domElement.ownerDocument.removeEventListener(
      'pointerlockerror',
      (event) => this.onPointerlockError()
    );

    window.removeEventListener('keydown', (event) => this.keydown(event));
    window.removeEventListener('keyup', (event) => this.keyup(event));
  }

  onPointerlockChange() {
    if (this.domElement.ownerDocument.pointerLockElement === this.domElement) {
      this.dispatchEvent(this.lockEvent);
      this.isLocked = true;
    } else {
      this.dispatchEvent(this.unlockEvent);
      this.isLocked = false;
    }
  }

  onPointerlockError() {
    console.error('FlyFirstPersonControls: Unable to use Pointer Lock API');
  }

  lock() {
    this.domElement.requestPointerLock();
  }

  unlock() {
    this.domElement.ownerDocument.exitPointerLock();
  }
}
