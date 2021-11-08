export type LoopCallback = (delta: number) => void;

export interface LoopWithCallback extends Loop {
  setLoopCallback(callback: LoopCallback): void;
}

export interface Loop {
  loop(delta: number): void;
}
