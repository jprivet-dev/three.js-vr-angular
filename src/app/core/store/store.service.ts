import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Definition } from './store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private definition = new BehaviorSubject<Definition>('sd');
  public definition$ = this.definition.asObservable();

  private antialias = new BehaviorSubject<boolean>(false);
  public antialias$ = this.antialias.asObservable();

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

  private _vrControllerSession = new BehaviorSubject<boolean>(false);
  public vrControllerSession$ = this._vrControllerSession.asObservable();

  constructor() {}

  changeDefinition(definition: Definition) {
    this.log('changeDefinition', definition);
    this.definition.next(definition);
  }

  switchAntialias() {
    const value = !this.antialias.getValue();
    this.log('switchAntialias', value);
    this.antialias.next(value);
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
    this._vrControllerSession.next(true);
  }

  vrSessionEnd() {
    this.log('vrSessionEnd');
    this._vrControllerSession.next(false);
  }

  private log(label: string, value: any = null): void {
    if (value) {
      console.log(label, value);
      return;
    }
    console.log(label);
  }
}
