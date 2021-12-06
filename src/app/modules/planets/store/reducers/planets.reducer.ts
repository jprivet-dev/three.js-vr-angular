import { createReducer, on } from '@ngrx/store';
import { PlanetsActions } from '../actions';
import { flyModeOff } from '../actions/planets.actions';

export const featureKey = 'planets';

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
  on(PlanetsActions.switchFlyMode, (state): State => ({
    ...state,
    flyMode: !state.flyMode,
  })),
  on(PlanetsActions.flyModeOff, (state): State => ({
    ...state,
    flyMode: false,
  })),
  on(PlanetsActions.vrSessionStart, (state): State => ({
    ...state,
    vrSession: true,
  })),
  on(PlanetsActions.vrSessionEnd, (state): State => ({
    ...state,
    vrSession: false,
  }))
);
