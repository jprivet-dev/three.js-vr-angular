export interface Loop {
  loop(delta: number): void;
}

export type LoopCallback = (delta: number) => void;
