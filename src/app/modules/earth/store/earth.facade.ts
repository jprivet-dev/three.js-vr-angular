import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EarthActionsType } from './actions';
import { EarthSelectors } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class EarthFacade {
  readonly flyMode$ = this.store.select(EarthSelectors.getFlyMode);
  readonly definition$ = this.store.select(EarthSelectors.getDefinition);
  readonly isHDDefinition$ = this.store.select(EarthSelectors.isHDDefinition);
  readonly antialias$ = this.store.select(EarthSelectors.getAntialias);
  readonly vrSession$ = this.store.select(EarthSelectors.getVRSession);

  constructor(private store: Store) {}

  dispatch(action: EarthActionsType): void {
    this.store.dispatch(action);
  }
}
