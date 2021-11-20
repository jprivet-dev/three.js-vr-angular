import { VRSession } from '../models';

export class VRSessionManager implements VRSession {
  private list: VRSession[] = [];

  add(element: VRSession): void {
    if (this.list.includes(element)) {
      console.error('Element already exists:', element);
      return;
    }

    this.list.push(element);
  }

  onSessionStart(): void {
    this.list.forEach((element) => element.onSessionStart());
  }

  onSessionEnd(): void {
    this.list.forEach((element) => element.onSessionEnd());
  }
}
