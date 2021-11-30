import { VRSession } from '../models';

export class VRSessionManager implements VRSession {
  private list: VRSession[] = [];

  add(element: VRSession): void {
    console.log('VRSessionManager | element', element);
    if (this.list.includes(element)) {
      console.error('Element already exists:', element);
      return;
    }

    this.list.push(element);
  }

  onSessionStart(): void {
    console.log('VRSessionManager | onSessionStart');
    console.log(this.list.length);
    this.list.forEach((element) => element.onSessionStart());
  }

  onSessionEnd(): void {
    console.log('VRSessionManager | onSessionEnd');
    this.list.forEach((element) => element.onSessionEnd());
  }
}
