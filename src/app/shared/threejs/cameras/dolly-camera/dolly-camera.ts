import { Object3D, PerspectiveCamera } from 'three';
import { VRSession, WindowResize } from '../../managers';
import { Container } from '../../models';
import { cameraPosition, DollyCameraParams } from './dolly-camera.model';

export class DollyCamera extends Object3D implements WindowResize, VRSession {
  public camera: PerspectiveCamera;
  public dummyCam: Object3D;

  constructor(private container: Container, private params: DollyCameraParams) {
    super();
    this.camera = new PerspectiveCamera(
      params.fov,
      params.aspect,
      params.near,
      params.far
    );

    this.dummyCam = new Object3D();
    this.camera.add(this.dummyCam);

    this.onVRSessionEnd();
    this.add(this.camera);
  }

  resize() {
    this.camera.aspect = this.container.ratio();
    this.camera.updateProjectionMatrix();
  }

  onVRSessionStart() {
    this.setPosition(
      this.params.onVRSessionStartPosition.camera,
      this.params.onVRSessionStartPosition.dolly
    );
  }

  onVRSessionEnd() {
    this.setPosition(
      this.params.onVRSessionEndPosition.camera,
      this.params.onVRSessionEndPosition.dolly
    );
  }

  private setPosition(camera: cameraPosition, dolly: cameraPosition) {
    this.camera.position.set(camera.x, camera.y, camera.z);
    this.position.set(dolly.x, dolly.y, dolly.z);
  }
}
