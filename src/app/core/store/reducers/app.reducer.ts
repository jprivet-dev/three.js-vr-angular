import { createReducer, on } from '@ngrx/store';
import { Definition } from '@shared/models';
import { AppActions } from '../actions';

export const featureKey = 'app';

export interface State {
  antialias: boolean;
  definition: Definition;
}

export const initialState: State = {
  antialias: true,
  definition: 'hd',
};

export const reducer = createReducer(
  initialState,
  on(AppActions.switchDefinition, (state) => ({
    ...state,
    definition: state.definition === 'sd' ? 'hd' : 'sd',
  })),
  on(AppActions.switchAntialias, (state) => ({
    ...state,
    antialias: !state.antialias,
  }))
);
