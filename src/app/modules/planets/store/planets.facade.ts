import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlanetsActionsType } from './actions';
import { PlanetsSelectors } from './selectors';
import { getDefinition } from './selectors/planets.selectors';

@Injectable({
  providedIn: 'root',
})
export class PlanetsFacade {
  readonly definition$ = this.store.select(PlanetsSelectors.getDefinition);
  readonly isHDDefinition$ = this.store.select(PlanetsSelectors.isHDDefinition);

  constructor(private store: Store) {
  }

  dispatch(action: PlanetsActionsType): void {
    this.store.dispatch(action);
  }
}
