import { StoreService } from '@core/store/store.service';
import { VRRenderer } from '../index';
import { VRSession } from './vr-session.model';

export class VRSessionManager implements VRSession {
  private list: VRSession[] = [];

  constructor(private store: StoreService, private renderer: VRRenderer) {}

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
      this.store.vrSessionStart();
    });
    this.renderer.xr.addEventListener('sessionend', () => {
      this.onVRSessionEnd();
      this.store.vrSessionEnd();
    });
  }
}
