import { Definition } from '@core/store/store.model';
import { createReducer, on } from '@ngrx/store';
import { AviatorActions } from '../actions';

export const featureKey = 'aviator';

export interface State {
  flyMode: boolean;
  antialias: boolean;
  definition: Definition;
  vrSession: boolean;
}

export const initialState: State = {
  flyMode: false,
  antialias: false,
  definition: 'sd',
  vrSession: false,
};

export const reducer = createReducer(
  initialState,
  on(AviatorActions.switchFlyMode, (state) => ({
    ...state,
    flyMode: !state.flyMode,
  })),
  on(AviatorActions.switchDefinition, (state) => ({
    ...state,
    definition: state.definition === 'sd' ? 'hd' : 'sd',
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
