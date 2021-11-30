import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlanetsReducer } from '../reducers';

export const selectState = createFeatureSelector<PlanetsReducer.State>(
  PlanetsReducer.featureKey
);

export const getFlyMode = createSelector(selectState, (state) => state.flyMode);

export const getVRSession = createSelector(
  selectState,
  (state) => state.vrSession
);
