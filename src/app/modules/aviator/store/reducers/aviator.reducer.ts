import { createReducer, on } from '@ngrx/store';
import { FlyingObject } from '../../models/aviator-colors.model';
import { AviatorActions } from '../actions';

export const featureKey = 'aviator';

export interface State {
  flyMode: boolean;
  vrSession: boolean;
  flyingObject: FlyingObject;
  play: boolean;
}

export const initialState: State = {
  flyMode: false,
  vrSession: false,
  flyingObject: 'aviator',
  play: false,
};

export const reducer = createReducer(
  initialState,
  on(AviatorActions.vrSessionStart, (state): State => ({
    ...state,
    vrSession: true,
  })),
  on(AviatorActions.vrSessionEnd, (state): State => ({
    ...state,
    vrSession: false,
  })),
  on(AviatorActions.changeFlyingObject, (state, { flyingObject }): State => ({
    ...state,
    flyingObject,
  })),
  on(AviatorActions.switchPlay, (state): State => ({
    ...state,
    play: !state.play,
  }))
);
