import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlanetsActionsType } from './actions';
import { PlanetsSelectors } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class PlanetsFacade {
  readonly flyMode$ = this.store.select(PlanetsSelectors.getFlyMode);
  readonly definition$ = this.store.select(PlanetsSelectors.getDefinition);
  readonly isHDDefinition$ = this.store.select(PlanetsSelectors.isHDDefinition);
  readonly antialias$ = this.store.select(PlanetsSelectors.getAntialias);
  readonly vrSession$ = this.store.select(PlanetsSelectors.getVRSession);

  constructor(private store: Store) {}

  dispatch(action: PlanetsActionsType): void {
    this.store.dispatch(action);
  }
}
