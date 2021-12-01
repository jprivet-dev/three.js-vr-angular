import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EarthReducer } from '../reducers';

export const selectState = createFeatureSelector<EarthReducer.State>(
  EarthReducer.featureKey
);

export const getFlyMode = createSelector(selectState, (state) => state.flyMode);

export const getVRSession = createSelector(
  selectState,
  (state) => state.vrSession
);
