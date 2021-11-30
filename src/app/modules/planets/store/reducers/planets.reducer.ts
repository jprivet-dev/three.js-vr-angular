import { Definition } from '@shared/models/definition.model';
import { createReducer, on } from '@ngrx/store';
import { PlanetsActions } from '../actions';

export const featureKey = 'planets';

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
  on(PlanetsActions.switchFlyMode, (state) => ({
    ...state,
    flyMode: !state.flyMode,
  })),
  on(PlanetsActions.switchDefinition, (state) => ({
    ...state,
    definition: state.definition === 'sd' ? 'hd' : 'sd',
  })),
  on(PlanetsActions.switchAntialias, (state) => ({
    ...state,
    antialias: !state.antialias,
  })),
  on(PlanetsActions.vrSessionStart, (state) => ({
    ...state,
    vrSession: true,
  })),
  on(PlanetsActions.vrSessionEnd, (state) => ({
    ...state,
    vrSession: false,
  }))
);
