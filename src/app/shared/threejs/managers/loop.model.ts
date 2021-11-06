export type LoopCallback = (delta: number) => void;

export interface Loop {
  setLoopCallback(callback: LoopCallback): void;

  hasLoopCallback(): boolean;

  loop(delta: number): void;
}
