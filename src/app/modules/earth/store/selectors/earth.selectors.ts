import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EarthReducer } from '../reducers';

export const selectState = createFeatureSelector<EarthReducer.State>(
  EarthReducer.featureKey
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
