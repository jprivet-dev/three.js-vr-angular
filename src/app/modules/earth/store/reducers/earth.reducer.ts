import { createReducer, on } from '@ngrx/store';
import { PlanetsActions } from '../../../planets/store/actions';
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
  on(EarthActions.flyModeOff, (state) => ({
    ...state,
    flyMode: false,
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
