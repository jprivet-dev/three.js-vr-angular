import { PerspectiveCamera } from 'three';
import { Resize } from '../models/resize';
import { ContainerDecorator } from './container-decorator';

export class CameraDecorator implements Resize {
  constructor(
    private containerDecorator: ContainerDecorator,
    private _camera: PerspectiveCamera
  ) {}

  get camera(): PerspectiveCamera {
    return this._camera;
  }

  resize() {
    this._camera.aspect = this.containerDecorator.ratio();
    this._camera.updateProjectionMatrix();
  }
}
