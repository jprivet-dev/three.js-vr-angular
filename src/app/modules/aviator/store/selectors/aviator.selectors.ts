import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AviatorReducer } from '../reducers';

export const selectState = createFeatureSelector<AviatorReducer.State>(
  AviatorReducer.featureKey
);

export const getFlyMode = createSelector(selectState, (state) => state.flyMode);

export const getVRSession = createSelector(
  selectState,
  (state) => state.vrSession
);
