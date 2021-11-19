import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlanetsReducer } from '../reducers';

export const selectState = createFeatureSelector<PlanetsReducer.State>(
  PlanetsReducer.featureKey
);

export const isFlyMode = createSelector(
  selectState,
  (state) => state.flyMode
);

export const isAntialias = createSelector(
  selectState,
  (state) => state.antialias
);

export const getDefinition = createSelector(
  selectState,
  (state) => state.definition
);

export const isHDDefinition = createSelector(
  getDefinition,
  (definition) => definition === 'hd'
);
