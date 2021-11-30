import { Injectable } from '@angular/core';
import { AppActionsType } from '@core/store/actions';
import { AppSelectors } from '@core/store/selectors';
import { Store } from '@ngrx/store';
import { AviatorActionsType } from './actions';
import { AviatorSelectors } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class AviatorFacade {
  readonly antialias$ = this.store.select(AppSelectors.getAntialias);

  readonly flyMode$ = this.store.select(AviatorSelectors.getFlyMode);
  readonly vrSession$ = this.store.select(AviatorSelectors.getVRSession);

  constructor(private store: Store) {}

  dispatch(action: AviatorActionsType | AppActionsType): void {
    this.store.dispatch(action);
  }
}
