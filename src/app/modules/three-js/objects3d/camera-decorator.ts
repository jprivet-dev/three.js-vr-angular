import { PerspectiveCamera } from 'three';

export class CameraDecorator {
  constructor(private container: Element, private _camera: PerspectiveCamera) {}

  get camera(): PerspectiveCamera {
    return this._camera;
  }
}
