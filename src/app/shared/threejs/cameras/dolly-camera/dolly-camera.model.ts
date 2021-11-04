export interface cameraPosition {
  x: number;
  y: number;
  z: number;
}

export interface DollyCameraParams {
  fov: number;
  aspect?: number;
  near: number;
  far: number;
  onVRSessionStartPosition: {
    camera: cameraPosition;
    dolly: cameraPosition;
  };
  onVRSessionEndPosition: {
    camera: cameraPosition;
    dolly: cameraPosition;
  };
}
