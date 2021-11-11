import { StoreService } from '@core/store/store.service';
import { VRRenderer } from '../renderers';
import { VRSession } from '../models';

export class VRSessionManager implements VRSession {
  private list: VRSession[] = [];

  constructor(private store: StoreService, private renderer: VRRenderer) {
    this.initListeners();
  }

  add(element: VRSession): void {
    this.list.push(element);
  }

  onSessionStart(): void {
    this.list.forEach((element) => element.onSessionStart());
  }

  onSessionEnd(): void {
    this.list.forEach((element) => element.onSessionEnd());
  }

  private initListeners(): void {
    this.renderer.xr.addEventListener('sessionstart', () => {
      this.onSessionStart();
      this.store.vrSessionStart();
    });

    this.renderer.xr.addEventListener('sessionend', () => {
      this.onSessionEnd();
      this.store.vrSessionEnd();
    });
  }
}
