import { Container } from '@shared/models/container.model';
import { Object3D, PerspectiveCamera } from 'three';
import { DollyCameraParams } from '../../models/earth.model';
import { VRSession } from '../../models/vr-session.model';
import { WindowResize } from '../../models/window-resize.model';

export class DollyCamera extends Object3D implements WindowResize, VRSession {
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

  onVRSessionStart() {
    this.camera.position.set(0, 0, 0);
    this.position.set(-2.5, 0, 0);
  }

  onVRSessionEnd() {
    this.camera.position.set(0, 0, 5);
    this.position.set(0, 0, 0);
  }
}
