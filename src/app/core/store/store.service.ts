import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Definition } from './store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _definition = new BehaviorSubject<Definition>('sd');
  public definition$ = this._definition.asObservable();

  changeDefinition(definition: Definition) {
    this._definition.next(definition);
  }

  constructor() {}
}
