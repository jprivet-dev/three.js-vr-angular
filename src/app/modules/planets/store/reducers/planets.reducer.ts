import { Definition } from '@core/store/store.model';
import { createReducer, on } from '@ngrx/store';
import { PlanetsActions } from '../actions';

export const featureKey = 'planets';

export interface State {
  fly: boolean;
  antialias: boolean;
  definition: Definition;
  vrSession: boolean;
}

export const initialState: State = {
  fly: false,
  antialias: false,
  definition: 'sd',
  vrSession: false,
};

export const reducer = createReducer(
  initialState,
  on(PlanetsActions.switchDefinition, (state) => ({
    ...state,
    definition: state.definition === 'sd' ? 'hd' : 'sd',
  }))
);
