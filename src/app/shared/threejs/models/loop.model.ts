import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface LoopControls extends Loop {
  start(): void;

  stop(): void;
}

export interface Loop {
  update(delta: number): void;
}

export type LoopWithUpdate = Loop | OrbitControls | FlyControls | FirstPersonControls;
