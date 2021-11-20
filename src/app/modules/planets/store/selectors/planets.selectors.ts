import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlanetsReducer } from '../reducers';

export const selectState = createFeatureSelector<PlanetsReducer.State>(
  PlanetsReducer.featureKey
);

export const getFlyMode = createSelector(
  selectState,
  (state) => state.flyMode
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

export const getVRSession = createSelector(
  selectState,
  (state) => state.vrSession
);
