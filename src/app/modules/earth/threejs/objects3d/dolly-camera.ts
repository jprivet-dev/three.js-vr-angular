import { Container } from '@shared/models/container.model';
import { Object3D, PerspectiveCamera } from 'three';
import { DollyCameraParams } from '../../models/earth.model';
import { WindowResize } from '../../models/window-resize.model';

export class DollyCamera extends Object3D implements WindowResize {
  public camera: PerspectiveCamera;
  public dummyCam: Object3D;

  constructor(private container: Container, params: DollyCameraParams) {
    super();
    this.camera = new PerspectiveCamera(80, params.aspect, 1, 8000);
    this.camera.position.set(0, 0, 5);

    this.dummyCam = new Object3D();
    this.camera.add(this.dummyCam);

    this.position.set(0, 0, 0);
    this.add(this.camera);
  }

  resize() {
    this.camera.aspect = this.container.ratio();
    this.camera.updateProjectionMatrix();
  }
}
