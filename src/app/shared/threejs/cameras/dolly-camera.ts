import { Object3D, PerspectiveCamera } from 'three';
import { Container } from '../containers';
import { VRSession, WindowResize } from '../models';
import { cameraPosition, DollyCameraParams } from './dolly-camera.model';

export class DollyCamera extends Object3D implements WindowResize, VRSession {
  public camera: PerspectiveCamera;
  public dummy: Object3D;

  constructor(private container: Container, private params: DollyCameraParams) {
    super();

    this.params.aspect = this.container.ratio();

    this.camera = new PerspectiveCamera(
      params.fov,
      params.aspect,
      params.near,
      params.far
    );

    this.dummy = new Object3D();
    this.camera.add(this.dummy);

    this.onSessionEnd();
    this.add(this.camera);
  }

  resize() {
    this.camera.aspect = this.container.ratio();
    this.camera.updateProjectionMatrix();
  }

  onSessionStart() {
    this.setPosition(
      this.params.onVRSessionStartPosition.camera,
      this.params.onVRSessionStartPosition.dolly
    );
  }

  onSessionEnd() {
    this.setPosition(
      this.params.onVRSessionEndPosition.camera,
      this.params.onVRSessionEndPosition.dolly
    );
    this.camera.rotation.set(0,0,0);
  }

  private setPosition(camera: cameraPosition, dolly: cameraPosition) {
    this.camera.position.set(camera.x, camera.y, camera.z);
    this.position.set(dolly.x, dolly.y, dolly.z);
  }
}
