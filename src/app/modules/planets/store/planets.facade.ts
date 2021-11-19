import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlanetsActionsType } from './actions';
import { PlanetsSelectors } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class PlanetsFacade {
  readonly isFlyMode$ = this.store.select(PlanetsSelectors.isFlyMode);
  readonly isAntialias$ = this.store.select(PlanetsSelectors.isAntialias);
  readonly definition$ = this.store.select(PlanetsSelectors.getDefinition);
  readonly isHDDefinition$ = this.store.select(PlanetsSelectors.isHDDefinition);

  constructor(private store: Store) {
  }

  dispatch(action: PlanetsActionsType): void {
    this.store.dispatch(action);
  }
}
