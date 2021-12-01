import { Injectable } from '@angular/core';
import { AppActionsType } from '@core/store/actions';
import { AppSelectors } from '@core/store/selectors';
import { Store } from '@ngrx/store';
import { EarthActionsType } from './actions';
import { EarthSelectors } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class EarthFacade {
  readonly flyMode$ = this.store.select(EarthSelectors.getFlyMode);
  readonly vrSession$ = this.store.select(EarthSelectors.getVRSession);

  constructor(private store: Store) {}

  dispatch(action: EarthActionsType ): void {
    this.store.dispatch(action);
  }
}
