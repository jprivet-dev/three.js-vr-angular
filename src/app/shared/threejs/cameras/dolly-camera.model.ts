export interface DollyCameraPositionRotation {
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
}

export interface DollyCameraParams {
  fov: number;
  aspect?: number;
  near: number;
  far: number;
  vrSession: {
    onStart: {
      camera: DollyCameraPositionRotation;
      dolly: DollyCameraPositionRotation;
    };
    onEnd: {
      camera: DollyCameraPositionRotation;
      dolly: DollyCameraPositionRotation;
    };
  };
}
