import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlanetsActionsType } from './actions';
import { PlanetsSelectors } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class PlanetsFacade {
  readonly flyMode$ = this.store.select(PlanetsSelectors.getFlyMode);
  readonly vrSession$ = this.store.select(PlanetsSelectors.getVRSession);

  constructor(private store: Store) {
  }

  dispatch(action: PlanetsActionsType): void {
    this.store.dispatch(action);
  }
}
