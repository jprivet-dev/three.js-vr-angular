import { PerspectiveCamera } from 'three';
import { Resize } from '../models/resize';
import { ContainerDecorator } from './container-decorator';

export class CameraDecorator implements Resize {
  constructor(
    private _camera: PerspectiveCamera
  ) {}

  get camera(): PerspectiveCamera {
    return this._camera;
  }

  resize(container: ContainerDecorator) {
    this._camera.aspect = container.ratio();
    this._camera.updateProjectionMatrix();
  }
}
