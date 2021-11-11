export interface HasAnimation {
  setAnimation(animation: Animation): void;

  getAnimation(): Animation;
}

export interface AnimationControls extends Animation {
  start(): void;

  stop(): void;
}


export interface Animation {
  animate(delta: number): void;
}
