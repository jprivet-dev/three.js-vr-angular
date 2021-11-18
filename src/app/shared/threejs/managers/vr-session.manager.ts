import { StoreService } from '@core/store/store.service';
import { VRSession } from '../models';
import { Renderer } from '../renderers';

export class VRSessionManager implements VRSession {
  private list: VRSession[] = [];

  constructor(private store: StoreService, private renderer: Renderer) {
    this.connect();
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

  private connect(): void {
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
