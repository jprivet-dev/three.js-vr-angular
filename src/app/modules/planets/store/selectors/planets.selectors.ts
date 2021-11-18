import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlanetsReducer } from '../reducers';

export const selectState = createFeatureSelector<PlanetsReducer.State>(
  PlanetsReducer.featureKey
);

export const getDefinition = createSelector(
  selectState,
  (state) => state.definition
);

export const isHDDefinition = createSelector(
  getDefinition,
  (definition) => definition === 'hd'
);
