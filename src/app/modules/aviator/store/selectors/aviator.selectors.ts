import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AviatorReducer } from '../reducers';

export const selectState = createFeatureSelector<AviatorReducer.State>(
  AviatorReducer.featureKey
);

export const getFlyMode = createSelector(selectState, (state) => state.flyMode);

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
