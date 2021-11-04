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

  constructor() {}

  changeDefinition(definition: Definition) {
    this.definition.next(definition);
  }

  switchAntialias() {
    this.antialias.next(!this.antialias.getValue());
  }
}
