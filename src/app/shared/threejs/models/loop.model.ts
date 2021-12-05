import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface LoopControls extends Loop {
  start(): void;
  stop(): void;
 }

export interface LoopControlsBis extends Loop {
  isLoopEnabled(): boolean;
  enableLoop(): void;
  disableLoop(): void;
}

export interface Loop {
  update(delta: number): void;
}

export abstract class LoopWithControls {
  isLoopEnabled: boolean = true;

  get isLoopDisabled(): boolean {
    return !this.isLoopEnabled;
  }

  enableLoop() {
    this.isLoopEnabled = true;
  }

  disableLoop() {
    this.isLoopEnabled = false;
  }

  switchLoop() {
    this.isLoopEnabled = !this.isLoopEnabled;
  }
}

export type LoopWithUpdate =
  | Loop
  | OrbitControls
  | FlyControls
  | FirstPersonControls;
