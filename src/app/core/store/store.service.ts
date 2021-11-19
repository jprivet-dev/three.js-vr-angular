import { Injectable } from '@angular/core';
import { VRControllerType } from '@shared/threejs/controls';
import { BehaviorSubject } from 'rxjs';
import { Definition } from './store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private definition = new BehaviorSubject<Definition>('sd');
  public definition$ = this.definition.asObservable();

  private isAntialias = new BehaviorSubject<boolean>(false);
  public isAntialias$ = this.isAntialias.asObservable();

  private isFlyMode = new BehaviorSubject<boolean>(false);
  public isFlyMode$ = this.isFlyMode.asObservable();

  private _vrControllerRightConnected = new BehaviorSubject<boolean>(false);
  public vrControllerRightConnected$ =
    this._vrControllerRightConnected.asObservable();

  private _vrControllerLeftConnected = new BehaviorSubject<boolean>(false);
  public vrControllerLeftConnected$ =
    this._vrControllerLeftConnected.asObservable();

  private _vrControllerRightIsSelecting = new BehaviorSubject<boolean>(false);
  public vrControllerRightIsSelecting$ =
    this._vrControllerRightIsSelecting.asObservable();

  private _vrControllerLeftIsSelecting = new BehaviorSubject<boolean>(false);
  public vrControllerLeftIsSelecting$ =
    this._vrControllerLeftIsSelecting.asObservable();

  private _vrSession = new BehaviorSubject<boolean>(false);
  public vrSession$ = this._vrSession.asObservable();

  switchFlyMode() {
    const state = this.isFlyMode.getValue();
    this.isFlyMode.next(!state);
  }

  flyModeOff() {
    this.isFlyMode.next(false);
  }

  switchAntialias() {
    const value = !this.isAntialias.getValue();
    this.isAntialias.next(value);
    this.log('switchAntialias', value);
  }

  vrControllerRightConnected() {
    this.log('vrControllerRightConnected');
    this._vrControllerRightConnected.next(true);
  }

  vrControllerRightDisconnected() {
    this.log('vrControllerRightDisconnected');
    this._vrControllerRightConnected.next(false);
  }

  vrControllerLeftConnected() {
    this.log('vrControllerLeftConnected');
    this._vrControllerLeftConnected.next(true);
  }

  vrControllerLeftDisconnected() {
    this.log('vrControllerLeftDisconnected');
    this._vrControllerLeftConnected.next(false);
  }

  vrControllerRightSelectStart() {
    this.log('vrControllerRightSelectStart');
    this._vrControllerRightIsSelecting.next(true);
  }

  vrControllerRightSelectEnd() {
    this.log('vrControllerRightSelectEnd');
    this._vrControllerRightIsSelecting.next(false);
  }

  vrControllerLeftSelectStart() {
    this.log('vrControllerLeftSelectStart');
    this._vrControllerLeftIsSelecting.next(true);
  }

  vrControllerLeftSelectEnd() {
    this.log('vrControllerLeftSelectEnd');
    this._vrControllerLeftIsSelecting.next(false);
  }

  vrSessionStart() {
    this.log('vrSessionStart');
    this._vrSession.next(true);
  }

  vrSessionEnd() {
    this.log('vrSessionEnd');
    this._vrSession.next(false);
  }

  vrControllerConnectedByType(type: VRControllerType) {
    switch (type) {
      case VRControllerType.Right:
        this.vrControllerRightConnected();
        break;
      case VRControllerType.Left:
        this.vrControllerLeftConnected();
        break;
    }
  }

  vrControllerDisconnectedByType(type: VRControllerType) {
    switch (type) {
      case VRControllerType.Right:
        this.vrControllerRightDisconnected();
        break;
      case VRControllerType.Left:
        this.vrControllerLeftDisconnected();
        break;
    }
  }

  vrControllerSelectStartByType(type: VRControllerType) {
    switch (type) {
      case VRControllerType.Right:
        this.vrControllerRightSelectStart();
        break;
      case VRControllerType.Left:
        this.vrControllerLeftSelectStart();
        break;
    }
  }

  vrControllerSelectEndByType(type: VRControllerType) {
    switch (type) {
      case VRControllerType.Right:
        this.vrControllerRightSelectEnd();
        break;
      case VRControllerType.Left:
        this.vrControllerLeftSelectEnd();
        break;
    }
  }

  private log(label: string, value: any = null): void {
    if (value) {
      console.log(label, value);
      return;
    }
    console.log(label);
  }
}
