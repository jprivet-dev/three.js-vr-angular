import { Injectable } from '@angular/core';
import { AppSelectors } from '@core/store/selectors';
import { Store } from '@ngrx/store';
import { AppActionsType } from './actions';

@Injectable({
  providedIn: 'root',
})
export class AppFacade {
  readonly stats$ = this.store.select(AppSelectors.getStats);
  readonly definition$ = this.store.select(AppSelectors.getDefinition);
  readonly isHDDefinition$ = this.store.select(AppSelectors.isHDDefinition);
  readonly antialias$ = this.store.select(AppSelectors.getAntialias);

  constructor(private store: Store) {}

  dispatch(action: AppActionsType): void {
    this.store.dispatch(action);
  }
}
