import { Object3D, PerspectiveCamera } from 'three';
import { Container } from '../../container';
import { VRSession, WindowResize } from '../models';
import { DollyCameraPositionRotation, DollyCameraParams } from './dolly-camera.model';

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
    this.setPositionRotation(
      this.params.vrSession.onStart.camera,
      this.params.vrSession.onStart.dolly
    );
  }

  onSessionEnd() {
    this.setPositionRotation(
      this.params.vrSession.onEnd.camera,
      this.params.vrSession.onEnd.dolly
    );
  }

  private setPositionRotation(camera: DollyCameraPositionRotation, dolly: DollyCameraPositionRotation) {
    this.camera.position.set(camera.position.x, camera.position.y, camera.position.z);
    this.camera.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
    this.position.set(dolly.position.x, dolly.position.y, dolly.position.z);
    this.rotation.set(dolly.rotation.x, dolly.rotation.y, dolly.rotation.z);
  }
}
