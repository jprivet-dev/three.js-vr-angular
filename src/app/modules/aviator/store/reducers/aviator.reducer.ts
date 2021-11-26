import { createReducer, on } from '@ngrx/store';
import { AviatorActions } from '../actions';

export const featureKey = 'aviator';

export interface State {
  flyMode: boolean;
  antialias: boolean;
  vrSession: boolean;
}

export const initialState: State = {
  flyMode: false,
  antialias: true,
  vrSession: false,
};

export const reducer = createReducer(
  initialState,
  on(AviatorActions.switchFlyMode, (state) => ({
    ...state,
    flyMode: !state.flyMode,
  })),
  on(AviatorActions.switchAntialias, (state) => ({
    ...state,
    antialias: !state.antialias,
  })),
  on(AviatorActions.vrSessionStart, (state) => ({
    ...state,
    vrSession: true,
  })),
  on(AviatorActions.vrSessionEnd, (state) => ({
    ...state,
    vrSession: false,
  }))
);
