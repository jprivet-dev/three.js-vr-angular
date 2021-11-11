import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface HasLoop {
  setLoop(loop: Loop): void;

  getLoop(): Loop;
}

export interface LoopControls extends Loop {
  start(): void;

  stop(): void;
}


export interface Loop {
  update(delta: number): void;
}

export type LoopWithUpdate = Loop | OrbitControls;
