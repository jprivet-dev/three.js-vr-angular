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
  readonly definition$ = this.store.select(AppSelectors.getDefinition);
  readonly isHDDefinition$ = this.store.select(AppSelectors.isHDDefinition);
  readonly antialias$ = this.store.select(AppSelectors.getAntialias);

  readonly flyMode$ = this.store.select(EarthSelectors.getFlyMode);
  readonly vrSession$ = this.store.select(EarthSelectors.getVRSession);

  constructor(private store: Store) {}

  dispatch(action: EarthActionsType | AppActionsType): void {
    this.store.dispatch(action);
  }
}
