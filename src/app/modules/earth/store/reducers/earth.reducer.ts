import { Definition } from '@shared/models/definition.model';
import { createReducer, on } from '@ngrx/store';
import { EarthActions } from '../actions';

export const featureKey = 'earth';

export interface State {
  flyMode: boolean;
  antialias: boolean;
  definition: Definition;
  vrSession: boolean;
}

export const initialState: State = {
  flyMode: false,
  antialias: true,
  definition: 'hd',
  vrSession: false,
};

export const reducer = createReducer(
  initialState,
  on(EarthActions.switchFlyMode, (state) => ({
    ...state,
    flyMode: !state.flyMode,
  })),
  on(EarthActions.switchDefinition, (state) => ({
    ...state,
    definition: state.definition === 'sd' ? 'hd' : 'sd',
  })),
  on(EarthActions.switchAntialias, (state) => ({
    ...state,
    antialias: !state.antialias,
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
