import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AviatorActionsType } from './actions';
import { AviatorSelectors } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class AviatorFacade {
  readonly flyMode$ = this.store.select(AviatorSelectors.getFlyMode);
  readonly antialias$ = this.store.select(AviatorSelectors.getAntialias);
  readonly vrSession$ = this.store.select(AviatorSelectors.getVRSession);

  constructor(private store: Store) {}

  dispatch(action: AviatorActionsType): void {
    this.store.dispatch(action);
  }
}
