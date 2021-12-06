import { createReducer, on } from '@ngrx/store';
import { Definition } from '@shared/models';
import { AppActions } from '../actions';

export const featureKey = 'app';

export interface State {
  stats: boolean;
  antialias: boolean;
  definition: Definition;
}

export const initialState: State = {
  stats: true,
  antialias: true,
  definition: 'hd',
};

export const reducer = createReducer(
  initialState,
  on(AppActions.switchStats, (state): State => ({
    ...state,
    stats: !state.stats,
  })),
  on(AppActions.switchDefinition, (state): State => ({
    ...state,
    definition: state.definition === 'sd' ? 'hd' : 'sd',
  })),
  on(AppActions.switchAntialias, (state): State => ({
    ...state,
    antialias: !state.antialias,
  }))
);
