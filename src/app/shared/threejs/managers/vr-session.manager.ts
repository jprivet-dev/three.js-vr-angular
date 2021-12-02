import { VRSessionStartEnd } from '../models';

export class VRSessionManager implements VRSessionStartEnd {
  private list: VRSessionStartEnd[] = [];

  add(element: VRSessionStartEnd): void {
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
