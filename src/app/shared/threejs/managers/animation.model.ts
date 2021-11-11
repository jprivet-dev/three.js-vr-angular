export interface HasAnimation {
  setAnimation(animation: Animation): void;

  getAnimation(): Animation;
}

export interface Animation {
  start(): void;

  stop(): void;

  animate(delta: number): void;
}
