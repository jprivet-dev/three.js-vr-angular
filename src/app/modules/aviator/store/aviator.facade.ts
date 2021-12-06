import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AviatorActionsType } from './actions';
import { AviatorSelectors } from './selectors';
import { getFlyingObject } from './selectors/aviator.selectors';

@Injectable({
  providedIn: 'root',
})
export class AviatorFacade {
  readonly vrSession$ = this.store.select(AviatorSelectors.getVRSession);
  readonly flyingObject$ = this.store.select(AviatorSelectors.getFlyingObject);
  readonly play$ = this.store.select(AviatorSelectors.getPlay);

  constructor(private store: Store) {
  }

  dispatch(action: AviatorActionsType): void {
    this.store.dispatch(action);
  }
}
