import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppReducer } from '../reducers';

export const selectState = createFeatureSelector<AppReducer.State>(
  AppReducer.featureKey
);

export const getDefinition = createSelector(
  selectState,
  (state) => state.definition
);

export const isHDDefinition = createSelector(
  getDefinition,
  (definition) => definition === 'hd'
);

export const getAntialias = createSelector(
  selectState,
  (state) => state.antialias
);
