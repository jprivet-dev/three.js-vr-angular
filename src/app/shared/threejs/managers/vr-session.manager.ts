import { VRRenderer } from '../index';
import { VRSession } from '@modules/earth/models/vr-session.model';

export class VRSessionManager implements VRSession {
  private list: VRSession[] = [];

  constructor(private renderer: VRRenderer) {}

  add(element: VRSession): void {
    this.list.push(element);
  }

  onVRSessionStart(): void {
    this.list.forEach((element) => element.onVRSessionStart());
  }

  onVRSessionEnd(): void {
    this.list.forEach((element) => element.onVRSessionEnd());
  }

  start(): void {
    this.renderer.xr.addEventListener('sessionstart', () => {
      this.onVRSessionStart();
    });
    this.renderer.xr.addEventListener('sessionend', () => {
      this.onVRSessionEnd();
    });
  }
}
