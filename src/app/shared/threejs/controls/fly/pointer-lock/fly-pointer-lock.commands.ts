import { Camera } from 'three';

export class FlyPointerLockCommands {
  movementSpeed: number = 1.0;
  rollSpeed: number = 0.005;

  constructor(private camera: Camera, readonly domElement: HTMLElement) {}
}
