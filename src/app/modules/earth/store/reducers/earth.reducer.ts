import { createReducer, on } from '@ngrx/store';
import { EarthActions } from '../actions';

export const featureKey = 'earth';

export interface State {
  flyMode: boolean;
  vrSession: boolean;
}

export const initialState: State = {
  flyMode: false,
  vrSession: false,
};

export const reducer = createReducer(
  initialState,
  on(EarthActions.switchFlyMode, (state) => ({
    ...state,
    flyMode: !state.flyMode,
  })),
  on(EarthActions.vrSessionStart, (state) => ({
    ...state,
    vrSession: true,
  })),
  on(EarthActions.vrSessionEnd, (state) => ({
    ...state,
    vrSession: false,
  }))
);
