import { Injectable } from '@angular/core';
import { AppActionsType } from '@core/store/actions';
import { AppSelectors } from '@core/store/selectors';
import { Store } from '@ngrx/store';
import { PlanetsActionsType } from './actions';
import { PlanetsSelectors } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class PlanetsFacade {
  readonly definition$ = this.store.select(AppSelectors.getDefinition);
  readonly isHDDefinition$ = this.store.select(AppSelectors.isHDDefinition);
  readonly antialias$ = this.store.select(AppSelectors.getAntialias);

  readonly flyMode$ = this.store.select(PlanetsSelectors.getFlyMode);
  readonly vrSession$ = this.store.select(PlanetsSelectors.getVRSession);

  constructor(private store: Store) {}

  dispatch(action: PlanetsActionsType | AppActionsType): void {
    this.store.dispatch(action);
  }
}
