import { Camera, EventDispatcher, Quaternion, Vector3 } from 'three';

export class FlyFirstPersonControls extends EventDispatcher {
  movementSpeed: number;
  rollSpeed: number;
  dragToLook: boolean;
  autoForward: boolean;

  EPS = 0.000001;
  lastQuaternion = new Quaternion();
  lastPosition = new Vector3();

  tmpQuaternion: Quaternion;
  mouseStatus: number;
  moveState: any;
  moveVector: Vector3;
  rotationVector: Vector3;
  movementSpeedMultiplier!: number;

  constructor(private object: Camera, readonly domElement: HTMLElement) {
    super();

    // API

    this.movementSpeed = 1.0;
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

    window.addEventListener('keydown', (event) => this.keydown(event));
    window.addEventListener('keyup', (event) => this.keyup(event));

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
    if (!this.dragToLook || this.mouseStatus > 0) {
      const container = this.getContainerDimensions();
      const halfWidth = container.size[0] / 2;
      const halfHeight = container.size[1] / 2;

      this.moveState.yawLeft =
        -(event.pageX - container.offset[0] - halfWidth) / halfWidth;
      this.moveState.pitchDown =
        (event.pageY - container.offset[1] - halfHeight) / halfHeight;

      this.updateRotationVector();
    }
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

    this.object.translateX(this.moveVector.x * moveMult);
    this.object.translateY(this.moveVector.y * moveMult);
    this.object.translateZ(this.moveVector.z * moveMult);

    this.tmpQuaternion
      .set(
        this.rotationVector.x * rotMult,
        this.rotationVector.y * rotMult,
        this.rotationVector.z * rotMult,
        1
      )
      .normalize();
    this.object.quaternion.multiply(this.tmpQuaternion);

    if (
      this.lastPosition.distanceToSquared(this.object.position) > this.EPS ||
      8 * (1 - this.lastQuaternion.dot(this.object.quaternion)) > this.EPS
    ) {
      this.dispatchEvent({ type: 'change' });
      this.lastQuaternion.copy(this.object.quaternion);
      this.lastPosition.copy(this.object.position);
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
    this.domElement.removeEventListener('contextmenu', (event) =>
      event.preventDefault()
    );
    this.domElement.removeEventListener('mousedown', this.mousedown);
    this.domElement.removeEventListener('mousemove', this.mousemove);
    this.domElement.removeEventListener('mouseup', this.mouseup);

    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('keyup', this.keyup);
  }
}
