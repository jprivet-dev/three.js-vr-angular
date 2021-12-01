import { createReducer, on } from '@ngrx/store';
import { AviatorActions } from '../actions';

export const featureKey = 'aviator';

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
  on(AviatorActions.switchFlyMode, (state) => ({
    ...state,
    flyMode: !state.flyMode,
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
