import { Object3D, PerspectiveCamera } from 'three';
import { Container } from '../../container';
import { VRSession, WindowResize } from '../models';
import { cameraPosition, DollyCameraParams } from './dolly-camera.model';

export class DollyCamera extends Object3D implements VRSession, WindowResize {
  public camera: PerspectiveCamera;
  public dummy: Object3D;

  constructor(private params: DollyCameraParams) {
    super();

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

  resize(container: Container) {
    this.camera.aspect = container.ratio();
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
    this.camera.rotation.set(0, 0, 0);
  }

  private setPosition(camera: cameraPosition, dolly: cameraPosition) {
    this.camera.position.set(camera.x, camera.y, camera.z);
    this.position.set(dolly.x, dolly.y, dolly.z);
  }
}
