import { Object3D } from 'three';

export type LoopCallback = (delta: number) => void;

export interface Loop {
  setLoopCallback(callback: LoopCallback): void;

  hasLoopCallback(): boolean;

  loop(delta: number): void;
}

export type Object3DWithLoop = Object3D & Loop;
