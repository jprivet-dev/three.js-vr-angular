import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AviatorReducer } from '../reducers';

export const selectState = createFeatureSelector<AviatorReducer.State>(
  AviatorReducer.featureKey
);

export const getVRSession = createSelector(
  selectState,
  (state) => state.vrSession
);

export const getFlyingObject = createSelector(
  selectState,
  (state) => state.flyingObject
);

export const getPlay = createSelector(
  selectState,
  (state) => state.play
);

